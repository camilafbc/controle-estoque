import { getOperacoes } from "@/api/operacoes";
import { useQuery } from "@tanstack/react-query";

export const useOperacoes = (id: number) => {
  const query = useQuery({
    queryKey: ["operacoes", id],
    queryFn: () => getOperacoes(id),
    enabled: !!id,
    staleTime: Infinity,
  });
  return query;
};
