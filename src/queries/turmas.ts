import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCountTurmas, getTurmaById, getTurmas } from "@/api/turmas";
import { Turma } from "@/types/Turma";

export const useTurmas = (idCurso: number, initialData: Turma[]) => {
  const query = useQuery({
    queryKey: ["turmas"],
    queryFn: () => getTurmas(idCurso),
    enabled: !!idCurso,
    initialData: initialData,
    staleTime: 5 * 60 * 1000,
  });
  return query;
};

export const useGetTurmaById = (
  id: string,
  options?: { enabled?: boolean },
) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["turmas", id],
    queryFn: () => getTurmaById(id),
    enabled: !!id && (options?.enabled ?? true),
    placeholderData: () => {
      const turmas = queryClient.getQueryData<Turma[]>(["turmas"]);
      return turmas?.find((turma) => turma.idTurma === +id);
    },
    staleTime: 5 * 60 * 1000,
  });
  return query;
};

export const useGetCountTurmas = (idCurso: number) => {
  const query = useQuery({
    queryKey: ["turmas-count", idCurso],
    queryFn: () => getCountTurmas(idCurso),
    enabled: !!idCurso && !isNaN(idCurso),
    staleTime: Infinity,
  });
  return query;
};
