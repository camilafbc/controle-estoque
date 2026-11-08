import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageHeader } from "@/components/common/PageHeader";
import { authOptions } from "@/lib/auth";
import { getTurmas } from "@/services/turmas";

import TurmasContainer from "./componentes/TurmasContainer";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <PageHeader
          title="Turmas"
          description="Cadastre, organize os turnos e controle o status das turmas do seu curso."
          icon={<GraduationCap className="size-6" />}
        />
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
          <TurmasContainer />
        </div>
      </div>
    </HydrationBoundary>
  );
}
