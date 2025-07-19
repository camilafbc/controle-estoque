import { GraduationCap, User } from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";

export default async function DashBoard() {
  const [cursosCount, usersCount] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/admin/cursos/count`, {
      next: {
        revalidate: 0,
      },
    }).then((res) => res.json()),
    fetch(`${process.env.NEXTAUTH_URL}/api/admin/users/count`, {
      next: {
        revalidate: 0,
      },
    }).then((res) => res.json()),
  ]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      <DashboardCard
        delay={0}
        className="bg-card"
        title="Cursos"
        subtitle="Cursos ativos"
        data={cursosCount.count}
        loading={false}
      >
        <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
          <GraduationCap />
        </div>
      </DashboardCard>
      <DashboardCard
        delay={1}
        className="bg-card"
        title="Usuários"
        subtitle="Usuários ativos"
        data={usersCount.count}
        loading={false}
      >
        <div className="rounded-md bg-navbar p-2 text-white dark:bg-slate-800">
          <User />
        </div>
      </DashboardCard>
    </div>
  );
}
