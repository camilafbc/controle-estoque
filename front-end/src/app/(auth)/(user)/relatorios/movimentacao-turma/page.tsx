"use client";

import { pdf } from "@react-pdf/renderer";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TurmaSelect } from "@/components/TurmasSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import MyDocument from "./componentes/relatorioTeste";
import { addDays } from "date-fns";
import { createRelatorioMovimentacoes } from "@/api/relatorio";

// Esquema de validação usando Yup
const validationSchema = yup.object().shape({
  turma: yup.string().required("Turma é obrigatória"),
  dateRange: yup
    .object()
    .shape({
      from: yup.date().required("Data de início é obrigatória"),
      to: yup.date().notRequired().nullable().default(undefined),
      // to: yup.date().required("Data de fim é obrigatória"),
    })
    .nullable()
    .required("Intervalo de datas é obrigatório"),
});

type FormData = yup.InferType<typeof validationSchema>;

export default function Page() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Garantir que `to` seja `undefined` se não for fornecido
    const dataFinal = data.dateRange?.to
      ? dayjs(data.dateRange.to).format("YYYY-MM-DD")
      : dayjs(data.dateRange.from).format("YYYY-MM-DD");

    const formattedData = {
      idTurma: data.turma,
      dataInicial: dayjs(data.dateRange.from).format("YYYY-MM-DD"),
      dataFinal: dataFinal,
    };

    // console.log("Dados formatados para o banco:", formattedData);

    const fetchRelatorio = await createRelatorioMovimentacoes(formattedData);
    // console.log(fetchRelatorio);

    const blob = await pdf(<MyDocument teste={fetchRelatorio} />).toBlob();
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");
  };

  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Relatórios" },
          { label: "Mov. por turma", href: "/relatorios/movimentacao-turma" },
        ]}
      />
      <h2 className="mt-4 text-lg font-bold md:text-2xl">
        Relatório de Movimentação por Turma
      </h2>
      <Separator orientation="horizontal" className="mb-4" />
      <Card>
        <CardContent className="py-8">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full items-center gap-6 space-y-6"
              //className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              <div className="flex flex-wrap items-start gap-6">
                <div>
                  <Label>Turma</Label>
                  <TurmaSelect
                    control={control}
                    name="turma"
                    error={errors?.turma?.message}
                  />
                  <span className="min-h-[16px] text-xs font-semibold text-destructive">
                    {errors.turma && errors.turma.message}
                  </span>
                </div>
                <div>
                  <Label>Data</Label>
                  <Controller
                    name="dateRange"
                    control={control}
                    defaultValue={{
                      from: addDays(new Date(), -10),
                      to: new Date(),
                      //to: undefined,
                    }}
                    render={({ field }) => (
                      <DatePickerWithRange
                        // onChange={field.onChange}
                        // value={field.value}
                        onChange={(value) => {
                          // Normaliza `null` para `undefined`
                          field.onChange({
                            from: value?.from,
                            to: value?.to ?? undefined,
                          });
                        }}
                        value={{
                          from: field.value?.from,
                          to: field.value?.to ?? undefined,
                        }}
                        className={
                          errors.dateRange &&
                          "rounded-md border border-destructive"
                        }
                      />
                    )}
                  />
                  <span className="min-h-4 text-xs font-semibold text-destructive">
                    {errors.dateRange && errors.dateRange.from?.message}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  className="flex items-center gap-2 hover:bg-orange-500/90"
                >
                  <FileText className="size-5" />
                  Gerar Relatório
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
