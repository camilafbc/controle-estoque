import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCursoById, getCursos } from "@/api/cursos";
import { getCountCursos } from "@/api/dashboard";
import { Curso } from "@/types/Curso";

export const useCursos = (initialData?: Curso[]) => {
  const query = useQuery({
    queryKey: ["cursos"],
    queryFn: () => getCursos(),
    initialData: initialData,
    staleTime: 1000 * 60 * 5,
  });
  return query;
};

export const useGetCurso = (id: number) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["cursos", id],
    queryFn: () => getCursoById(id),
    enabled: !!id,
    placeholderData: () => {
      const cursos = queryClient.getQueryData<Curso[]>(["cursos"]);
      return cursos?.find((curso) => curso.idCurso === id);
    },
    staleTime: 1000 * 60 * 5,
  });
  return query;
};

export const useGetCountCurso = () => {
  const query = useQuery({
    queryKey: ["cursosCount"],
    queryFn: () => getCountCursos(),
    staleTime: Infinity,
  });
  return query;
};
