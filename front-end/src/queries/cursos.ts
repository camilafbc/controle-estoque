import { getCursoById, getCursos } from "@/api/cursos";
import { getCountCursos } from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useCursos = () => {
  // console.log("Chamou o useTurmas");
  const query = useQuery({
    queryKey: ["cursos"],
    queryFn: () => getCursos(),
    staleTime: Infinity,
  });
  // console.log("Resultado da Query: " + query);
  return query;
};

export const useGetCurso = (id: number) => {
  const query = useQuery({
    queryKey: ["cursos", id],
    queryFn: () => getCursoById(id),
    enabled: !!id,
    staleTime: Infinity,
  });
  return query;
};

export const useGetCountCurso = () => {
  const query = useQuery({
    queryKey: ["cursos"],
    queryFn: () => getCountCursos(),
    staleTime: Infinity,
  });
  return query;
};
