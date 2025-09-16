// src/pages/StoriesPage/StoriesPage.jsx
import { useState, useEffect } from "react";
import StoryCard from "../../shared/StoryCard/StoryCard";
import { stories as initialStories } from "../../data/stories";

export default function StoriesPage() {
  // ---------- Stories aus localStorage oder Default ----------
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem("stories");
    return saved ? JSON.parse(saved) : initialStories;
  });

  const [search, setSearch] = useState("");

  // ---------- Immer speichern, wenn Stories sich ändern ----------
  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  // ---------- Hören auf Änderungen in localStorage ----------
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("stories");
      setStories(saved ? JSON.parse(saved) : initialStories);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ---------- Suche nach Genre ----------
  const filteredStories = stories.filter((story) =>
    story.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
      {/* Headline */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Explore <span className="text-pink-500">all stories</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Browse the latest creations or search by genre.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by genre (Fantasy, Mystery, Sci-Fi...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Stories */}
      <h2 className="text-2xl font-bold mb-6">All Stories</h2>
      {filteredStories.length === 0 ? (
        <p className="text-gray-600">No stories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      )}
    </div>
  );
}
