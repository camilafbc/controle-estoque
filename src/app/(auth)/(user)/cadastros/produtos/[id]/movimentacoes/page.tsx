import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";

import MovimentacoesContainer from "./componentes/Container";

interface PageProps {
  params: {
    id: string;
  };
}

const customCookie = process.env.NEXT_PUBLIC_CUSTOM_COOKIE;

export default async function Page({ params }: PageProps) {
  const uuidProduto = params.id;
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;

  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(customCookie || "");

  const [produto, operacoes] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/user/produtos/${uuidProduto}`, {
      cache: "no-store",
      headers: {
        Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      },
    }).then((res) => res.json()),
    fetch(
      `${process.env.NEXTAUTH_URL}/api/user/operacoes/produto/${uuidProduto}`,
      {
        cache: "no-store",
        headers: {
          Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
        },
      },
    ).then((res) => res.json()),
  ]);

  return (
    <div className="space-y-6">
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Produtos", href: "/cadastros/produtos" },
          { label: "Movimentações" },
        ]}
      />
      <MovimentacoesContainer
        produto={produto.prodDescricao}
        operacoes={operacoes}
      />
    </div>
  );
}
