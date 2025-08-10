import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOperacao } from "@/api/operacoes";

export const useCreateOperacaoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (operacao: {
      uuidProduto: string;
      tipoOp: number;
      quantidade: number;
    }) => createOperacao(operacao),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["operacoes", variables.uuidProduto],
      });
    },
  });
  return mutation;
};
