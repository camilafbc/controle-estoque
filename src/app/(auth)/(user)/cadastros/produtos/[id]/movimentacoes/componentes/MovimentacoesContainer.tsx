"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormMovimentacoes from "./FormMovimentacoes";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useOperacoes } from "@/queries/operacoes";
import { useProduto } from "@/queries/produtos";
import { columns } from "./TableColumns";
import { useParams } from "next/navigation";

export default function MovimentacoesContainer() {
  const { id } = useParams();
  const idProduto = Number(id);
  const { data: operacoes, isLoading: operacoesLoading } =
    useOperacoes(idProduto);
  const { data: produtoData, isLoading } = useProduto(idProduto);

  // useEffect(() => {
  //   operacoes.refetch();
  // }, [operacoes]);

  return (
    <>
      {isLoading ? (
        <div className="pulse flex h-[300px] w-full items-center justify-center rounded-md bg-white/90"></div>
      ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg uppercase">
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
              data={operacoes || []}
              isLoading={operacoesLoading}
            />
          </div>
        </>
      )}
    </>
  );
}
