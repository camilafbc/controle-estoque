"use client";

import * as yup from "yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useProduto } from "@/queries/produtos";
import {
  useInsertProductMutation,
  useUpdateProductMutation,
} from "@/mutations/produtos";
import { AxiosError } from "axios";
import { useTurmas } from "@/queries/turmas";
import { Turma } from "@/types/Turma";
import { MySelect } from "@/components/MySelect";

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
  const { data: turmas, isLoading: turmasLoading } = useTurmas();
  // const [selectedTurma, setSelectedTurma] = useState("");

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
        turma: produtoData.prodTurma.toString(),
      });
      console.log("PRODUTO DATA: ", produtoData);
    }
  }, [editingId, produtoData, reset]);

  const updateProduct = useUpdateProductMutation();
  const insertProduct = useInsertProductMutation(Number(turmaSelect));

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    //console.log(data);

    const formattedDate = data.dataValidade.split("/").reverse().join("-");
    const productData = {
      prodDescricao: data.produto,
      prodFabricante: data.fabricante,
      prodLote: data.lote,
      prodQuantidade: +data.quantidade,
      prodValidade: formattedDate,
      prodTurma: +data.turma,
      // prodTurma: +selectedTurma,
    };

    if (editingId) {
      const updatedProductData = { ...productData, idProduto: editingId };
      updateProduct.mutate(updatedProductData, {
        onSuccess: (response) => {
          // console.log("RESPONSE", response);
          if (response.status === 200) {
            toast.success(response.data.message);
            reset();
          } else {
            toast.error(response.data.message);
          }
        },
        onError: (error) => {
          const axiosError = error as AxiosError<Error>;
          const errorMessage =
            axiosError?.response?.data?.message ||
            error.message ||
            "Ocorreu um erro desconhecido";
          toast.error(errorMessage);
        },
      });
    } else {
      insertProduct.mutate(productData, {
        onSuccess: (response) => {
          if (response.status === 201) {
            toast.success(response.data.message);
            // reset();
          } else {
            toast.error(response.data.message);
          }
        },
        onError: (error) => {
          const axiosError = error as AxiosError<Error>;
          const errorMessage =
            axiosError?.response?.data?.message ||
            error.message ||
            "Ocorreu um erro desconhecido";
          toast.error(errorMessage);
        },
      });
    }
  };

  console.log(errors);

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
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6">
            <Input
              autoFocus
              id="input-produto"
              label="Produto"
              placeholder="Informe a descrição do produto"
              required={true}
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
              required={true}
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
                required={true}
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
                required={true}
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
                placeholder="DD/MM/YYYY"
                maxLength={10}
                required={true}
                error={!!errors.dataValidade}
                {...register("dataValidade")}
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
              <Controller
                name="turma"
                control={control}
                render={({ field }) => (
                  <MySelect
                    {...field}
                    label="Turma"
                    id="select-turma"
                    required={true}
                    loading={turmasLoading}
                    options={turmas?.map((turma: Turma) => ({
                      label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
                      value: String(turma.idTurma),
                    }))}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.turma && errors.turma.message}
              </span>
            </div>
          </div>
          {/* <Separator className="my-6" /> */}
          <div className="mt-10 flex items-center justify-end gap-2">
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
