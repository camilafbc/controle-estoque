import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCountProdutos, getProduto, getProdutos } from "@/api/produtos";
import { Produto } from "@/types/Produto";

export const useProdutos = (turmaUuid: string, curso: number) => {
  const query = useQuery({
    queryKey: ["produtos", turmaUuid, curso],
    queryFn: () => getProdutos(turmaUuid, curso),
    enabled: !!turmaUuid || !!curso,
    staleTime: Infinity,
  });
  return query;
};

export const useProduto = (uuid: string, turmaUuid: string, curso: number) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["produto", uuid],
    queryFn: () => getProduto(uuid),
    placeholderData: () => {
      const produtos = queryClient.getQueryData<Produto[]>([
        "produtos",
        turmaUuid,
        curso,
      ]);
      return produtos?.find((produto) => produto.uuid === uuid);
    },
    enabled: !!uuid,
    staleTime: Infinity,
  });
  return query;
};

export const useGetCountProduto = (idCurso: number) => {
  const query = useQuery({
    queryKey: ["produtos-count", idCurso],
    queryFn: () => getCountProdutos(idCurso),
    staleTime: Infinity,
  });
  return query;
};
