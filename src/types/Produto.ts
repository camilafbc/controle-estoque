export type Produto = {
  idProduto: number;
  uuid?: string;
  prodDescricao: string;
  prodFabricante: string;
  prodQuantidade: number;
  prodValidade: Date | string;
  prodLote: string;
  prodTurma: number;
  prodCurso: number;
  turma?: {
    uuid: string;
  };
};
