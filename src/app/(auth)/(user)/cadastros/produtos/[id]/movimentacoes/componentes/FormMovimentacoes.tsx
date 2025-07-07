"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MySelect } from "@/components/MySelect";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useCreateOperacaoMutation } from "@/mutations/operacoes";

const validationSchema = yup.object({
  tipo: yup.string().required("Campo obrigatório"),
  quantidade: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    })
    .typeError("A quantidade deve ser um número")
    .required("A quantidade é obrigatória")
    .min(1, "A quantidade deve ser pelo menos 1"),
});

type FormData = yup.InferType<typeof validationSchema>;

interface FormProps {
  idProduto: number;
}

export default function FormMovimentacoes({ idProduto }: FormProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      quantidade: 1,
    },
  });

  // Assistir mudanças no campo quantidade
  const quantidade = watch("quantidade", 1);

  // Inicializar a mutation
  const { mutate, isError, isSuccess } = useCreateOperacaoMutation();

  // Função para incrementar quantidade
  const handleIncrease = () => {
    setValue("quantidade", Number(quantidade) + 1);
  };

  // Função para decrementar quantidade (mínimo 1)
  const handleDecrease = () => {
    setValue("quantidade", Number(quantidade) > 1 ? Number(quantidade) - 1 : 1);
  };

  const router = useRouter();

  const handleBack = () => {
    router.push("/cadastros/produtos");
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const operacaoData = {
      idProduto: idProduto,
      tipoOp: Number(data.tipo),
      quantidade: data.quantidade,
    };

    // Chama a mutation para enviar os dados
    mutate(operacaoData, {
      onSuccess: (response) => {
        if (response.status === 201) {
          toast.success(`${response.data.message}`, {
            position: "bottom-right",
            theme: "colored",
          });
        }
        if (response.status !== 201) {
          toast.error(`${response.data.message}`, {
            position: "bottom-right",
            theme: "colored",
          });
        }
      },
      onError: (error) => {
        console.log("Erro: " + error);
        toast.error(`Erro ao salvar registro!`, {
          position: "bottom-right",
          theme: "colored",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-4">
        <div className="w-full md:w-1/4">
          <Controller
            control={control}
            name="tipo"
            render={({ field }) => (
              <MySelect
                {...field}
                label="Tipo"
                id="select-option"
                options={[
                  { label: "Entrada", value: 1 },
                  { label: "Saída", value: 0 },
                ]}
                placeholder="Selecione uma opção"
                error={!!errors.tipo}
                required={true}
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              />
            )}
          />
          <span className="min-h-4 text-xs font-semibold text-destructive">
            {errors.tipo && errors.tipo.message}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Quantidade</Label>
          <div className="group flex w-[150px]">
            <Button
              onClick={handleDecrease}
              type="button"
              className={`rounded-e-none hover:bg-orange-500/90 group-focus-within:ring-1`}
            >
              <Minus />
            </Button>
            <Input
              id="input-quantidade"
              {...register("quantidade")}
              onChange={(e) => setValue("quantidade", Number(e.target.value))}
              className="h-9 rounded-none text-center focus:border focus:ring"
            />
            <Button
              onClick={handleIncrease}
              type="button"
              className={`rounded-s-none hover:bg-orange-500/90 group-focus-within:ring-1`}
            >
              <Plus />
            </Button>
          </div>
          <span className="min-h-4 text-xs font-semibold text-destructive">
            {errors.quantidade && errors.quantidade.message}
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant={"outline"} type="button" onClick={handleBack}>
          Voltar
        </Button>
        <Button type="submit" className="hover:bg-orange-500/90">
          Registrar
        </Button>
      </div>
    </form>
  );
}
