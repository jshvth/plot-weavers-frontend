// src/pages/CreatePage/CreatePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStory = {
      id: Date.now(),
      title,
      author,
      genre,
      description,
      image: "https://via.placeholder.com/150", // Platzhalter
      color: "bg-pink-100",
      createdBy: "currentUser",
    };

    const saved = localStorage.getItem("stories");
    const stories = saved ? JSON.parse(saved) : [];
    const updatedStories = [...stories, newStory];
    localStorage.setItem("stories", JSON.stringify(updatedStories));

    // Direkt zur StoryDetailPage navigieren 👇
    navigate(`/stories/${newStory.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-6">
        Create your <span className="text-pink-500">own story</span>
      </h1>

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
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
