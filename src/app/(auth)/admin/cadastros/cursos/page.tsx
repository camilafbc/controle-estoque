import { GraduationCap } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";

import CursosContainer from "./componentes/CursosContainer";

const customCookie = process.env.NEXT_PUBLIC_CUSTOM_COOKIE;

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(customCookie || "");

  const cursos = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/cursos`, {
    cache: "no-store",
    headers: {
      Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
    },
  }).then((res) => res.json());

  return (
    <div className="space-y-6">
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Cursos", href: "/admin/Cursos" },
        ]}
        homeHref="/admin/home"
      />
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <GraduationCap size={28} className="font-bold text-orange-500" />
          <CardTitle>Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          <CursosContainer cursos={cursos} />
        </CardContent>
      </Card>
    </div>
  );
}
