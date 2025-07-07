import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProdutos, createProduto, updateProduto } from "@/api/produtos";
import { Produto } from "@/types/Produto";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteProdutos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
  return mutation;
};

export const useCreateProdutoMutation = (turma: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (produto: Omit<Produto, "idProduto">) => createProduto(produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos", turma] });
    },
  });
  return mutation;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (produto: Produto) => updateProduto(produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
  return mutation;
};
