export interface RelatorioMovimentacaoItem {
  prodDescricao: string;
  prodFabricante: string;
  entradas: number;
  saidas: number;
}

export interface RelatorioMovimentacaoResponse {
  curso?: string;
  turma: string;
  turnoTurma: string;
  data: RelatorioMovimentacaoItem[];
}

export interface RelatorioFiltroParams {
  idCurso: number;
  idTurma: number;
  dataInicial: Date;
  dataFinal: Date;
}

export interface RelatorioResumo {
  totalItens: number;
  totalEntradas: number;
  totalSaidas: number;
  saldoGeral: number;
}
