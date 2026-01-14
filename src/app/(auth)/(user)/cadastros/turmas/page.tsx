import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getTurmas } from "@/services/turmas";

import TurmasContainer from "./componentes/TurmasContainer";

const customCookie = process.env.NEXT_PUBLIC_CUSTOM_COOKIE;

export default async function Page() {
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;

  if (!session || session.user?.role !== "user") {
    redirect("/acesso-negado");
  }

  if (!idCurso) {
    throw new Error("Erro ao carregar dados!");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["turmas", idCurso],
    queryFn: async () => await getTurmas(idCurso),
  });

  // const cookieStore = cookies();
  // const sessionCookie = cookieStore.get(customCookie || "");

  // const turmas = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/user/turmas/curso/${idCurso}`,
  //   {
  //     cache: "no-store",
  //     headers: {
  //       Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
  //     },
  //   },
  // ).then((res) => res.json());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <MyBreadcrumb
          listItems={[{ label: "Cadastros" }, { label: "Turmas" }]}
        />
        <Card>
          <CardHeader className="flex flex-row items-end gap-2">
            <GraduationCap size={28} className="font-bold text-orange-500" />
            <CardTitle>Turmas</CardTitle>
          </CardHeader>
          <CardContent>
            <TurmasContainer />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
}
