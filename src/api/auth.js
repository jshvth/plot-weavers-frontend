import api from "./axiosConfig";

export const registerUser = async (username, password) => {
  const res = await api.post("/auth/register", { username, password });
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  // Token speichern
  if (res.data.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const fetchCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
