// src/api/uploads.js
export async function uploadStoryImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url; // enthält die Bild-URL vom Backend
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
