// src/pages/StoryDetailPage/StoryDetailPage.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { stories as initialStories } from "../../data/stories";
import { chapters as initialChapters } from "../../data/chapters";
import { useState, useEffect } from "react";

export default function StoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---------- Stories aus localStorage laden ----------
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem("stories");
    return saved ? JSON.parse(saved) : initialStories;
  });

  const story = stories.find((s) => s.id === parseInt(id));

  // ---------- Chapters laden ----------
  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem("chapters");
    if (saved) {
      try {
        const all = JSON.parse(saved);
        return all.filter((c) => c.storyId === parseInt(id));
      } catch {
        return initialChapters.filter((c) => c.storyId === parseInt(id));
      }
    }
    return initialChapters.filter((c) => c.storyId === parseInt(id));
  });

  // ---------- Favorites laden ----------
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ---------- States für Formular ----------
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  // ---------- Stories speichern ----------
  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  // ---------- Chapters speichern ----------
  useEffect(() => {
    const saved = localStorage.getItem("chapters");
    let all = [];
    try {
      all = saved ? JSON.parse(saved) : [];
    } catch {
      all = [];
    }

    const other = all.filter((c) => c.storyId !== parseInt(id));
    const merged = [...other, ...chapters];
    localStorage.setItem("chapters", JSON.stringify(merged));
  }, [chapters, id]);

  // ---------- Favorites speichern ----------
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-4">Story not found</h2>
        <p className="text-gray-600 mb-4">
          The story you’re looking for doesn’t exist.
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

  // ---------- Favoriten-Handler ----------
  const isFavorite = favorites.includes(story.id);
  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fid) => fid !== story.id));
    } else {
      setFavorites([...favorites, story.id]);
    }
  };

  // ---------- Kapitel hinzufügen ----------
  const handleAddChapter = () => {
    if (wordCount < 300 || wordCount > 1500) {
      alert("Chapter must be between 300 and 1500 words.");
      return;
    }

    const newChapter = {
      id: Date.now(),
      storyId: story.id,
      title,
      content,
      upvotes: 0,
      createdBy: "currentUser",
    };

    setChapters([...chapters, newChapter]);
    setShowForm(false);
    setTitle("");
    setContent("");
  };

  // ---------- Story löschen ----------
  const handleDeleteStory = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${story.title}"?`
    );
    if (confirmDelete) {
      const updatedStories = stories.filter((s) => s.id !== story.id);
      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));

      const saved = localStorage.getItem("chapters");
      let all = saved ? JSON.parse(saved) : [];
      const remaining = all.filter((c) => c.storyId !== story.id);
      localStorage.setItem("chapters", JSON.stringify(remaining));

      navigate("/stories");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
      {/* Titel */}
      <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
      <p className="text-lg text-gray-500 mb-2">by {story.author}</p>
      <p className="text-pink-500 font-medium mb-6">Genre: {story.genre}</p>

      {/* Bild */}
      <div
        className={`w-full h-64 flex items-center justify-center rounded-lg mb-6 ${story.color}`}
      >
        <img
          src={story.image}
          alt={story.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Beschreibung */}
      <p className="text-gray-700 mb-10">{story.description}</p>

      {/* Buttons */}
      <div className="mb-8 flex gap-3 items-center">
        {/* Stern-Button */}
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
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Story Tree</h2>
        {chapters.length === 0 ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              No chapters yet. Be the first to add one!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Add new chapter
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  to={`/chapters/${chapter.id}`}
                  className="block px-4 py-2 bg-gray-100 rounded-lg hover:bg-pink-100 transition"
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setShowForm(true)}
                className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                + Add new chapter
              </button>
            </li>
          </ul>
        )}

        {/* Formular für neues Kapitel */}
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
                onClick={handleAddChapter}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Add Chapter
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
