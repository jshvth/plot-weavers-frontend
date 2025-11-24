import api from "./axiosConfig";

// Alle Kapitel einer Story laden
export const getChaptersByStoryId = async (storyId) => {
  const res = await api.get(`/chapters?story_id=${storyId}`);
  return res.data;
};

// Einzelnes Kapitel laden
export const getChapterById = async (chapterId) => {
  const res = await api.get(`/chapters/${chapterId}`);
  return res.data;
};

// Neues Kapitel erstellen (mit parent_id)
export const createChapter = async (chapterData, token) => {
  const res = await api.post("/chapters/create", chapterData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Kapitel löschen
export const deleteChapter = async (chapterId) => {
  const res = await api.delete(`/chapters/${chapterId}`);
  return res.data;
};

// Kapitel aktualisieren
export const updateChapter = async (chapterId, updatedData) => {
  const res = await api.put(`/chapters/${chapterId}`, updatedData);
  return res.data;
};
