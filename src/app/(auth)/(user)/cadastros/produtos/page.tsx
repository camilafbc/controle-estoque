import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BoxesIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getProdutos } from "@/services/produtos";

import Container from "./components/Container";

export default async function ProdutosPage() {
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
    queryKey: ["produtos", idCurso],
    queryFn: async () =>
      await getProdutos(idCurso, "3469c6d4-a12a-4768-be0f-cfe3bc75ae0b"),
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
          listItems={[
            { label: "Cadastros" },
            { label: "Produtos", href: "/cadastros/produtos" },
          ]}
        />
        <Card>
          <CardHeader className="flex flex-row items-end gap-2">
            <BoxesIcon size={28} className="font-bold text-orange-500" />
            <CardTitle>Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Container idCurso={idCurso} />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
}
