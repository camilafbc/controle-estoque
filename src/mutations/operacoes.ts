import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOperacao } from "@/actions/produtos/create-movimentacao-produto";

export const useCreateOperacaoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      uuidProduto,
      tipoOp,
      quantidade,
    }: {
      uuidProduto: string;
      tipoOp: number;
      quantidade: number;
    }) => createOperacao(uuidProduto, tipoOp, quantidade),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["operacoes", variables.uuidProduto],
      });
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      });
    },
  });
  return mutation;
};
