// src/shared/StoryCard/StoryCard.jsx
import { Link } from "react-router-dom";

export default function StoryCard({
  id,
  title,
  author,
  description,
  genre,
  cover_image,
}) {
  // ✅ Wenn das Backend schon eine vollständige URL liefert, nutze sie direkt
  const imageUrl =
    cover_image?.startsWith("http") || cover_image?.startsWith("/")
      ? cover_image
      : `${import.meta.env.VITE_API_URL}${cover_image}`;

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      {/* ✅ Cover-Bild mit Fallback */}
      <div className="h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
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
            No image
          </div>
        )}
      </div>

      {/* ✅ Text-Bereich */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

          {genre && (
            <p className="mt-2 text-sm text-pink-500 font-medium">
              Genre: {genre}
            </p>
          )}
        </div>

        {/* ✅ Footer mit Autor + Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {author || "Unknown Author"}
          </span>
          <Link
            to={`/stories/${id}`}
            className="px-4 py-2 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
}
