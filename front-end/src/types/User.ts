export type User = {
  idUser: number;
  nome: string;
  email: string;
  senha?: string;
  idCurso: number;
  role: string;
  status: boolean;
};
