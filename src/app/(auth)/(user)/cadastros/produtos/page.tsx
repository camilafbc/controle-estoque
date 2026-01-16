import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BoxesIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getOperacoesPorProduto } from "@/services/operacoes";
import { getProdutoById, getProdutos } from "@/services/produtos";
import { getTurmas } from "@/services/turmas";

import Container from "./components/Container";
import Movimentacoes from "./components/Movimentacoes";

type ProdutosPageProps = {
  searchParams: {
    turma?: string;
    produto?: string;
  };
};

export default async function ProdutosPage({
  searchParams,
}: ProdutosPageProps) {
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;
  const { turma, produto } = searchParams;

  if (!session || session.user?.role !== "user") {
    redirect("/acesso-negado");
  }

  if (!idCurso) {
    throw new Error("Erro ao carregar dados!");
  }

  const turmas = await getTurmas(idCurso);

  if (turmas.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <BoxesIcon size={48} className="text-gray-300" />
        <h2 className="text-xl font-semibold">Nenhuma turma encontrada</h2>
        <p className="text-gray-500">
          Você precisa cadastrar uma turma antes de gerenciar produtos.
        </p>
        <Button asChild>
          <Link href="/cadastros/turmas">Cadastrar Turma</Link>
        </Button>
      </div>
    );
  }

  if (!turma && turmas.length > 0) {
    const primeiraTurma = turmas.filter((t) => t.status === true).at(0)?.uuid;

    if (primeiraTurma) redirect(`/cadastros/produtos?turma=${primeiraTurma}`);
  }

  const queryClient = new QueryClient();

  if (turma) {
    await queryClient.prefetchQuery({
      queryKey: ["produtos", turma, idCurso],
      queryFn: async () => await getProdutos(idCurso, turma),
    });
  }

  if (turma && produto) {
    await queryClient.prefetchQuery({
      queryKey: ["operacoes", produto],
      queryFn: async () => await getOperacoesPorProduto(produto),
    });

    const produtoData = await getProdutoById(produto);

    return (
      <div className="space-y-6">
        <MyBreadcrumb
          listItems={[
            { label: "Cadastros" },
            { label: "Produtos", href: `/cadastros/produtos?turma=${turma}` },
            { label: "Movimentações" },
          ]}
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Movimentacoes
            key={produto}
            turma={turma}
            produto={{
              descricao: produtoData?.prodDescricao ?? "-",
              uuid: produto,
            }}
          />
        </HydrationBoundary>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <MyBreadcrumb
          listItems={[
            { label: "Cadastros" },
            { label: "Produtos", href: `/cadastros/produtos?turma=${turma}` },
          ]}
        />
        <Card>
          <CardHeader className="flex flex-row items-end gap-2">
            <BoxesIcon size={28} className="font-bold text-orange-500" />
            <CardTitle>Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Container idCurso={idCurso} turmas={turmas} />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
}
