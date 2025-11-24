import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStory } from "../../api/stories";

export default function CreatePage() {
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
      setMessage("🚫 You must be logged in to create a story.");
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

      setMessage("✅ Story created successfully!");
      setTitle("");
      setGenre("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl(null);

      navigate(`/stories/${newStory.id}`);
    } catch (err) {
      console.error("❌ Error creating story:", err);
      setMessage("❌ Error while creating story.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-6">
        Create your <span className="text-pink-500">own story</span>
      </h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : message.startsWith("🚫")
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Genre (e.g. Fantasy, Sci-Fi, Mystery)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          required
        />

        {/* ✅ Cover Image Upload Field */}
        <div className="border rounded-lg px-4 py-3 bg-gray-50 relative">
          <div className="flex items-center justify-between">
            <label htmlFor="fileUpload" className="text-gray-500 font-normal">
              Cover Image
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
                Choose Image
              </label>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-gray-800 px-3 py-2 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition border border-gray-300 bg-white/90"
                  title="Remove Image"
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
                alt="Preview"
                className="w-full h-80 object-cover rounded-lg border transition-transform duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
