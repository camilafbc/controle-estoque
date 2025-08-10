import { RefObject } from "react";
import { SubmitHandler } from "react-hook-form";

import MyDialog from "@/components/MyDialog";
import FormProduto, {
  FormProdutoFields,
  FormProdutoRef,
} from "@/components/produtos/FormProduto";
import { Button } from "@/components/ui/button";
import { Produto } from "@/types/Produto";
import { Turma } from "@/types/Turma";

interface ProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Produto;
  turmas: Turma[];
  formRef: RefObject<FormProdutoRef>;
  onSubmit: SubmitHandler<FormProdutoFields>;
  isLoading?: boolean;
  onClose: VoidFunction;
  onClick: VoidFunction;
}

export default function ProductDialog({
  open,
  setOpen,
  initialValues,
  formRef,
  turmas,
  onSubmit,
  onClose,
  onClick,
  isLoading = false,
}: ProductDialogProps) {
  return (
    <MyDialog
      size="xl"
      open={open}
      setIsOpen={setOpen}
      title={
        initialValues ? `Editando: ${initialValues.prodDescricao}` : "Cadastro"
      }
      footerChildren={
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="min-w-[120px]"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            loading={isLoading}
            onClick={onClick}
            className="min-w-[120px] bg-primary hover:bg-primary/90"
          >
            Salvar
          </Button>
        </div>
      }
    >
      <FormProduto
        ref={formRef}
        initialValues={initialValues || undefined}
        turmas={turmas}
        turmasLoading={false}
        onSubmit={onSubmit}
      />
    </MyDialog>
  );
}
