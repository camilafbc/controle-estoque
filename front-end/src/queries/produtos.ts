import { getProduto, getProdutos } from "@/api/produtos";
import { useQuery } from "@tanstack/react-query";

export const useProdutos = (turma: number) => {
  const query = useQuery({
    queryKey: ["produtos", turma],
    queryFn: () => getProdutos(turma),
    staleTime: Infinity,
  });
  return query;
};

export const useProduto = (id: number) => {
  const query = useQuery({
    queryKey: ["produto", id],
    queryFn: () => getProduto(id),
    staleTime: Infinity,
  });
  return query;
};
