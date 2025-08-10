import { GraduationCap, User } from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  initialData: {
    cursos: number;
    users: number;
  };
}

export default async function Dashboard({ initialData }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      <DashboardCard
        delay={0}
        showHeader={true}
        title="Cursos"
        description="cadastrados e ativos"
        loading={false}
        data={initialData.cursos}
        icon={
          <div className="rounded-md bg-lime-500 p-2 text-white dark:bg-lime-900">
            <GraduationCap />
          </div>
        }
      />

      <DashboardCard
        delay={1}
        showHeader={true}
        title="Usuários"
        description="cadastrados e ativos"
        loading={false}
        data={initialData.users}
        icon={
          <div className="rounded-md bg-yellow-500 p-2 text-white dark:bg-yellow-900">
            <User />
          </div>
        }
      />
    </div>
  );
}
