export type AppRole = "admin" | "user";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  curso?: number;
  token?: string;
  role: AppRole;
};
