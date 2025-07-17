import api from "@/lib/axios";
import { Produto } from "@/types/Produto";

export const getCountProdutos = async (idCurso: number): Promise<Produto[]> => {
  const response = await api.get(`/api/user/produtos/count/${idCurso}`);
  return response.data;
};

export const getProdutos = async (
  turma: number,
  curso: number,
): Promise<Produto[]> => {
  const response = await api.get(
    `/api/user/produtos/turma/${turma.toString()}`,
    { params: { idCurso: curso } },
  );
  return response.data;
};

export const getProduto = async (id: number): Promise<Produto> => {
  const response = await api.get(`/api/user/produtos/${id}`);
  return response.data;
};

export const createProduto = async (produto: Omit<Produto, "idProduto">) => {
  const response = await api.post("/api/user/produtos", produto);
  return response.data;
};

export const updateProduto = async (produto: Produto) => {
  const response = await api.put("/api/user/produtos", { produto });
  return response.data;
};

export const deleteProdutos = async (id: number) => {
  const response = await api.delete(`/api/user/produtos/${id}`);
  return response.status;
};
