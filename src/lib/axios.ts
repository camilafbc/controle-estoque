import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  withCredentials: true,
});

// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     const token = session?.accessToken;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default api;
