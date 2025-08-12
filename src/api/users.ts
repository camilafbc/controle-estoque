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

export const insertUser = async (user: Omit<User, "idUser">) => {
  const response = await api.post("/api/admin/users", user);
  return response.data;
};

export const updateUser = async (user: Partial<User>) => {
  const response = await api.put(`/api/admin/users/${user.idUser}`, user);
  return response.data;
};

export const updateProfile = async (user: Partial<User>) => {
  const response = await api.put(`/api/auth/me/${user.idUser}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/api/admin/users/${id}`);
  return response;
};
