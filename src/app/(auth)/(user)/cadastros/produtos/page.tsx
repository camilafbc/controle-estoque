import { BoxesIcon } from "lucide-react";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";

import Container from "./components/Container";

const customCookie = process.env.NEXT_PUBLIC_CUSTOM_COOKIE;

export default async function ProdutosPage() {
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;

  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(customCookie || "");

  const turmas = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/turmas/curso/${idCurso}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      },
    },
  ).then((res) => res.json());

  return (
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
          <Container turmas={turmas} idCurso={idCurso ? idCurso : 0} />
        </CardContent>
      </Card>
    </div>
  );
}
