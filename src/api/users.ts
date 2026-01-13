import api from "@/lib/axios";
import { User } from "@/types/User";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(`/api/admin/users`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/api/admin/users/${id}`);
  return response.data;
};
