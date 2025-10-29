// src/pages/StoryDetailPage/StoryDetailPage.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getStoryById, deleteStory } from "../../api/stories";
import { getChaptersByStoryId, createChapter } from "../../api/chapters";
import StoryTree from "../../shared/StoryTree/StoryTree";

export default function StoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- Lokale Favoriten & Kommentare ----------
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("storyComments");
    const all = saved ? JSON.parse(saved) : {};
    return all[id] || [];
  });

  const [newComment, setNewComment] = useState("");
  const currentUser =
    localStorage.getItem("username") ||
    localStorage.getItem("currentUser") ||
    "Guest";

  // ---------- Story + Chapters laden ----------
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
        setStory(fetchedStory);
        const fetchedChapters = await getChaptersByStoryId(id);
        console.log("Fetched chapters:", fetchedChapters);
        setChapters(fetchedChapters || []);
      } catch (err) {
        console.error("Fehler beim Laden der Story:", err);
        setError("Error while loading story.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ---------- Favoriten ----------
  const isFavorite = favorites.includes(parseInt(id));
  const toggleFavorite = () => {
    const updated = isFavorite
      ? favorites.filter((fid) => fid !== parseInt(id))
      : [...favorites, parseInt(id)];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // ---------- Kommentare ----------
  const addComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: newComment.trim(),
      user: currentUser,
      date: new Date().toISOString(),
    };

    const updated = [...comments, newEntry];
    setComments(updated);

    const saved = localStorage.getItem("storyComments");
    const all = saved ? JSON.parse(saved) : {};
    all[id] = updated;
    localStorage.setItem("storyComments", JSON.stringify(all));

    setNewComment("");
  };

  const deleteComment = (commentId) => {
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);

    const saved = localStorage.getItem("storyComments");
    const all = saved ? JSON.parse(saved) : {};
    all[id] = updated;
    localStorage.setItem("storyComments", JSON.stringify(all));
  };

  // ---------- Kapitel hinzufügen ----------
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

  // ---------- Story löschen ----------
  const handleDeleteStory = async () => {
    if (!story) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${story.title}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteStory(id);
      navigate("/stories");
    } catch (err) {
      console.error("Fehler beim Löschen der Story:", err);
      alert("Error while deleting story.");
    }
  };

  // ---------- Loading / Error ----------
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

  // ---------- UI ----------
  return (
    <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
      <p className="text-lg text-gray-500 mb-2">
        by {story.author || "Unknown"}
      </p>
      <p className="text-pink-500 font-medium mb-6">Genre: {story.genre}</p>

      {story.image && (
        <div className="w-full h-64 flex items-center justify-center rounded-lg mb-6 bg-gray-100">
          <img
            src={story.image}
            alt={story.title}
            className="max-h-full object-contain"
          />
        </div>
      )}

      <p className="text-gray-700 mb-10">{story.description}</p>

      <div className="mb-8 flex gap-3 items-center">
        <button
          onClick={toggleFavorite}
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

      {/* Story Tree */}
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
                  <span className="font-semibold text-pink-600">{c.user}:</span>{" "}
                  {c.text}
                  <div className="text-xs text-gray-400">
                    {new Date(c.date).toLocaleString()}
                  </div>
                </div>
                {c.user === currentUser && (
                  <button
                    onClick={() => deleteComment(c.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                    title="Delete comment"
                  >
                    ❌
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
            onClick={addComment}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
