import api from "./axiosConfig";

export const likeChapter = async (chapterId) => {
  const res = await api.post(`/likes/${chapterId}`);
  return res.data;
};

export const unlikeChapter = async (chapterId) => {
  const res = await api.delete(`/likes/${chapterId}`);
  return res.data;
};
