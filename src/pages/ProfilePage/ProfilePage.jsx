// src/pages/ProfilePage/ProfilePage.jsx
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [username, setUsername] = useState("Guest");
  const [profileImage, setProfileImage] = useState(null);
  const [stories, setStories] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Laden
  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Guest";
    const savedImage = localStorage.getItem("profileImage");
    const savedStories = JSON.parse(localStorage.getItem("stories") || "[]");
    const savedChapters = JSON.parse(localStorage.getItem("chapters") || "[]");
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setUsername(savedUsername);
    setProfileImage(savedImage);
    setStories(savedStories.filter((s) => s.createdBy === savedUsername));
    setChapters(savedChapters.filter((c) => c.createdBy === savedUsername));
    setFavorites(savedStories.filter((s) => savedFavorites.includes(s.id)));
  }, []);

  // Profilbild hochladen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2"
          />
        </div>
      </div>

      {/* My Stories */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Stories</h2>
        {stories.length > 0 ? (
          <ul className="space-y-2">
            {stories.map((s) => (
              <li key={s.id} className="p-3 border rounded-lg">
                {s.title}
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
              <li key={c.id} className="p-3 border rounded-lg">
                {c.title}
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
              <li key={f.id} className="p-3 border rounded-lg">
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
