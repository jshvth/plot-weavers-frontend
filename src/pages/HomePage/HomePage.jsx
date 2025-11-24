import { useEffect, useState } from "react";
import { getAllStories } from "../../api/stories";
import StoryCard from "../../shared/StoryCard/StoryCard";
import HeroSection from "../../shared/HeroSection/HeroSection";

export default function HomePage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getAllStories();
        // Zeige die 4 neuesten Stories
        setStories(data.slice(-4));
      } catch (err) {
        console.error("Fehler beim Laden der Stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-6">Most recent stories</h2>

        {loading ? (
          <div className="text-center mt-10">Loading stories...</div>
        ) : stories.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No stories found yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
