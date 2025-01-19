import { getTurmaById, getTurmas } from "@/api/turmas";
import { useQuery } from "@tanstack/react-query";

export const useTurmas = () => {
  // console.log("Chamou o useTurmas");
  const query = useQuery({
    queryKey: ["turmas"],
    queryFn: () => getTurmas(),
    staleTime: Infinity,
  });
  // console.log("Resultado da Query: " + query);
  return query;
};

export const useGetTurma = (id: string) => {
  const query = useQuery({
    queryKey: ["turmas", id],
    queryFn: () => getTurmaById(id),
    enabled: !!id,
    staleTime: Infinity,
  });
  return query;
};
