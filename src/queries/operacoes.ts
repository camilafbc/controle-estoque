import { useQuery } from "@tanstack/react-query";

import { getOperacoesByProduto } from "@/api/operacoes";

export const useOperacoes = (id: number) => {
  const query = useQuery({
    queryKey: ["operacoes", id],
    queryFn: () => getOperacoesByProduto(id),
    enabled: !!id,
    staleTime: Infinity,
  });
  return query;
};
