import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Boxes, GraduationCap, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
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
      <div className="space-y-6">
        <PageHeader
          title="Produtos"
          description="Gerencie os itens em estoque de cada turma."
          icon={<Boxes className="size-6" />}
        />
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <EmptyState
            title="Nenhuma turma cadastrada"
            description="Você precisa cadastrar uma turma antes de poder gerenciar e cadastrar produtos no estoque."
            icon={<GraduationCap className="size-6 text-orange-500" />}
            action={
              <Button asChild className="gap-2">
                <Link href="/cadastros/turmas">
                  <PlusCircle className="size-4" />
                  Cadastrar Turma
                </Link>
              </Button>
            }
          />
        </div>
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
    const produtoData = await getProdutoById(produto, idCurso);

    if (!produtoData) {
      redirect(`/cadastros/produtos?turma=${turma}`);
    }

    await queryClient.prefetchQuery({
      queryKey: ["operacoes", produto],
      queryFn: async () => await getOperacoesPorProduto(produto, idCurso),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="space-y-6">
          <PageHeader
            title="Movimentações de Estoque"
            description={`Entradas e saídas registradas para o produto "${produtoData.prodDescricao}".`}
            icon={<Boxes className="size-6" />}
          />
          <Movimentacoes
            key={produto}
            turma={turma}
            produto={{
              descricao: produtoData.prodDescricao,
              uuid: produto,
            }}
          />
        </div>
      </HydrationBoundary>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <PageHeader
          title="Produtos"
          description="Acompanhe o saldo em estoque, validade e movimentações dos itens por turma."
          icon={<Boxes className="size-6" />}
        />
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
          <Container idCurso={idCurso} turmas={turmas} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
