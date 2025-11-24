import api from "./axiosConfig";

// 🔹 Alle Kommentare zu einer Story abrufen
export const getComments = async (storyId) => {
  const res = await api.get(`/stories/${storyId}/comments`);
  return res.data;
};

// 🔹 Kommentar zu einer Story hinzufügen
export const addComment = async (storyId, userId, content) => {
  const token = localStorage.getItem("token");
  const res = await api.post(
    `/stories/${storyId}/comments`,
    { user_id: userId, content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// 🔹 Kommentar löschen
export const deleteComment = async (commentId) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
