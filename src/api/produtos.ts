import api from "@/lib/axios";
import { Produto } from "@/types/Produto";

export interface GtinProduct {
  codigoBarras: string;
  descricao: string;
  fabricante: string;
}

export const getProdutoByCodigoBarras = async (
  codigoBarras: string,
): Promise<GtinProduct> => {
  const response = await api.get<GtinProduct>(
    `/api/user/produtos/gtin/${encodeURIComponent(codigoBarras)}`,
  );
  return response.data;
};

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
