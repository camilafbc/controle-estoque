import api from "@/lib/axios";

export const getOperacoes = async (id: number) => {
  const response = await api.get(`/movimentacoes/${id}`);
  console.log("Chamou a API: " + response.data);
  return response.data;
};

export const createOperacao = async (operacao: {
  idProduto: number;
  tipoOp: number;
  quantidade: number;
}) => {
  const result = await api.post("/movimentacoes/add", operacao);
  console.log("Operação: ", result);
  return result;
};
