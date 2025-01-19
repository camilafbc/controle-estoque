import api from "@/lib/axios";
import { UpdateUser, User } from "@/types/User";

export const getUsers = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const insertUser = async (user: Omit<User, "idUser">) => {
  const response = await api.post("/users", {
    user: user,
  });
  return response.status;
};

export const updateUser = async (user: UpdateUser) => {
  const response = await api.put("/users", user);
  return response.status;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.status;
};
