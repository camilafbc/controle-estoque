import { redirect } from "next/navigation";

import { getAuthContext } from "@/lib/authz";
import { AppRole } from "@/types/AuthUser";

/**
 * Helper para checar a role do usuário no servidor em Server Components.
 * Redireciona para login se não autenticado, ou acesso negado se sem permissão.
 */
export async function checkRole(requiredRole: AppRole) {
  const ctx = await getAuthContext();

  if (!ctx) {
    redirect("/");
  }

  if (ctx.role !== requiredRole) {
    redirect("/acesso-negado");
  }

  return ctx;
}
