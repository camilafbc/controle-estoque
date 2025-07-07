import api from "@/lib/axios";

export const createRelatorioMovimentacoes = async (formatedData: {
  idTurma: string;
  dataInicial: string;
  dataFinal: string;
}) => {
  const response = await api.post(
    "/movimentacoes/relatorioMovTurma",
    formatedData,
  );
  return response.data;
};
