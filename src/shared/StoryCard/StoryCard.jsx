import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function StoryCard({
  id,
  title,
  author,
  description,
  genre,
  cover_image,
}) {
  const { t } = useTranslation();
  const imageUrl =
    cover_image?.startsWith("http") || cover_image?.startsWith("/")
      ? cover_image
      : `${import.meta.env.VITE_API_URL}${cover_image}`;

  return (
    <Link to={`/stories/${id}`} className="block cursor-pointer">
      <div
        className="
          flex flex-col
          border border-gray-200/70 dark:border-gray-700
          rounded-2xl overflow-hidden
          shadow-sm hover:shadow-lg
          transition-all duration-300
          hover:-translate-y-1
          bg-white/90 dark:bg-gray-800/90
        "
      >
        {/* Cover */}
        <div className="h-48 bg-gray-100/80 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              onError={(e) => {
                e.target.src = "https://placehold.co/300x200?text=No+Image";
              }}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.05]"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-400 text-sm">
              {t("storyCard.noImage")}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-space">
              {title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {description}
            </p>

            {genre && (
              <p className="mt-2 text-sm text-pink-500 font-medium">
                {t("storyCard.genre", { genre })}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center pointer-events-none">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {author || t("storyCard.unknownAuthor")}
            </span>

            {/* Open Button bleibt klickbar */}
            <div className="pointer-events-auto">
              <Link
                to={`/stories/${id}`}
                className="
                  px-4 py-2 text-sm
                  bg-pink-500 text-white
                  rounded-lg
                  hover:bg-pink-600
                  transition
                "
                onClick={(e) => e.stopPropagation()}
              >
                {t("storyCard.open")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
