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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["operacoes", data.operacao.produto.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "produtos",
          data.operacao.produto.turma.uuid,
          data.operacao.produto.prodCurso,
        ],
      });
    },
  });
  return mutation;
};
