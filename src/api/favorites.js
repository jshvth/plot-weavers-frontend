import api from "./axiosConfig";

// Alle Favoriten des eingeloggten Nutzers abrufen
export const getFavorites = async () => {
  const res = await api.get("/favorites/me");
  return res.data;
};

// Story favorisieren oder entfernen (toggle)
export const toggleFavorite = async (storyId) => {
  const res = await api.post(`/favorites/toggle/${storyId}`);
  return res.data;
};