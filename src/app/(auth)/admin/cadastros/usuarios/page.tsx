import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Usuários", href: "/admin/cadastros/usuarios" },
        ]}
        homeHref="/admin/home"
      />
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <Users size={28} className="font-bold text-orange-500" />
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <UsersContainer />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
