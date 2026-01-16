import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getTurmas } from "@/services/turmas";

import MovTurmaContainer from "./componentes/Container";

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

  return (
    <div className="space-y-6">
      <MyBreadcrumb
        listItems={[
          { label: "Relatórios" },
          { label: "Mov. por turma", href: "/relatorios/movimentacao-turma" },
        ]}
      />
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <FileText size={28} className="font-bold text-orange-500" />
          <CardTitle>Relatório de Movimentação por Turma</CardTitle>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MovTurmaContainer idCurso={idCurso} />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
