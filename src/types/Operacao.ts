export type Operacao = {
  tipoOperacao: number;
  nome: string;
  data: Date;
  quantidade: number;
};

export type DashboardOperacao = Operacao & {
  prodDescricao: string;
};

export type RelatorioDozeMeses = {
  mes: number | string;
  ano: number | string;
  entradas: number;
  saidas: number;
};
