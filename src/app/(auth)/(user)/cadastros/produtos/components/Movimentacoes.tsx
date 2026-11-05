"use client";

import { ArrowLeft, CheckCircle2, History, PlusCircle } from "lucide-react";
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
      onSuccess: (res) => {
        if ("error" in res && res.error) {
          const msg = getErrorMessageFromAction(res);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success(res.message);
        formRef.current?.resetForm();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Card de Registro de Movimentação */}
      <Card className="rounded-2xl border border-border/70 shadow-sm">
        <CardHeader className="flex flex-col gap-2 border-b border-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
              <PlusCircle className="size-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Registrar Nova Movimentação</CardTitle>
              <p className="text-xs text-muted-foreground">
                Item: <span className="font-semibold text-foreground uppercase">{produto.descricao}</span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="gap-2 self-start rounded-xl sm:self-auto"
          >
            <ArrowLeft className="size-4" />
            Voltar aos Produtos
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          <FormMovimentacoes ref={formRef} onSubmit={onSubmit} />
          <div className="mt-6 flex justify-end gap-3 border-t border-border/50 pt-4">
            <Button variant="ghost" type="button" onClick={handleBack} className="rounded-xl">
              Cancelar
            </Button>
            <Button
              type="button"
              loading={createMovimentacao.isPending}
              onClick={() => formRef.current?.submitForm()}
              className="gap-2 rounded-xl"
            >
              <CheckCircle2 className="size-4" />
              Confirmar Operação
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card de Histórico */}
      <Card className="rounded-2xl border border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <History className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Histórico de Movimentações</CardTitle>
              <p className="text-xs text-muted-foreground">
                Últimas movimentações de entrada e saída registradas para este produto.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
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
