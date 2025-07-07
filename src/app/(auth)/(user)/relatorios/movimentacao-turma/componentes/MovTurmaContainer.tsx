"use client";

import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { MySelect } from "@/components/MySelect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Turma } from "@/types/Turma";
import { addDays } from "date-fns";
import { FileText } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTurmas } from "@/queries/turmas";
import dayjs from "dayjs";
import { createRelatorioMovimentacoes } from "@/api/relatorio";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "./relatorioMovTurma";

const validationSchema = yup.object().shape({
  turma: yup.string().required("Turma é obrigatória"),
  dateRange: yup
    .object()
    .shape({
      from: yup.date().required("Data de início é obrigatória"),
      to: yup.date().notRequired().nullable().default(undefined),
    })
    .nullable()
    .required("Intervalo de datas é obrigatório"),
});

type FormData = yup.InferType<typeof validationSchema>;

export default function MovTurmaContainer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { data: turmas, isLoading: turmasLoading } = useTurmas();

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

    const fetchRelatorio = await createRelatorioMovimentacoes(formattedData);

    const blob = await pdf(<MyDocument teste={fetchRelatorio} />).toBlob();
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-wrap items-center gap-6 space-y-6"
      >
        <div className="flex flex-wrap items-start gap-6">
          <div>
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
                    errors.dateRange && "rounded-md border border-destructive"
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
  );
}
