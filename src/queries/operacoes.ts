import { useQuery } from "@tanstack/react-query";

import { getOperacoesByProduto } from "@/api/operacoes";

export const useOperacoes = (uuid: string) => {
  const query = useQuery({
    queryKey: ["operacoes", uuid],
    queryFn: () => getOperacoesByProduto(uuid),
    enabled: !!uuid,
    staleTime: 1000 * 5 * 60,
  });
  return query;
};
