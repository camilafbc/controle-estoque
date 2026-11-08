import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FileSpreadsheet } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageHeader } from "@/components/common/PageHeader";
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
      <PageHeader
        title="Relatório de Movimentação"
        description="Consulte e emita relatórios analíticos de entradas e saídas de produtos por turma e período, com visualização em tela, exportação em PDF institucional e planilha CSV."
        icon={<FileSpreadsheet className="size-6 text-primary" />}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovTurmaContainer idCurso={idCurso} userName={session.user.name} />
      </HydrationBoundary>
    </div>
  );
}
