import axios from "axios";

const isDev = false
export const backendApiUrl = isDev ? 'http://localhost:5000' : "https://nero-aura-serverpro.ru"

const api = axios.create({
  baseURL: backendApiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}` // Подставляем токен, если есть
  }
});

export default api;