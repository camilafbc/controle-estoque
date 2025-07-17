"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { forwardRef, ReactNode, useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Produto } from "@/types/Produto";
import { Turma } from "@/types/Turma";

import { MySelect } from "../MySelect";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

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

export type FormProdutoFields = yup.InferType<typeof validationSchema>;

export interface FormProdutoRef {
  resetForm: () => void;
  submitForm: () => void;
}

interface FormProdutoProps {
  onSubmit: SubmitHandler<FormProdutoFields>;
  initialValues?: Produto;
  turmas?: Turma[];
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
        dataValidade: "",
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
          dataValidade: "",
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
            ? dayjs(initialValues.prodValidade).format("DD/MM/YYYY")
            : "-",
          turma: initialValues.prodTurma.toString() ?? "",
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
                  required={true}
                  error={!!errors.produto}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.produto && errors.produto.message}
                </span>
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
                  required={true}
                  error={!!errors.fabricante}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.fabricante && errors.fabricante.message}
                </span>
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
                  required={true}
                  error={!!errors.lote}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.lote && errors.lote.message}
                </span>
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
                  required={true}
                  error={!!errors.quantidade}
                  {...register("quantidade")}
                  value={field.value}
                  onInput={(ev) => {
                    const value = ev.currentTarget.value.replace(/\D/g, "");
                    ev.currentTarget.value = value;
                    field.onChange(value);
                  }}
                />
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.quantidade && errors.quantidade.message}
                </span>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dataValidade"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <Input
                  id="input-dataValidade"
                  label="Validade"
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  required={true}
                  error={!!errors.dataValidade}
                  value={field.value}
                  onInput={(ev) => {
                    const value = ev.currentTarget.value
                      .replace(/\D/g, "")
                      .replace(/(\d{2})(\d)/, "$1/$2")
                      .replace(/(\d{2})(\d)/, "$1/$2")
                      .replace(/(\d{4})\d+?$/, "$1");
                    ev.currentTarget.value = value;
                    field.onChange(value);
                  }}
                />
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.dataValidade && errors.dataValidade.message}
                </span>
              </FormItem>
            )}
          />

          <FormField
            name="turma"
            control={control}
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <MySelect
                  {...field}
                  label="Turma"
                  id="select-turma"
                  required={true}
                  loading={turmasLoading}
                  options={
                    turmas?.map((turma: Turma) => ({
                      label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
                      value: String(turma.idTurma),
                    })) || []
                  }
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                />
                <span className="min-h-4 text-xs font-semibold text-destructive">
                  {errors.turma && errors.turma.message}
                </span>
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
