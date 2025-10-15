// src/pages/CreatePage/CreatePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStory } from "../../api/stories";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("🚫 You must be logged in to create a story.");
      return;
    }

    try {
      const newStoryData = {
        title,
        description,
        genre,
        image: "https://via.placeholder.com/150", // optional placeholder
      };

      // ✅ createStory() gibt jetzt direkt das Story-Objekt zurück
      const newStory = await createStory(newStoryData);

      setMessage("✅ Story created successfully!");

      // 🔁 Formularfelder leeren
      setTitle("");
      setGenre("");
      setDescription("");

      // ⏩ Nach Erfolg weiterleiten zur StoryDetail-Seite
      navigate(`/stories/${newStory.id}`);
    } catch (err) {
      console.error("❌ Fehler beim Erstellen der Story:", err);
      setMessage("❌ Error while creating story.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-6">
        Create your <span className="text-pink-500">own story</span>
      </h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : message.startsWith("🚫")
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Genre (e.g. Fantasy, Sci-Fi, Mystery)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
