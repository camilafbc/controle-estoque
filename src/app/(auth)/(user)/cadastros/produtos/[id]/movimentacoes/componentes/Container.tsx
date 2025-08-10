"use client";

import { ListPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import FormMovimentacoes, {
  FormMovimentacoesFields,
  FormMovimentacoesRef,
} from "@/components/movimentacoes/FormMovimentacoes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateOperacaoMutation } from "@/mutations/operacoes";
import { useOperacoes } from "@/queries/operacoes";
import { Operacao } from "@/types/Operacao";
import { getErrorMessage } from "@/utils/getErrorMessage";

import HistoricoMovimentacoes from "./Historico";
import Movimentacao from "./Movimentacao";

interface MovimentacoesContainerProps {
  produto: string;
  operacoes: Operacao[];
}

export default function MovimentacoesContainer({
  operacoes,
  produto,
}: MovimentacoesContainerProps) {
  const { id } = useParams();
  const uuidProduto = String(id);
  const operacoesData = useOperacoes(uuidProduto, operacoes);
  const formRef = useRef<FormMovimentacoesRef>(null);

  const createMovimentacao = useCreateOperacaoMutation();

  const router = useRouter();

  const handleBack = () => {
    router.push("/cadastros/produtos");
  };

  const handleCreateMovimentacao = (data: {
    uuidProduto: string;
    tipoOp: number;
    quantidade: number;
  }) => {
    createMovimentacao.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const onSubmit: SubmitHandler<FormMovimentacoesFields> = async (data) => {
    const payload = {
      uuidProduto: uuidProduto,
      tipoOp: Number(data.tipo),
      quantidade: data.quantidade,
    };

    handleCreateMovimentacao(payload);
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
                {produto}
              </span>
            </p>
          </div>
          <Movimentacao
            formRef={formRef}
            onClickBack={handleBack}
            onClick={() => formRef.current?.submitForm()}
            loading={createMovimentacao.isPending}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
      <HistoricoMovimentacoes
        data={operacoesData.data}
        isLoading={operacoesData.isFetching}
      />
    </div>
  );
}
