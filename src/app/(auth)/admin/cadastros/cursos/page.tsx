import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getCursos } from "@/services/cursos";

import CursosContainer from "./componentes/CursosContainer";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cursos"],
    queryFn: async () => {
      const cursos = await getCursos();
      return cursos;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
            <CursosContainer />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
}
