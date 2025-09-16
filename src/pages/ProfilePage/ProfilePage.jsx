// src/pages/ProfilePage/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [username, setUsername] = useState("Guest");
  const [profileImage, setProfileImage] = useState(null);
  const [stories, setStories] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Laden beim Mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Guest";
    const savedImage = localStorage.getItem("profileImage");
    const savedStories = JSON.parse(localStorage.getItem("stories") || "[]");
    const savedChapters = JSON.parse(localStorage.getItem("chapters") || "[]");
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setUsername(savedUsername);

    if (savedImage) {
      setProfileImage(savedImage);
    }

    setStories(savedStories.filter((s) => s.createdBy === savedUsername));
    setChapters(savedChapters.filter((c) => c.createdBy === savedUsername));

    const favStories = savedStories.filter((s) =>
      savedFavorites.includes(s.id)
    );
    setFavorites(favStories);
  }, []);

  // Profilbild hochladen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Profilbild löschen
  const handleImageReset = () => {
    localStorage.removeItem("profileImage");
    setProfileImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
      {/* Profil */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-gray-400">
              No Image
            </span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{username}</h1>
          <div className="flex items-center gap-3 mt-2">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {profileImage && (
              <button
                onClick={handleImageReset}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* My Stories */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Stories</h2>
        {stories.length > 0 ? (
          <ul className="space-y-2">
            {stories.map((s) => (
              <li
                key={s.id}
                onClick={() => navigate(`/stories/${s.id}`)}
                className="p-3 border rounded-lg cursor-pointer hover:bg-pink-100 transition"
              >
                ✍️ {s.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No stories yet.</p>
        )}
      </div>

      {/* My Chapters */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Chapters</h2>
        {chapters.length > 0 ? (
          <ul className="space-y-2">
            {chapters.map((c) => (
              <li
                key={c.id}
                onClick={() => navigate(`/chapters/${c.id}`)}
                className="p-3 border rounded-lg cursor-pointer hover:bg-pink-100 transition"
              >
                📖 {c.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No chapters yet.</p>
        )}
      </div>

      {/* Favorites */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Favorites</h2>
        {favorites.length > 0 ? (
          <ul className="space-y-2">
            {favorites.map((f) => (
              <li
                key={f.id}
                onClick={() => navigate(`/stories/${f.id}`)}
                className="p-3 border rounded-lg cursor-pointer hover:bg-yellow-100 transition flex items-center gap-2"
              >
                <span className="text-yellow-400">★</span>
                {f.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No favorites yet.</p>
        )}
      </div>
    </div>
  );
}
