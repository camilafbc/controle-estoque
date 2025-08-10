import api from "@/lib/axios";

// export const getOperacoes = async (id: number) => {
//   const response = await api.get(`/api/user/operacoes/${id}`);
//   return response.data;
// };

export const createOperacao = async (operacao: {
  uuidProduto: string;
  tipoOp: number;
  quantidade: number;
}) => {
  const result = await api.post("/api/user/operacoes", operacao);
  return result.data;
};

export const getOperacoesByProduto = async (uuidProduto: string) => {
  const response = await api.get(`/api/user/operacoes/produto/${uuidProduto}`);
  return response.data;
};
