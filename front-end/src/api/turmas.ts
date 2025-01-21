import api from "@/lib/axios";
import { Turma } from "@/types/Turma";

export const getTurmas = async () => {
  const response = await api.get(`/turmas`);
  return response.data;
};

export const getTurmaById = async (id: string) => {
  const response = await api.get(`/turmas/${id}`);
  return response.data;
};

export const insertTurma = async (turma: Omit<Turma, "idTurma">) => {
  const response = await api.post("/turmas", turma);
  return response;
};

export const updateTurma = async (turma: Turma) => {
  const response = await api.put("/turmas", turma);
  return response;
};

export const deleteTurma = async (id: number) => {
  const response = await api.delete(`/turmas/${id}`);
  return response.status;
};
