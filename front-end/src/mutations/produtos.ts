import { deleteProdutos, insertProduto, updateProduto } from "@/api/produtos";
import { Produto } from "@/types/Produto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const useInsertProductMutation = (turma: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (produto: Omit<Produto, "idProduto">) => insertProduto(produto),
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
