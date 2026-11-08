import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { AppRole } from "@/types/AuthUser";

import { authOptions } from "./auth";

/**
 * Contexto de autorização derivado exclusivamente da sessão no servidor.
 * Nunca deve ser montado a partir de dados enviados pelo cliente.
 */
export interface AuthContext {
  userId: number;
  role: AppRole;
  idCurso: number | null;
}

/** Contexto de um usuário comum, que sempre possui curso vinculado. */
export interface UserAuthContext extends AuthContext {
  role: "user";
  idCurso: number;
}

export interface AdminAuthContext extends AuthContext {
  role: "admin";
}

type AuthFailure = { ok: false; status: 401 | 403; error: string };

export type AuthResult<TContext extends AuthContext> =
  | { ok: true; ctx: TContext }
  | AuthFailure;

const UNAUTHENTICATED: AuthFailure = {
  ok: false,
  status: 401,
  error: "Usuário não autenticado.",
};

const FORBIDDEN: AuthFailure = {
  ok: false,
  status: 403,
  error: "Usuário não autorizado.",
};

/** Lê a sessão e normaliza os dados de autorização. */
export async function getAuthContext(): Promise<AuthContext | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const userId = Number(session.user.id);
  const { role, curso } = session.user;

  if (!Number.isInteger(userId) || (role !== "admin" && role !== "user")) {
    return null;
  }

  return {
    userId,
    role,
    idCurso: typeof curso === "number" ? curso : null,
  };
}

/** Exige qualquer usuário autenticado (admin ou user). */
export async function authorizeAuthenticated(): Promise<
  AuthResult<AuthContext>
> {
  const ctx = await getAuthContext();
  if (!ctx) return UNAUTHENTICATED;
  return { ok: true, ctx };
}

/** Exige usuário com role `admin`. */
export async function authorizeAdmin(): Promise<AuthResult<AdminAuthContext>> {
  const ctx = await getAuthContext();
  if (!ctx) return UNAUTHENTICATED;
  if (ctx.role !== "admin") return FORBIDDEN;
  return { ok: true, ctx: { ...ctx, role: "admin" } };
}

/**
 * Exige usuário com role `user` e curso vinculado. O `idCurso` retornado
 * deve ser usado como escopo obrigatório em todas as consultas ao Prisma.
 */
export async function authorizeUser(): Promise<AuthResult<UserAuthContext>> {
  const ctx = await getAuthContext();
  if (!ctx) return UNAUTHENTICATED;
  if (ctx.role !== "user" || ctx.idCurso === null) return FORBIDDEN;
  return { ok: true, ctx: { ...ctx, role: "user", idCurso: ctx.idCurso } };
}

/** Converte uma falha de autorização em resposta HTTP (401/403). */
export function authErrorResponse(failure: AuthFailure) {
  return NextResponse.json(
    { error: true, message: failure.error },
    { status: failure.status },
  );
}
