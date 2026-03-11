import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../../api/favorites";
import { getMyStories } from "../../api/stories";
import { getMyChapters } from "../../api/users";
import { useTranslation } from "react-i18next";

const DEFAULT_AVATAR = "https://www.svgrepo.com/show/452030/avatar-default.svg"; // ← Default User Avatar

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState(t("profile.guest"));
  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
  const [stories, setStories] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || t("profile.guest");
    const savedImage = localStorage.getItem("profileImage");

    setUsername(savedUsername);
    setProfileImage(savedImage || DEFAULT_AVATAR);

    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const token = localStorage.getItem("token");

    if (token) {
      getMyStories(token)
        .then((data) => {
          if (Array.isArray(data)) {
            setStories(data);
            localStorage.setItem("stories", JSON.stringify(data));
          }
        })
        .catch((err) => console.error("Error fetching my stories:", err));

      getMyChapters(token)
        .then((data) => {
          if (Array.isArray(data)) {
            setChapters(data);
            localStorage.setItem("chapters", JSON.stringify(data));
          }
        })
        .catch((err) => console.error("Error fetching my chapters:", err));

      getFavorites()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            localStorage.setItem(
              "favorites",
              JSON.stringify(data.map((f) => f.id))
            );
            setFavorites(data);
          }
        })
        .catch((err) =>
          console.error("Error fetching favorites from backend:", err)
        );
    } else {
      const savedStories = JSON.parse(localStorage.getItem("stories") || "[]");
      const savedChapters = JSON.parse(
        localStorage.getItem("chapters") || "[]"
      );

      setStories(savedStories.filter((s) => s.createdBy === savedUsername));
      setChapters(savedChapters.filter((c) => c.createdBy === savedUsername));

      const favStories = savedStories.filter((s) =>
        savedFavorites.includes(s.id)
      );
      setFavorites(favStories);
    }
  }, [i18n.language, t]);

  // 📌 Bild hochladen
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

  // 📌 Bild entfernen → zurück zu Default
  const handleImageReset = () => {
    localStorage.removeItem("profileImage");
    setProfileImage(DEFAULT_AVATAR);
  };

  // 📌 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20 relative">
      <div className="soft-panel p-6 sm:p-8 md:p-10">
        {/* 🔸 Profil */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {profileImage !== DEFAULT_AVATAR && (
              <button
                onClick={handleImageReset}
                className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
              >
                {t("profile.remove")}
              </button>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-space">
              {username}
            </h1>

            <div className="flex items-center gap-3 mt-2">
              <label className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                {t("profile.upload")}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 🔸 My Stories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 font-space">{t("profile.myStories")}</h2>
          {stories.length > 0 ? (
            <ul className="space-y-2">
              {stories.map((s) => (
                <li
                  key={s.id}
                  onClick={() => navigate(`/stories/${s.id}`)}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/30 transition"
                >
                  ✍️ {s.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {t("profile.noStories")}
            </p>
          )}
        </div>

        {/* 🔸 My Chapters */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 font-space">{t("profile.myChapters")}</h2>
          {chapters.length > 0 ? (
            <ul className="space-y-2">
              {chapters.map((c) => (
                <li
                  key={c.id}
                  onClick={() => navigate(`/chapters/${c.id}`)}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/30 transition"
                >
                  📖 {c.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {t("profile.noChapters")}
            </p>
          )}
        </div>

        {/* 🔸 Favorites */}
        <div>
          <h2 className="text-2xl font-bold mb-4 font-space">{t("profile.favorites")}</h2>
          {favorites.length > 0 ? (
            <ul className="space-y-2">
              {favorites.map((f) => (
                <li
                  key={f.id}
                  onClick={() => navigate(`/stories/${f.id}`)}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition flex items-center gap-2"
                >
                  <span className="text-yellow-400">★</span>
                  {f.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {t("profile.noFavorites")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
