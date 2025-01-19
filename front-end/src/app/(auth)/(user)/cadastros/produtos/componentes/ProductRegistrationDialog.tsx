"use client";

import * as yup from "yup";
import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TurmaSelect } from "@/components/TurmasSelect";
import dayjs from "dayjs";
import { useProduto } from "@/queries/produtos";
import {
  useInsertProductMutation,
  useUpdateProductMutation,
} from "@/mutations/produtos";

interface ProductRegistrationDialogProps {
  editingId: number | null;
  turmaSelect?: number;
  isOpen?: boolean;
  setIsOpen: (state: boolean) => void;
}

const validationSchema = yup.object({
  produto: yup.string().required("Campo obrigatório"),
  fabricante: yup.string().required("Campo obrigatório"),
  lote: yup.string().required("Campo obrigatório"),
  quantidade: yup
    .string()
    .matches(/^\d+$/, "Quantidade deve ser um número inteiro")
    .required("Campo obrigatório"),
  dataValidade: yup.string().required("Campo obrigatório"),
  turma: yup.string().required("Campo obrigatório"),
});

type FormData = yup.InferType<typeof validationSchema>;

export function ProductRegistrationDialog({
  editingId,
  turmaSelect,
  isOpen,
  setIsOpen,
}: ProductRegistrationDialogProps) {
  const { data: produtoData, isLoading } = useProduto(editingId || 0);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      produto: "",
      fabricante: "",
      lote: "",
      quantidade: "",
      dataValidade: "",
      turma: "",
    },
  });

  useEffect(() => {
    if (editingId && produtoData) {
      reset({
        produto: produtoData.prodDescricao,
        fabricante: produtoData.prodFabricante,
        lote: produtoData.prodLote,
        quantidade: String(produtoData.prodQuantidade),
        dataValidade: dayjs(produtoData.prodValidade).format("DD/MM/YYYY"),
        turma: String(produtoData.prodTurma),
      });
    }
  }, [editingId, produtoData, reset]);

  const updateProduct = useUpdateProductMutation();
  const insertProduct = useInsertProductMutation(Number(turmaSelect));

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formattedDate = data.dataValidade.split("/").reverse().join("-");
    const productData = {
      prodDescricao: data.produto,
      prodFabricante: data.fabricante,
      prodLote: data.lote,
      prodQuantidade: +data.quantidade,
      prodValidade: formattedDate,
      prodTurma: +data.turma,
    };

    if (editingId) {
      const updatedProductData = { ...productData, idProduto: editingId };
      updateProduct.mutate(updatedProductData, {
        onSuccess: (response: { status: number }) => {
          if (response.status === 200) {
            toast.success("Produto editado com sucesso!", {
              position: "bottom-right",
              theme: "colored",
            });
            reset();
          }
        },
        onError: () => {
          toast.error("Erro ao editar produto!", {
            position: "top-right",
            theme: "colored",
          });
        },
      });
    } else {
      insertProduct.mutate(productData, {
        onSuccess: (response) => {
          toast.success("Produto cadastrado com sucesso!", {
            position: "bottom-right",
            theme: "colored",
          });
          // reset();
        },
        onError: () => {
          toast.error("Erro ao cadastrar produto!", {
            position: "top-right",
            theme: "colored",
          });
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby="#dialog-description"
        className="m-2 w-[300px] max-w-lg bg-card sm:m-0 sm:w-full md:max-w-2xl lg:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-zinc-700">
            {editingId ? "Editar Produto" : "Cadastrar Produto"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <hr />
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              autoFocus
              id="input-produto"
              label="Produto"
              placeholder="Informe a descrição do produto"
              error={!!errors.produto}
              {...register("produto")}
            />
            <span className="min-h-4 text-xs font-semibold text-destructive">
              {errors.produto && errors.produto.message}
            </span>
          </div>
          <div>
            <Input
              id="input-fabricante"
              label="Fabricante"
              placeholder="Informe o fabricante do produto"
              error={!!errors.fabricante}
              {...register("fabricante")}
            />
            <span className="min-h-4 text-xs font-semibold text-destructive">
              {errors.fabricante && errors.fabricante.message}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="col-span-1">
              <Input
                id="input-lote"
                label="Lote"
                placeholder="Informe o lote do produto"
                error={!!errors.lote}
                {...register("lote")}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.lote && errors.lote.message}
              </span>
            </div>
            <div className="col-span-1">
              <Input
                id="input-quantidade"
                label="Quantidade"
                placeholder="Informe as unidades do produto"
                error={!!errors.quantidade}
                {...register("quantidade")}
                onInput={(ev) => {
                  ev.currentTarget.value = ev.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.quantidade && errors.quantidade.message}
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="col-span-1">
              <Input
                id="input-dataValidade"
                label="Validade"
                error={!!errors.dataValidade}
                {...register("dataValidade")}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                onInput={(ev) => {
                  ev.currentTarget.value = ev.currentTarget.value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "$1/$2")
                    .replace(/(\d{2})(\d)/, "$1/$2")
                    .replace(/(\d{4})\d+?$/, "$1");
                }}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.dataValidade && errors.dataValidade.message}
              </span>
            </div>
            <div className="col-span-1">
              <Label htmlFor="turma">Turma</Label>
              <TurmaSelect
                control={control}
                name="turma"
                error={errors?.turma?.message}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.turma && errors.turma.message}
              </span>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant={"ghost"}
              className="hover:bg-zinc-200"
              onClick={handleClose}
            >
              Fechar
            </Button>
            <Button type="submit" className="align-bottom hover:bg-orange-700">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
