export type User = {
  idUser: number;
  nome: string;
  email: string;
  senha?: string;
  idCurso: number;
  // role: string;
};

export type UpdateUser = {
  idUser: number;
  nome: string;
  email: string;
  senha?: string;
};
