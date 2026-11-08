import api from "@/lib/axios";
import {
  RelatorioFiltroParams,
  RelatorioMovimentacaoResponse,
} from "@/types/Relatorio";

export const createRelatorioMovimentacoes = async ({
  idCurso,
  idTurma,
  dataInicial,
  dataFinal,
}: RelatorioFiltroParams): Promise<RelatorioMovimentacaoResponse> => {
  const response = await api.post<RelatorioMovimentacaoResponse>(
    "/api/user/operacoes/relatorios/movimentacao-turma",
    { idCurso, idTurma, dataInicial, dataFinal },
  );
  return response.data;
};
