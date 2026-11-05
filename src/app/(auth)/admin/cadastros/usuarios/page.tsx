import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageHeader } from "@/components/admin/PageHeader";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/services/users";

import UsersContainer from "./componentes/UsersContainer";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/acesso-negado");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(session.user.id),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuários"
        description="Gerencie perfis, permissões e o curso associado a cada usuário."
        icon={<Users className="size-5" />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
          <UsersContainer />
        </div>
      </HydrationBoundary>
    </div>
  );
}
