import { createOperacao } from "@/api/operacoes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOperacaoMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (operacao: {
      idProduto: number;
      tipoOp: number;
      quantidade: number;
    }) => createOperacao(operacao),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operacoes"] });
    },
  });
  return mutation;
};
