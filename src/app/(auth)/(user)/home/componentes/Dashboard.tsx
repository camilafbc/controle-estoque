"use client";

import { Boxes, CalendarDays, GraduationCap, Package } from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAuthContext } from "@/context/AuthContext";
import { useGetCountTurmas } from "@/queries/turmas";

export default function Dashboard() {
  const { user } = useAuthContext();
  const idCurso = Number(user?.curso?.idCurso);

  const countTurmas = useGetCountTurmas(idCurso);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      <DashboardCard
        delay={0}
        showHeader={false}
        title="Turmas"
        loading={countTurmas.isFetching}
        data={String(countTurmas.data)}
        subtitle="cadastradas e ativas"
        icon={
          <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
            <GraduationCap />
          </div>
        }
      />
      <DashboardCard
        delay={1}
        showHeader={false}
        title="Produtos"
        loading={countTurmas.isFetching}
        data={0}
        subtitle="cadastrados para esse curso"
        icon={
          <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
            <Package />
          </div>
        }
      />
      <DashboardCard
        delay={2}
        showHeader={false}
        title="Validade"
        loading={countTurmas.isFetching}
        data={0}
        subtitle="produtos expirando nos próximos 30 dias"
        icon={
          <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
            <CalendarDays />
          </div>
        }
      />
      <DashboardCard
        delay={3}
        showHeader={false}
        title="Estoque"
        loading={countTurmas.isFetching}
        data={0}
        subtitle="produtos em estoque"
        icon={
          <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
            <Boxes />
          </div>
        }
      />
    </div>
  );
}
