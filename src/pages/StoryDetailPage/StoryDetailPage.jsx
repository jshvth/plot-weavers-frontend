import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getStoryById, deleteStory } from "../../api/stories";
import { getChaptersByStoryId, createChapter } from "../../api/chapters";
import { toggleFavorite, getFavorites } from "../../api/favorites";

import {
  getComments,
  addComment as postComment,
  deleteComment as removeComment,
} from "../../api/comments";

import StoryTree from "../../shared/StoryTree/StoryTree";

export default function StoryDetailPage() {
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

  const currentUser = localStorage.getItem("username") || "Guest";
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const fetchedStory = await getStoryById(id);
        if (!fetchedStory || !fetchedStory.id) {
          setError("Story not found.");
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

        // Kommentare laden
        const fetchedComments = await getComments(id);
        setComments(fetchedComments || []);
      } catch (err) {
        console.error("Fehler beim Laden der Story:", err);
        setError("Error while loading story.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Favoriten laden
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
        alert("You must be logged in to favorite stories.");
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
      alert("Error toggling favorite.");
    }
  };

  // ------------------------------------------------------
  //   KOMMENTARE — FIXED
  // ------------------------------------------------------

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!currentUserId) {
      alert("User ID missing. Please log in again.");
      return;
    }

    try {
      const added = await postComment(id, currentUserId, newComment);

      setComments((prev) => [...prev, added.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Kommentars:", err);
      alert("Error adding comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a comment.");
      return;
    }

    try {
      await removeComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Fehler beim Löschen des Kommentars:", err);
      alert("Error deleting comment.");
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
    if (wordCount < 300 || wordCount > 1500) {
      alert("Chapter must be between 300 and 1500 words.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add a chapter.");
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
      alert("Error while creating chapter.");
    }
  };

  const handleDeleteStory = async () => {
    if (!story) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${story.title}"?`
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await deleteStory(id, token);
      navigate("/stories");
    } catch (err) {
      console.error("Fehler beim Löschen der Story:", err);
      alert("Error while deleting story.");
    }
  };

  // LOADING / ERROR
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 mt-12 mb-20 text-gray-500">
        Loading story...
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-4">
          {error || "Story not found"}
        </h2>
        <p className="text-gray-600 mb-4">
          The story you’re looking for doesn’t exist or couldn’t be loaded.
        </p>
        <Link
          to="/stories"
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Back to all stories
        </Link>
      </div>
    );
  }

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
      <p className="text-lg text-gray-500 mb-2">
        by {story.author || "Unknown"}
      </p>
      <p className="text-pink-500 font-medium mb-6">Genre: {story.genre}</p>

      {/* Cover */}
      <div className="w-full mb-6 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
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
          <div className="w-full h-80 flex items-center justify-center text-gray-400 text-lg">
            No cover image
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-10">{story.description}</p>

      {/* Buttons */}
      <div className="mb-8 flex gap-3 items-center">
        <button
          onClick={handleToggleFavorite}
          className={`px-3 py-2 rounded-lg border ${
            isFavorite
              ? "bg-yellow-400 text-white hover:bg-yellow-500"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } transition`}
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>

        <button
          onClick={handleDeleteStory}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete Story
        </button>

        <Link
          to="/stories"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Back to all stories
        </Link>
      </div>

      {/* Tree */}
      <div className="border-t pt-8 mb-10">
        <h2 className="text-2xl font-bold mb-4">Story Tree</h2>

        {chapters.length === 0 ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              No chapters yet. Be the first to add one!
            </p>
            <button
              onClick={() => handleAddChapter(null)}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Add first chapter
            </button>
          </div>
        ) : (
          <StoryTree chapters={chapters} onAddChapter={handleAddChapter} />
        )}

        {showForm && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">New Chapter</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Chapter title"
              className="w-full px-3 py-2 mb-3 border rounded-lg"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chapter content..."
              rows={6}
              className="w-full px-3 py-2 mb-2 border rounded-lg"
            />
            <p className="text-sm text-gray-500 mb-3">
              Word count: {wordCount} (min 300 – max 1500)
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSubmitChapter}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Add Chapter
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setParentChapterId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Kommentare */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-3 mb-4">
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <div>
                  {/* Datum ÜBER dem Kommentartext */}
                  <div className="text-xs text-gray-400 mb-1">
                    {new Date(c.created_at).toLocaleString()}
                  </div>
                  <span className="font-semibold text-pink-600">
                    {c.username || "Unknown"}:
                  </span>{" "}
                  {c.content}
                </div>

                {c.username === currentUser && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                    title="Delete comment"
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
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
