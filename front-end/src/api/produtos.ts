import api from "@/lib/axios";
import { Produto } from "@/types/Produto";

export const getProdutos = async (turma: number): Promise<Produto[]> => {
  const response = await api.get(`/produtos/list/${turma}`);
  return response.data;
};

export const getProduto = async (id: number): Promise<Produto> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const insertProduto = async (product: Omit<Produto, "idProduto">) => {
  const response = await api.post("/produtos", { product });
  return response;
};

export const updateProduto = async (product: Produto) => {
  const response = await api.put("/produtos", { product });
  return response;
};

export const deleteProdutos = async (id: number) => {
  const response = await api.delete(`/produtos/${id}`);
  return response.status;
};
