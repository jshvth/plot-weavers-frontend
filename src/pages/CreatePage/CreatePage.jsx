import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStory } from "../../api/stories";
import { useTranslation } from "react-i18next";

export default function CreatePage() {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage(t("create.mustLogin"));
      return;
    }

    try {
      let imageUrl = "https://via.placeholder.com/150";

      if (imageFile) {
        // 🔧 NEU: Korrigierter Upload-Endpunkt + Auth-Header
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stories/upload/story-cover`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Backend liefert { "url": "/uploads/stories/filename.jpg" }
          imageUrl = `${import.meta.env.VITE_API_URL}${data.url}`;
        } else {
          console.error("❌ Fehler beim Bild-Upload:", await response.text());
        }
      }

      const newStoryData = {
        title,
        description,
        genre,
        cover_image: imageUrl, // ✅ Feldname korrigiert
      };

      const newStory = await createStory(newStoryData, token);

      setMessage(t("create.success"));
      setTitle("");
      setGenre("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl(null);

      navigate(`/stories/${newStory.id}`);
    } catch (err) {
      console.error("❌ Error creating story:", err);
      setMessage(t("create.error"));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {t("create.titlePrefix")}
        <span className="text-pink-500">{t("create.titleEmphasis")}</span>
      </h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200"
              : message.startsWith("🚫")
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <input
          type="text"
          placeholder={t("create.storyTitle")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
          required
        />
        <input
          type="text"
          placeholder={t("create.genre")}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
          required
        />
        <textarea
          placeholder={t("create.description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
          rows={4}
          required
        />

        {/* ✅ Cover Image Upload Field */}
        <div className="border rounded-lg px-4 py-3 bg-white dark:bg-gray-900/40 border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center justify-between">
            <label
              htmlFor="fileUpload"
              className="text-gray-500 dark:text-gray-300 font-normal"
            >
              {t("create.coverLabel")}
            </label>

            <div className="flex items-center space-x-3">
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="fileUpload"
                className="text-gray-50 text-base font-medium cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition whitespace-nowrap"
              >
                {t("create.chooseImage")}
              </label>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-gray-800 dark:text-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/80"
                  title={t("create.removeImage")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ✅ Preview inside form box */}
          {previewUrl && (
            <div className="relative mt-3 group">
              <img
                src={previewUrl}
                alt={t("create.previewAlt")}
                className="w-full h-80 object-cover rounded-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition mt-6"
        >
          {t("create.submit")}
        </button>
      </form>
    </div>
  );
}
