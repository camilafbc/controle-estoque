"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { forwardRef, ReactNode, useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";

import { Produto } from "@/types/Produto";
import { Turma } from "@/types/Turma";

import DatePickerInput from "../DatePickerInput";
import { MySelect } from "../MySelect";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { VirtualizedCombobox } from "../ui/virtualized-combobox/VirtualizedCombobox";

const validationSchema = yup.object({
  produto: yup.string().required("Campo obrigatório"),
  fabricante: yup.string().required("Campo obrigatório"),
  lote: yup.string().required("Campo obrigatório"),
  quantidade: yup
    .string()
    .matches(/^\d+$/, "Quantidade deve ser um número inteiro")
    .required("Campo obrigatório"),
  // dataValidade: yup.string().required("Campo obrigatório"),
  dataValidade: yup.date().required("Campo obrigatório"),
  turma: yup.string().required("Campo obrigatório"),
});

export type FormProdutoFields = yup.InferType<typeof validationSchema>;

export interface FormProdutoRef {
  resetForm: () => void;
  submitForm: () => void;
}

interface FormProdutoProps {
  onSubmit: SubmitHandler<FormProdutoFields>;
  initialValues?: Produto;
  turmas: Turma[];
  turmasLoading?: boolean;
  defaultFocus?: keyof FormProdutoFields;
}

const FormProduto = forwardRef<FormProdutoRef, FormProdutoProps>(
  (
    {
      initialValues,
      turmas,
      turmasLoading,
      defaultFocus = "produto",
      onSubmit,
    },
    ref,
  ) => {
    const form = useForm<FormProdutoFields>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        produto: "",
        fabricante: "",
        lote: "",
        quantidade: "",
        turma: "",
      },
    });

    const {
      control,
      register,
      handleSubmit,
      reset,
      setFocus,
      formState: { errors },
    } = form;

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          produto: "",
          fabricante: "",
          lote: "",
          quantidade: "",
          turma: "",
        });
      },
      submitForm: () => handleSubmit(onSubmit)(),
    }));

    useEffect(() => {
      setFocus(defaultFocus);
    }, [defaultFocus, setFocus]);

    useEffect(() => {
      if (initialValues) {
        reset({
          produto: initialValues.prodDescricao ?? "",
          fabricante: initialValues.prodFabricante ?? "",
          lote: initialValues.prodLote ?? "",
          quantidade: initialValues.prodQuantidade.toString() ?? "",
          dataValidade: initialValues.prodValidade
            ? dayjs(initialValues.prodValidade).isValid()
              ? dayjs(initialValues.prodValidade).toDate()
              : undefined
            : undefined,
          turma: initialValues?.turma?.uuid.toString() ?? "",
        });
      }
    }, [initialValues, reset]);

    return (
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 pb-16 pt-4 lg:grid-cols-2"
        >
          <FormField
            control={control}
            name="produto"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1 lg:col-span-2">
                <Input
                  autoFocus
                  id="input-produto"
                  label="Produto"
                  placeholder="Informe a descrição do produto"
                  size="lg"
                  required
                  error={!!errors.produto}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="fabricante"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1 lg:col-span-2">
                <Input
                  id="input-fabricante"
                  label="Fabricante"
                  placeholder="Informe o fabricante do produto"
                  size="lg"
                  required
                  error={!!errors.fabricante}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lote"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <Input
                  id="input-lote"
                  label="Lote"
                  placeholder="Informe o lote do produto"
                  size="lg"
                  required
                  error={!!errors.lote}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="quantidade"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <Input
                  id="input-quantidade"
                  label="Quantidade"
                  placeholder="Informe as unidades do produto"
                  size="lg"
                  required
                  error={!!errors.quantidade}
                  {...register("quantidade")}
                  value={field.value}
                  onInput={(ev) => {
                    const value = ev.currentTarget.value.replace(/\D/g, "");
                    ev.currentTarget.value = value;
                    field.onChange(value);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataValidade"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <DatePickerInput
                  label="Validade"
                  placeholder="dd/mm/aaaa"
                  size="lg"
                  required
                  error={!!errors.dataValidade}
                  selected={field.value}
                  onSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="turma"
            control={control}
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <VirtualizedCombobox
                  {...field}
                  required
                  label="Turma"
                  id="select-turma"
                  size="lg"
                  height={100}
                  options={
                    turmas.map((turma: Turma) => ({
                      label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
                      id: turma.uuid?.toString() || "",
                    })) || []
                  }
                  placeholder="Buscar turma"
                  loading={turmasLoading}
                  error={errors.turma?.message}
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);

FormProduto.displayName = "FormProduto";

export default FormProduto;
