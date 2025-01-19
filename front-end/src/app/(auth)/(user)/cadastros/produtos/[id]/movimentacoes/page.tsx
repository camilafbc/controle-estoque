"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import { columns } from "./componentes/TableColumns";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import FormMovimentacoes from "./componentes/FormMovimentacoes";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import LoaderComponent from "@/components/LoaderComponent";
import { useProduto } from "@/queries/produtos";
import { useOperacoes } from "@/queries/operacoes";

export default function Page() {
  const { id } = useParams();
  const idProduto = Number(id);
  const operacoes = useOperacoes(idProduto);
  const { data: produtoData, isLoading } = useProduto(idProduto);

  useEffect(() => {
    operacoes.refetch();
  }, [operacoes]);

  if (operacoes.isLoading) return <LoaderComponent />;

  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Produtos", href: "/cadastros/produtos" },
          { label: "Movimentações" },
        ]}
      />
      <h2 className="mt-4 text-lg font-bold md:text-2xl">Movimentações</h2>
      <Separator orientation="horizontal" className="mb-4" />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">
            {produtoData?.prodDescricao}
          </CardTitle>
          <Separator orientation="horizontal" />
        </CardHeader>

        <CardContent>
          <FormMovimentacoes idProduto={idProduto} />
        </CardContent>
      </Card>
      <div>
        <h3 className="mb-2 font-semibold">Histórico de Movimentações</h3>
        <DataTable
          columns={columns}
          data={operacoes.data || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
