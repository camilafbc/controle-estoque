import api from "@/lib/axios";
import { User } from "@/types/User";

export const getMe = async (): Promise<User> => {
  const response = await api.get(`/api/auth/me`);
  return response.data;
};
