import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getStoryById, deleteStory } from "../../api/stories";
import { getChaptersByStoryId, createChapter } from "../../api/chapters";
import { toggleFavorite, getFavorites } from "../../api/favorites";
import { useTranslation } from "react-i18next";

import {
  getComments,
  addComment as postComment,
  deleteComment as removeComment,
} from "../../api/comments";

import StoryTree from "../../shared/StoryTree/StoryTree";

export default function StoryDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Kommentare
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const currentUser = localStorage.getItem("username") || t("profile.guest");
  const currentUserId = localStorage.getItem("userId");

  // ⭐ Admin Check
  const isAdmin = currentUser === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const fetchedStory = await getStoryById(id);
        if (!fetchedStory || !fetchedStory.id) {
          setError(t("story.notFoundTitle"));
          setStory(null);
          return;
        }

        const backendBase =
          import.meta.env.VITE_API_BASE_URL ||
          "https://plot-weavers-backend.onrender.com";

        const imageUrl = fetchedStory.cover_image
          ? fetchedStory.cover_image.startsWith("http")
            ? fetchedStory.cover_image
            : `${backendBase}/uploads/stories/${fetchedStory.cover_image}`
          : null;

        setStory({ ...fetchedStory, image: imageUrl });

        const fetchedChapters = await getChaptersByStoryId(id);
        setChapters(fetchedChapters || []);

        const fetchedComments = await getComments(id);
        setComments(fetchedComments || []);
      } catch (err) {
        console.error("Fehler beim Laden der Story:", err);
        setError(t("story.notFoundTitle"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getFavorites()
      .then((data) => {
        if (Array.isArray(data)) {
          const ids = data.map((s) => s.id);
          setFavorites(ids);
          localStorage.setItem("favorites", JSON.stringify(ids));
        }
      })
      .catch((err) => console.error("Error fetching favorites:", err));
  }, []);

  const isFavorite = favorites.includes(id);

  const handleToggleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(t("storyAlerts.mustLoginFavorite"));
        return;
      }

      await toggleFavorite(id);

      const updated = isFavorite
        ? favorites.filter((fid) => fid !== id)
        : [...favorites, id];

      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert(t("storyAlerts.errorToggleFavorite"));
    }
  };

  //   KOMMENTARE

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert(t("storyAlerts.mustLoginComment"));
      return;
    }

    if (!currentUserId) {
      alert(t("storyAlerts.missingUserId"));
      return;
    }

    try {
      const added = await postComment(id, currentUserId, newComment);

      setComments((prev) => [...prev, added.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Kommentars:", err);
      alert(t("storyAlerts.errorAddComment"));
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(t("storyAlerts.mustLoginDeleteComment"));
      return;
    }

    try {
      await removeComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Fehler beim Löschen des Kommentars:", err);
      alert(t("storyAlerts.errorDeleteComment"));
    }
  };

  // Kapitel
  const [showForm, setShowForm] = useState(false);
  const [parentChapterId, setParentChapterId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleAddChapter = useCallback((parentId = null) => {
    setParentChapterId(parentId);
    setShowForm(true);
  }, []);

  const handleSubmitChapter = async () => {
    if (!isAdmin && (wordCount < 300 || wordCount > 1500)) {
      alert(t("storyAlerts.chapterWordRange"));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(t("storyAlerts.mustLoginAddChapter"));
        return;
      }

      const newChapter = {
        story_id: id,
        parent_id: parentChapterId,
        title,
        content,
      };

      const created = await createChapter(newChapter, token);
      if (created && created.id) {
        setChapters([...chapters, created]);
      }

      setShowForm(false);
      setTitle("");
      setContent("");
      setParentChapterId(null);
    } catch (err) {
      console.error("Fehler beim Erstellen des Kapitels:", err);
      alert(t("storyAlerts.errorCreateChapter"));
    }
  };

  const handleDeleteStory = async () => {
    if (!story) return;

    const confirmDelete = window.confirm(
      t("storyAlerts.confirmDeleteStory", { title: story.title })
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await deleteStory(id, token);
      navigate("/stories");
    } catch (err) {
      console.error("Fehler beim Löschen der Story:", err);
      alert(t("storyAlerts.errorDeleteStory"));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20 text-gray-500 dark:text-gray-400">
        {t("story.loading")}
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
        <div className="soft-panel p-6 sm:p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-4">
            {error || t("story.notFoundTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("story.notFoundMessage")}
          </p>
          <Link
            to="/stories"
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            {t("story.backAll")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
      <div className="soft-panel p-6 sm:p-8 md:p-10">
        <h1 className="text-4xl font-bold mb-4 font-space">{story.title}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
          {t("story.byLabel")} {story.author || t("storyCard.unknownAuthor")}
        </p>
        <p className="text-pink-500 font-medium mb-6">
          {t("story.genreLabel")} {story.genre}
        </p>

      <div className="w-full mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {story.image ? (
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-80 object-cover transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-80 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg">
            {t("story.noCover")}
          </div>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-10">
        {story.description}
      </p>

      {/* BUTTON LEISTE */}
      <div className="mb-8 flex gap-3 items-center">
        {/* BACK BUTTON */}
        <Link
          to="/stories"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center gap-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          {t("story.backAll")}
        </Link>

        {/* DELETE BUTTON */}
        <button
          onClick={handleDeleteStory}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
        >
          <span className="material-symbols-outlined">delete</span>
          {t("story.delete")}
        </button>

        {/* FAVORITE AS BOOKMARK */}
        <button
          onClick={handleToggleFavorite}
          className={`px-3 py-2 rounded-lg flex items-center gap-2 transition border border-gray-300 dark:border-gray-700 ${
            isFavorite
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          <span className="material-symbols-outlined">
            {isFavorite ? "bookmark" : "bookmark_add"}
          </span>
          {isFavorite ? t("story.favoriteSaved") : t("story.favoriteSave")}
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-10">
        <h2 className="text-2xl font-bold mb-4 font-space">{t("story.storyTree")}</h2>

        {chapters.length === 0 ? (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {t("story.noChapters")}
            </p>
            <button
              onClick={() => handleAddChapter(null)}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              {t("story.addFirstChapter")}
            </button>
          </div>
        ) : (
          <StoryTree chapters={chapters} onAddChapter={handleAddChapter} />
        )}

        {showForm && (
          <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/40">
            <h3 className="text-xl font-semibold mb-3 font-space">
              {t("story.newChapter")}
            </h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("story.chapterTitle")}
              className="w-full px-3 py-2 mb-3 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t("story.chapterContent")}
              rows={6}
              className="w-full px-3 py-2 mb-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {t("story.wordCount", { count: wordCount })}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSubmitChapter}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                {t("story.addChapter")}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setParentChapterId(null);
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                {t("story.cancel")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Kommentare */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-bold mb-4 font-space">{t("story.comments")}</h2>
        <div className="space-y-3 mb-4">
          {comments.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              {t("story.noComments")}
            </p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/40 flex justify-between items-center"
              >
                <div>
                  {/* Datum */}
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {new Date(c.created_at).toLocaleString()}
                  </div>
                  <span className="font-semibold text-pink-600 dark:text-pink-400">
                    {c.username || t("common.unknown")}:
                  </span>{" "}
                  {c.content}
                </div>

                {c.username === currentUser && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-2xl"
                    title={t("story.deleteComment")}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t("story.addCommentPlaceholder")}
            className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            {t("story.post")}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
