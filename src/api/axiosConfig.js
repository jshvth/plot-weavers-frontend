import axios from "axios";

// Backend-URL von Render:
const API_BASE_URL = "https://plot-weavers-backend.onrender.com";
const API_BASE_URL_DEV = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token automatisch mitsenden
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
