import { useQuery } from "@tanstack/react-query";

import { getOperacoesByProduto } from "@/api/operacoes";
import { Operacao } from "@/types/Operacao";

export const useOperacoes = (id: string, initialData: Operacao[]) => {
  const query = useQuery({
    queryKey: ["operacoes", id],
    queryFn: () => getOperacoesByProduto(id),
    enabled: !!id,
    staleTime: Infinity,
    initialData: initialData,
  });
  return query;
};
