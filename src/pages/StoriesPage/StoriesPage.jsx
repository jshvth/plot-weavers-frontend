import { useState, useEffect } from "react";
import StoryCard from "../../shared/StoryCard/StoryCard";
import { getAllStories } from "../../api/stories";

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // ---------- Stories vom Backend laden ----------
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getAllStories();
        setStories(data);
      } catch (err) {
        console.error("Fehler beim Laden der Stories:", err);
        setError("Fehler beim Laden der Stories.");
      }
    };

    fetchStories();
  }, []);

  // ---------- Suche nach Genre ----------
  const filteredStories = stories.filter((story) =>
    story.genre?.toLowerCase().includes(search.toLowerCase())
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

      {/* Error message */}
      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      {/* Stories */}
      <h2 className="text-2xl font-bold mb-6">All Stories</h2>
      {filteredStories.length === 0 ? (
        <p className="text-gray-600">No stories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story) => {
          
            const imageUrl =
              story.cover_image || "https://placehold.co/300x200?text=No+Image";

            return (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                author={story.created_by}
                description={story.description}
                genre={story.genre}
                cover_image={imageUrl}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
