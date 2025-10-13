import api from "./axiosConfig";

export const addFavorite = async (storyId) => {
  const res = await api.post(`/favorites/${storyId}`);
  return res.data;
};

export const removeFavorite = async (storyId) => {
  const res = await api.delete(`/favorites/${storyId}`);
  return res.data;
};

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data;
};
