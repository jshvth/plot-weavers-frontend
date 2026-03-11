import { useState, useEffect } from "react";
import StoryCard from "../../shared/StoryCard/StoryCard";
import { getAllStories } from "../../api/stories";
import { useTranslation } from "react-i18next";

export default function StoriesPage() {
  const { t } = useTranslation();
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
        setError(t("stories.errorLoad"));
      }
    };

    fetchStories();
  }, [t]);

  // ---------- Suche nach Genre ----------
  const filteredStories = stories.filter((story) =>
    story.genre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
      <div className="soft-panel p-6 sm:p-8 md:p-10">
        {/* Headline */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-space">
            {t("stories.titlePrefix")}
            <span className="text-pink-500">{t("stories.titleEmphasis")}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("stories.subtitle")}
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder={t("stories.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 dark:text-red-400 text-center mb-6">
            {error}
          </div>
        )}

        {/* Stories */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-space">
          {t("stories.allStories")}
        </h2>
        {filteredStories.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            {t("stories.empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
    </div>
  );
}
