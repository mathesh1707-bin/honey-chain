import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// attach the JWT to every request, if we have one
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("honeychain_user");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;