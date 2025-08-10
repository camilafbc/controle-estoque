import { RefObject } from "react";
import { SubmitHandler } from "react-hook-form";

import FormMovimentacoes, {
  FormMovimentacoesFields,
  FormMovimentacoesRef,
} from "@/components/movimentacoes/FormMovimentacoes";
import { Button } from "@/components/ui/button";

interface MovimentacaoProps {
  formRef: RefObject<FormMovimentacoesRef>;
  onSubmit: SubmitHandler<FormMovimentacoesFields>;
  onClickBack: VoidFunction;
  loading: boolean;
  onClick: VoidFunction;
}

export default function Movimentacao({
  formRef,
  loading,
  onClick,
  onClickBack,
  onSubmit,
}: MovimentacaoProps) {
  return (
    <>
      <FormMovimentacoes ref={formRef} onSubmit={onSubmit} />
      <div className="flex justify-end gap-4">
        <Button variant={"outline"} type="button" onClick={onClickBack}>
          Voltar
        </Button>
        <Button
          type="button"
          loading={loading}
          onClick={onClick}
          className="hover:bg-orange-500/90"
        >
          Registrar
        </Button>
      </div>
    </>
  );
}
