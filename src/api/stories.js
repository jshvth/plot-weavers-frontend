import api from "./axiosConfig";

export const getAllStories = async () => {
  const res = await api.get("/stories/all");
  return res.data;
};

export const getStoryById = async (id) => {
  const res = await api.get(`/stories/${id}`);
  return res.data;
};

export const createStory = async (storyData) => {
  const res = await api.post("/stories/create", storyData);
  return res.data;
};

export const deleteStory = async (id) => {
  const res = await api.delete(`/stories/${id}`);
  return res.data;
};

