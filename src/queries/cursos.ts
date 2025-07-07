import { useQuery } from "@tanstack/react-query";

import { getCursoById, getCursos } from "@/api/cursos";
import { getCountCursos } from "@/api/dashboard";

export const useCursos = () => {
  const query = useQuery({
    queryKey: ["cursos"],
    queryFn: () => getCursos(),
    staleTime: Infinity,
  });
  return query;
};

export const useGetCurso = (id: number) => {
  const { data: cursos } = useCursos();
  const query = useQuery({
    queryKey: ["cursos", id],
    queryFn: () => getCursoById(id),
    enabled: !!id,
    initialData: () => {
      return cursos?.find((curso) => curso.idCurso === id);
    },
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
