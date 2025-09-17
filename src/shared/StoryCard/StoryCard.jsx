// src/shared/StoryCard/StoryCard.jsx
import { Link } from "react-router-dom";

export default function StoryCard({
  id,
  title,
  author,
  description,
  genre,
  image,
}) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      {/* Image */}
      <div className="h-40 flex items-center justify-center bg-red-100">
        <img src={image} alt={title} className="h-full object-contain p-4" />
      </div>

      {/* Content */}
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
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{author}</span>
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
