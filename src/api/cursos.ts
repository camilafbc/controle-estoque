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

export const createCurso = async (curso: Omit<Curso, "idCurso">) => {
  const response = await api.post("/api/admin/cursos", curso);
  return response.data;
};

export const updateCurso = async (curso: Curso) => {
  const response = await api.put(`/api/admin/cursos/${curso.idCurso}`, curso);
  return response.data;
};

export const deleteCurso = async (id: number) => {
  const response = await api.delete(`/api/admin/cursos/${id}`);
  return response.data;
};
