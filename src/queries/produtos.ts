import { useQuery } from "@tanstack/react-query";

import { getProduto, getProdutos } from "@/api/produtos";

export const useProdutos = (turma: number, curso: number) => {
  const query = useQuery({
    queryKey: ["produtos", turma, curso],
    queryFn: () => getProdutos(turma, curso),
    enabled: !!turma && !!curso,
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
