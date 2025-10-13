// src/api/uploads.js
import api from "./axiosConfig";

// 🔹 Bild oder Datei hochladen
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

//Diese Funktion kannst du z. B. beim Erstellen einer Story oder eines Kapitels aufrufen, wenn der User ein Cover oder ein Bild hinzufügen möchte.

//Wichtig: Dein Backend muss dafür eine Route /upload (oder /uploads) unterstützen, die FormData annimmt.