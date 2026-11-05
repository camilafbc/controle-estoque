import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-8">
      <MyBreadcrumb homeHref="/admin/home" />
      <Card className="border-none bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg">
        <CardContent className="flex flex-col gap-2 p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-wide text-white/80">
            Painel administrativo
          </p>
          <GreetingUser />
          <p className="max-w-2xl text-sm text-white/80">
            Acompanhe os cadastros principais e acesse rapidamente as tarefas
            de administração do estoque.
          </p>
        </CardContent>
      </Card>
      <Dashboard initialData={{ cursos, users }} />
    </div>
  );
}
