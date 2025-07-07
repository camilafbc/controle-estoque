import api from "@/lib/axios";
import { Turma } from "@/types/Turma";

export const getCountTurmas = async (idCurso: number) => {
  const response = await api.get(`/api/user/turmas/count/${idCurso}`);
  return response.data;
};

export const getTurmas = async (idCurso: number) => {
  const response = await api.get(`/api/user/turmas/curso/${idCurso}`);
  return response.data;
};

export const getTurmaById = async (id: string): Promise<Turma> => {
  const response = await api.get(`/api/user/turmas/${id}`);
  return response.data;
};

export const createTurma = async (turma: Omit<Turma, "idTurma">) => {
  const response = await api.post("/api/user/turmas", turma);
  return response.data;
};

export const updateTurma = async (turma: Turma) => {
  const response = await api.put(`/api/user/turmas/${turma.idTurma}`, turma);
  return response.data;
};

export const deleteTurma = async (id: number) => {
  const response = await api.delete(`/api/user/turmas/${id}`);
  return response.status;
};
