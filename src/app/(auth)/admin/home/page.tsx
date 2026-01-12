import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

import Dashboard from "./components/Dahsboard";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }
  // const cookieStore = cookies();
  // const sessionCookie = cookieStore.get(customCookie || "");

  // const [cursosCount, usersCount] = await Promise.all([
  //   fetch(`${process.env.NEXTAUTH_URL}/api/admin/cursos/count`, {
  //     cache: "no-store",
  //     headers: {
  //       Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
  //     },
  //   }).then((res) => res.json()),
  //   fetch(`${process.env.NEXTAUTH_URL}/api/admin/users/count`, {
  //     cache: "no-store",
  //     headers: {
  //       Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
  //     },
  //   }).then((res) => res.json()),
  // ]);

  // const initialData = {
  //   cursos: cursosCount.count,
  //   users: usersCount.count,
  // };

  const [cursos, users] = await Promise.all([
    prisma.curso.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/admin/home" />
      <GreetingUser />
      <Dashboard initialData={{ cursos, users }} />
    </div>
  );
}
