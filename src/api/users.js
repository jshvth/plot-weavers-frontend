import api from "./axiosConfig";

export const getMyStories = async () => {
  const res = await api.get("/users/me/stories");
  return res.data;
};

export const getMyChapters = async () => {
  const res = await api.get("/users/me/chapters");
  return res.data;
};
