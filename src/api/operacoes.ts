import api from "@/lib/axios";

// export const getOperacoes = async (id: number) => {
//   const response = await api.get(`/api/user/operacoes/${id}`);
//   return response.data;
// };

export const createOperacao = async (operacao: {
  idProduto: number;
  tipoOp: number;
  quantidade: number;
}) => {
  const result = await api.post("/api/user/operacoes", operacao);
  return result.data;
};

export const getOperacoesByProduto = async (idProduto: number) => {
  const response = await api.get(`/api/user/operacoes/produto/${idProduto}`);
  return response.data;
};
