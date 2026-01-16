export type User = {
  idUser: number;
  nome: string;
  email: string;
  password?: string;
  idCurso?: number;
  role: "admin" | "user";
  status: boolean;
  curso?: {
    idCurso: number;
    nomeCurso: string;
  };
};
