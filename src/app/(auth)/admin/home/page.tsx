import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import { authOptions } from "@/lib/auth";
import { countCursos } from "@/services/cursos";
import { countUsers } from "@/services/users";

import Dashboard from "./components/Dashboard";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }

  const [cursos, users] = await Promise.all([countCursos(), countUsers()]);

  return (
    <div className="space-y-6">
      {/* Banner Administrativo */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-orange-500/5 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4">
          <GreetingUser />
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-500/15 dark:text-orange-400">
              Ambiente de Administração Geral
            </span>
            <p className="text-xs text-muted-foreground hidden sm:inline">
              Gerencie os cursos e contas com acesso ao sistema.
            </p>
          </div>
        </div>
      </div>

      <Dashboard initialData={{ cursos, users }} />
    </div>
  );
}
