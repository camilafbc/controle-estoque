import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCursoById, getCursos } from "@/api/cursos";
import { Curso } from "@/types/Curso";

export const useCursos = () => {
  const query = useQuery({
    queryKey: ["cursos"],
    queryFn: () => getCursos(),
    staleTime: 5 * 60 * 1000,
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
