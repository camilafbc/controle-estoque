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

export const useCreateProdutoMutation = (uuidTurma: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (produto: Omit<Produto, "idProduto" | "prodTurma">) =>
      createProduto(produto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["produtos", uuidTurma, variables.prodCurso],
      });
    },
  });
  return mutation;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (produto: Omit<Produto, "prodTurma">) => updateProduto(produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
  return mutation;
};
