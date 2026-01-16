import api from "@/lib/axios";
import { Produto } from "@/types/Produto";

export const getCountProdutos = async (idCurso: number): Promise<Produto[]> => {
  const response = await api.get(`/api/user/produtos/count/${idCurso}`);
  return response.data;
};

export const getProdutos = async (
  turmaUuid: string,
  curso: number,
): Promise<Produto[]> => {
  const response = await api.get(
    `/api/user/produtos/turma/${turmaUuid.toString()}`,
    { params: { idCurso: curso } },
  );
  return response.data;
};

export const getProduto = async (uuid: string): Promise<Produto> => {
  const response = await api.get(`/api/user/produtos/${uuid}`);
  return response.data;
};
