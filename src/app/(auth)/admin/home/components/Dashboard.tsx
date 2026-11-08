import { ArrowRight, GraduationCap, User } from "lucide-react";
import Link from "next/link";

import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  initialData: {
    cursos: number;
    users: number;
  };
}

export default async function Dashboard({ initialData }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <DashboardCard
        delay={0}
        showHeader={true}
        title="Cursos"
        description="Cursos ativos no sistema"
        loading={false}
        data={initialData.cursos.toString()}
        icon={
          <div className="rounded-xl bg-lime-100 p-3 text-lime-700 dark:bg-lime-950 dark:text-lime-300">
            <GraduationCap className="size-5" />
          </div>
        }
      />

      <DashboardCard
        delay={1}
        showHeader={true}
        title="Usuários"
        description="Usuários ativos no sistema"
        loading={false}
        data={initialData.users.toString()}
        icon={
          <div className="rounded-xl bg-yellow-100 p-3 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
            <User className="size-5" />
          </div>
        }
      />
      <Link
        href="/admin/cadastros/cursos"
        className="group rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Gerenciar cursos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cadastre, edite e acompanhe os cursos.
            </p>
          </div>
          <ArrowRight className="size-5 text-orange-500 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
      <Link
        href="/admin/cadastros/usuarios"
        className="group rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Gerenciar usuários</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Administre perfis, acessos e cursos vinculados.
            </p>
          </div>
          <ArrowRight className="size-5 text-orange-500 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
}
