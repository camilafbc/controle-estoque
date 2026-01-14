import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduto } from "@/actions/produtos/create-produto";
import { deleteProduto } from "@/actions/produtos/delete-produto";
import { updateProduto } from "@/actions/produtos/update-produtos";
import { Produto } from "@/types/Produto";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (uuid: string) => deleteProduto(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
  return mutation;
};

export const useCreateProdutoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      produto,
      uuidTurma,
    }: {
      produto: Omit<Produto, "idProduto" | "prodTurma">;
      uuidTurma: string;
    }) => createProduto(produto, uuidTurma),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["produtos", variables.uuidTurma, variables.produto.prodCurso],
      });
    },
  });
  return mutation;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      produto,
      uuidTurma,
    }: {
      produto: Omit<Produto, "idProduto" | "prodTurma">;
      uuidTurma: string;
    }) => updateProduto(produto, uuidTurma),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["produtos", variables.uuidTurma, variables.produto.prodCurso],
      });
    },
  });
  return mutation;
};
