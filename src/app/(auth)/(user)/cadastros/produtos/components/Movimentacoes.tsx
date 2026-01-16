"use client";

import { ListPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import FormMovimentacoes, {
  FormMovimentacoesFields,
  FormMovimentacoesRef,
} from "@/components/movimentacoes/FormMovimentacoes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useCreateOperacaoMutation } from "@/mutations/operacoes";
import { useOperacoes } from "@/queries/operacoes";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getErrorMessageFromAction } from "@/utils/getErrorMessageFromAction";

import { columns } from "./TableMovimentacoesColumns";

interface MovimentacoesProps {
  turma: string;
  produto: {
    descricao: string;
    uuid: string;
  };
}

export default function Movimentacoes({ turma, produto }: MovimentacoesProps) {
  if (!produto) {
    throw new Error("Erro ao carregar dados!");
  }

  const operacoesData = useOperacoes(produto.uuid);
  const formRef = useRef<FormMovimentacoesRef>(null);

  const createMovimentacao = useCreateOperacaoMutation();

  const router = useRouter();

  const handleBack = () => {
    router.push(`/cadastros/produtos?turma=${turma}`);
  };

  const onSubmit: SubmitHandler<FormMovimentacoesFields> = async (data) => {
    const payload = {
      uuidProduto: produto.uuid,
      tipoOp: Number(data.tipo),
      quantidade: data.quantidade,
    };

    createMovimentacao.mutate(payload, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-end gap-2">
          <ListPlus size={28} className="font-bold text-orange-500" />
          <CardTitle>Movimentações</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <p className="truncate font-bold">
              Produto:{" "}
              <span className="truncate font-semibold uppercase">
                {produto.descricao}
              </span>
            </p>
          </div>

          <FormMovimentacoes ref={formRef} onSubmit={onSubmit} />
          <div className="mt-6 flex justify-end gap-4">
            <Button variant={"outline"} type="button" onClick={handleBack}>
              Voltar
            </Button>
            <Button
              type="button"
              loading={createMovimentacao.isPending}
              onClick={() => formRef.current?.submitForm()}
              className="hover:bg-orange-500/90"
            >
              Registrar
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Histórico de Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={operacoesData.data || []}
            isLoading={operacoesData.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
