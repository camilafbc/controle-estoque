import api from "@/lib/axios";
import { Curso } from "@/types/Curso";

export const getCursos = async () => {
  const response = await api.get(`/cursos`);
  return response.data;
};

export const getCursoById = async (id: number) => {
  const response = await api.get(`/cursos/${id}`);
  return response.data;
};

export const insertCurso = async (curso: Omit<Curso, "idCurso">) => {
  const response = await api.post("/cursos", curso);
  return response.status;
};

export const updateCurso = async (curso: Curso) => {
  const response = await api.put("/cursos", curso);
  return response.status;
};

export const deleteCurso = async (id: number) => {
  const response = await api.delete(`/cursos/${id}`);
  return response.status;
};
