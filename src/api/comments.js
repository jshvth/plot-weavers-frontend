import api from "./axiosConfig";

export const getComments = async (storyId) => {
  const res = await api.get(`/comments/${storyId}`);
  return res.data;
};

export const addComment = async (storyId, content) => {
  const res = await api.post(`/comments/${storyId}`, { content });
  return res.data;
};

export const deleteComment = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/comments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};