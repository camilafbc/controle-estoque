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
