export type Produto = {
  idProduto: number;
  uuid?: string;
  prodCodigoBarras?: string | null;
  prodDescricao: string;
  prodFabricante: string;
  prodQuantidade: number;
  prodValidade: Date | string;
  prodTurma: number;
  prodCurso: number;
  turma?: {
    uuid: string;
  };
};
