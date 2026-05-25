import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { authOptions } from "@/lib/auth";
import { countCursos } from "@/services/cursos";
import { countUsers } from "@/services/users";

import Dashboard from "./components/Dahsboard";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }

  const [cursos, users] = await Promise.all([countCursos(), countUsers()]);

  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/admin/home" />
      <GreetingUser />
      <Dashboard initialData={{ cursos, users }} />
    </div>
  );
}
