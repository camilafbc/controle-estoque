"use client";

import { forwardRef } from "react";
import * as yup from "yup";

import { Form } from "../ui/form";

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
  getValues: () => FormProdutoFields;
}

interface FormProdutoProps {}

const FormProduto = forwardRef<FormProdutoRef, FormProdutoProps>(({}, ref) => {
  return (
    <Form {...form}>
      <form>
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
      </form>
    </Form>
  );
});

FormProduto.displayName = "FormProduto";

export default FormProduto;
