"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Minus, Plus } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { MySelect } from "../MySelect";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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

export type FormMovimentacoesFields = yup.InferType<typeof validationSchema>;

export interface FormMovimentacoesRef {
  resetForm: () => void;
  submitForm: () => void;
}

interface FormMovientacoesProps {
  onSubmit: SubmitHandler<FormMovimentacoesFields>;
}

const FormMovimentacoes = forwardRef<
  FormMovimentacoesRef,
  FormMovientacoesProps
>(({ onSubmit }, ref) => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tipo: "0",
      quantidade: 1,
    },
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = form;

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset({
        tipo: "0",
        quantidade: 1,
      });
    },
    submitForm: () => handleSubmit(onSubmit)(),
  }));

  const quantidade = watch("quantidade", 1);

  const handleIncrease = () => {
    setValue("quantidade", Number(quantidade) + 1);
  };

  const handleDecrease = () => {
    setValue("quantidade", Number(quantidade) > 1 ? Number(quantidade) - 1 : 1);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <FormField
            control={control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
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
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.tipo && errors.tipo.message}
                </span>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="quantidade"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
                    size="lg"
                    value={field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setValue("quantidade", Number(value));
                      }
                    }}
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
});

FormMovimentacoes.displayName = "FormMovimentacoes";

export default FormMovimentacoes;
