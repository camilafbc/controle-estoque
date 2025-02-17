import api from "@/lib/axios";
import { User } from "@/types/User";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(`/users`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const insertUser = async (user: Omit<User, "idUser">) => {
  const response = await api.post("/users", {
    user: user,
  });
  return response;
};

export const updateUser = async (user: Partial<User>) => {
  const response = await api.put("/users", user);
  return response;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response;
};
