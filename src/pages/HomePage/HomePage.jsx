import { useEffect, useState } from "react";
import { getAllStories } from "../../api/stories";
import StoryCard from "../../shared/StoryCard/StoryCard";
import HeroSection from "../../shared/HeroSection/HeroSection";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getAllStories();
        // Zeige die 3 neuesten Stories
        setStories(data.slice(-3));
      } catch (err) {
        console.error("Fehler beim Laden der Stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="bg-transparent transition-colors">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
        {/* Überschrift: Wechselt von fast schwarz zu reinweiß */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {t("home.recentTitle")}
        </h2>

        {loading ? (
          <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
            {t("home.loading")}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            {t("home.empty")}
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
