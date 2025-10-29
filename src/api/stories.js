// src/api/stories.js
import api from "./axiosConfig";

// ✅ Alle Stories abrufen
export const getAllStories = async () => {
  const res = await api.get("/stories/all");
  return res.data;
};

// ✅ Einzelne Story abrufen
export const getStoryById = async (id) => {
  const res = await api.get(`/stories/${id}`);
  return res.data;
};

// ✅ Neue Story erstellen (mit Token!)
export const createStory = async (storyData, token) => {
  const res = await api.post("/stories/create", storyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data.story; // nur das Story-Objekt zurückgeben
};

// ✅ Story löschen (mit Token!)
export const deleteStory = async (id, token) => {
  const res = await api.delete(`/stories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};
