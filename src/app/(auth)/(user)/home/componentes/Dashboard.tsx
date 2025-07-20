import { Boxes, CalendarDays, GraduationCap, Package } from "lucide-react";
import { getServerSession } from "next-auth";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;

  const [turmasCount, produtosCount, estoqueCount, validadeCount] =
    await Promise.all([
      fetch(`${process.env.NEXTAUTH_URL}/api/user/turmas/count/${idCurso}`, {
        next: {
          revalidate: 0,
        },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXTAUTH_URL}/api/user/produtos/count/${idCurso}`, {
        next: {
          revalidate: 0,
        },
      }).then((res) => res.json()),
      fetch(
        `${process.env.NEXTAUTH_URL}/api/user/produtos/estoque/${idCurso}`,
        {
          next: {
            revalidate: 0,
          },
        },
      ).then((res) => res.json()),
      fetch(
        `${process.env.NEXTAUTH_URL}/api/user/produtos/validade/${idCurso}`,
        {
          next: {
            revalidate: 0,
          },
        },
      ).then((res) => res.json()),
    ]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      <DashboardCard
        delay={0}
        showHeader={false}
        title="Turmas"
        loading={false}
        data={turmasCount}
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
        loading={false}
        data={produtosCount}
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
        loading={false}
        data={validadeCount}
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
        loading={false}
        data={estoqueCount}
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
