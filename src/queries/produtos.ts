import { useQuery } from "@tanstack/react-query";

import { getCountProdutos, getProduto, getProdutos } from "@/api/produtos";

export const useProdutos = (turmaUuid: string, curso: number) => {
  const query = useQuery({
    queryKey: ["produtos", turmaUuid, curso],
    queryFn: () => getProdutos(turmaUuid, curso),
    enabled: !!turmaUuid && !!curso,
    staleTime: Infinity,
  });
  return query;
};

export const useProduto = (id: number) => {
  const query = useQuery({
    queryKey: ["produto", id],
    queryFn: () => getProduto(id),
    enabled: !!id,
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
