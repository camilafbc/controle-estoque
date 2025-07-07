import api from "@/lib/axios";

export const getOperacoes = async (id: number) => {
  const response = await api.get(`/movimentacoes/${id}`);
  return response.data;
};

export const createOperacao = async (operacao: {
  idProduto: number;
  tipoOp: number;
  quantidade: number;
}) => {
  const result = await api.post("/movimentacoes/add", operacao);
  return result;
};
