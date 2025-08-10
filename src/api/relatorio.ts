import api from "@/lib/axios";

export const createRelatorioMovimentacoes = async ({
  idCurso,
  idTurma,
  dataInicial,
  dataFinal,
}: {
  idCurso: number;
  idTurma: number;
  dataInicial: Date;
  dataFinal: Date;
}) => {
  const response = await api.post(
    "/api/user/operacoes/relatorios/movimentacao-turma",
    { idCurso, idTurma, dataInicial, dataFinal },
  );
  return response.data;
};
