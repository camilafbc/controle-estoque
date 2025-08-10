import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  withCredentials: true,
});

export default api;
