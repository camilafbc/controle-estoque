import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageHeader } from "@/components/admin/PageHeader";
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
        <PageHeader
          title="Cursos"
          description="Organize os cursos disponíveis para as turmas e usuários."
          icon={<GraduationCap className="size-5" />}
        />
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
          <CursosContainer />
        </div>
      </div>
    </HydrationBoundary>
  );
}
