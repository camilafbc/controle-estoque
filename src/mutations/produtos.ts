import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProdutos, createProduto, updateProduto } from "@/api/produtos";
import { Produto } from "@/types/Produto";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (uuid: string) => deleteProdutos(uuid),
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
      console.log("CHAVE CREATE>: ", uuidTurma, variables.prodCurso);
    },
  });
  return mutation;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (produto: Omit<Produto, "prodTurma">) => updateProduto(produto),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["produtos", data.updated.turma.uuid, variables.prodCurso],
      });
    },
  });
  return mutation;
};
