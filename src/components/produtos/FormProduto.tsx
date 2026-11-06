"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { getProdutoByCodigoBarras } from "@/api/produtos";
import { gtinSchema } from "@/schemas/gtin-schema";
import {
  FormProdutoFields,
  produtoValidationSchema,
} from "@/schemas/produto-schema";
import { Produto } from "@/types/Produto";
import { Turma } from "@/types/Turma";
import { getErrorMessage } from "@/utils/getErrorMessage";

import DatePickerInput from "../DatePickerInput";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { VirtualizedCombobox } from "../ui/virtualized-combobox/VirtualizedCombobox";

// const validationSchema = yup.object({
//   produto: yup.string().required("Campo obrigatório"),
//   fabricante: yup.string().required("Campo obrigatório"),
//   lote: yup.string().required("Campo obrigatório"),
//   quantidade: yup
//     .string()
//     .matches(/^\d+$/, "Quantidade deve ser um número inteiro")
//     .required("Campo obrigatório"),
//   // dataValidade: yup.string().required("Campo obrigatório"),
//   dataValidade: yup.date().required("Campo obrigatório"),
//   turma: yup.string().required("Campo obrigatório"),
// });

// export type FormProdutoFields = yup.InferType<typeof validationSchema>;

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
      defaultFocus = "prodCodigoBarras",
      onSubmit,
    },
    ref,
  ) => {
    const params = useSearchParams();
    const turmaSelected = params.get("turma");

    const form = useForm<FormProdutoFields>({
      resolver: zodResolver(produtoValidationSchema),
      defaultValues: {
        prodDescricao: "",
        prodFabricante: "",
        prodCodigoBarras: "",
        prodQuantidade: "",
        turma: turmaSelected ?? "",
      },
    });

    const {
      control,
      handleSubmit,
      reset,
      setFocus,
      formState: { errors },
    } = form;

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          prodDescricao: "",
          prodFabricante: "",
          prodCodigoBarras: "",
          prodQuantidade: "",
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
          prodDescricao: initialValues.prodDescricao ?? "",
          prodFabricante: initialValues.prodFabricante ?? "",
          prodCodigoBarras: initialValues.prodCodigoBarras ?? "",
          prodQuantidade: initialValues.prodQuantidade.toString() ?? "",
          prodValidade: initialValues.prodValidade
            ? dayjs(initialValues.prodValidade).isValid()
              ? dayjs(initialValues.prodValidade).toDate()
              : undefined
            : undefined,
          turma: initialValues?.turma?.uuid.toString() ?? "",
        });
      }
    }, [initialValues, reset]);

    const [barcodeLoading, setBarcodeLoading] = useState(false);
    const [barcodeMessage, setBarcodeMessage] = useState<string | null>(null);

    const lookupBarcode = async () => {
      const codigoBarras = (form.getValues("prodCodigoBarras") ?? "").replace(
        /\D/g,
        "",
      );
      form.setValue("prodCodigoBarras", codigoBarras, { shouldDirty: true });
      setBarcodeMessage(null);
      const validation = gtinSchema.safeParse(codigoBarras);
      if (!validation.success) {
        setBarcodeMessage(
          "Informe um GTIN válido, com dígito verificador correto.",
        );
        return;
      }

      setBarcodeLoading(true);
      try {
        const produto = await getProdutoByCodigoBarras(codigoBarras);
        const descricaoAtual = form.getValues("prodDescricao").trim();
        const fabricanteAtual = form.getValues("prodFabricante").trim();
        const hasValues =
          descricaoAtual.length > 0 || fabricanteAtual.length > 0;
        const shouldReplace =
          !hasValues ||
          window.confirm(
            "Substituir a descrição e o fabricante preenchidos pelos dados encontrados?",
          );

        if (shouldReplace) {
          form.setValue("prodDescricao", produto.descricao, {
            shouldDirty: true,
          });
          if (produto.fabricante) {
            form.setValue("prodFabricante", produto.fabricante, {
              shouldDirty: true,
            });
          }
        }
        form.setValue("prodCodigoBarras", produto.codigoBarras, {
          shouldDirty: true,
        });
        setBarcodeMessage(
          "Produto encontrado. Confira os dados antes de salvar.",
        );
      } catch (error) {
        setBarcodeMessage(getErrorMessage(error));
      } finally {
        setBarcodeLoading(false);
      }
    };

    return (
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 pb-16 pt-4 lg:grid-cols-2"
        >
          <FormField
            control={control}
            name="prodCodigoBarras"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <div className="flex items-end gap-2">
                  <Input
                    id="input-codigo-barras"
                    label="Código de barras"
                    placeholder="Digite o código de barras do produto"
                    size="lg"
                    error={!!errors.prodCodigoBarras}
                    ref={field.ref}
                    value={field.value}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void lookupBarcode();
                      }
                    }}
                    onInput={(event) => {
                      const value = event.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                      event.currentTarget.value = value;
                      field.onChange(value);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    loading={barcodeLoading}
                    onClick={lookupBarcode}
                    aria-label="Buscar produto pelo código de barras"
                    className="text-orange-500 hover:text-orange-500/90"
                  >
                    <Search className="mr-2 size-4" />
                    Buscar
                  </Button>
                </div>
                <FormMessage />
                {barcodeMessage && (
                  <p className="text-sm text-orange-400">{barcodeMessage}</p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="prodDescricao"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1 lg:col-span-2">
                <Input
                  id="input-produto"
                  label="Produto"
                  placeholder="Informe a descrição do produto"
                  size="lg"
                  required
                  error={!!errors.prodDescricao}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="prodFabricante"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1 lg:col-span-2">
                <Input
                  id="input-fabricante"
                  label="Fabricante"
                  placeholder="Informe o fabricante do produto"
                  size="lg"
                  required
                  error={!!errors.prodFabricante}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="prodQuantidade"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <Input
                  id="input-quantidade"
                  label="Quantidade"
                  placeholder="Informe as unidades do produto"
                  size="lg"
                  required
                  error={!!errors.prodQuantidade}
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
            name="prodValidade"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <DatePickerInput
                  label="Validade"
                  placeholder="dd/mm/aaaa"
                  size="lg"
                  required
                  error={!!errors.prodValidade}
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
                    turmas
                      .filter((turma: Turma) => turma.status === true)
                      .map((turma: Turma) => ({
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
