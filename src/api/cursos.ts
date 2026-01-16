import api from "@/lib/axios";
import { Curso } from "@/types/Curso";

export const getCursos = async (): Promise<Curso[]> => {
  const response = await api.get(`/api/admin/cursos`);
  return response.data;
};

export const getCursoById = async (id: number): Promise<Curso> => {
  const response = await api.get(`/api/admin/cursos/${id}`);
  return response.data;
};
