import { useQuery } from "@tanstack/react-query";

import { getCountTurmas, getTurmaById, getTurmas } from "@/api/turmas";

export const useTurmas = (idCurso: number) => {
  // console.log("Chamou o useTurmas");
  const query = useQuery({
    queryKey: ["turmas"],
    queryFn: () => getTurmas(idCurso),
    enabled: !!idCurso,
    staleTime: Infinity,
  });
  // console.log("Resultado da Query: " + query);
  return query;
};

export const useGetTurmaById = (
  id: string,
  options?: { enabled?: boolean },
) => {
  const query = useQuery({
    queryKey: ["turmas", id],
    queryFn: () => getTurmaById(id),
    enabled: !!id && (options?.enabled ?? true),
    staleTime: Infinity,
  });
  return query;
};

export const useGetCountTurmas = (idCurso: number) => {
  const query = useQuery({
    queryKey: ["turmas-count", idCurso],
    queryFn: () => getCountTurmas(idCurso),
    enabled: !!idCurso,
    staleTime: Infinity,
  });
  return query;
};
