"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { pdf } from "@react-pdf/renderer";
import { addDays } from "date-fns";
import { FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { createRelatorioMovimentacoes } from "@/api/relatorio";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox/VirtualizedCombobox";
import { useTurmas } from "@/queries/turmas";
import { Turma } from "@/types/Turma";

import Alert from "./Alert";
import RelatorioDocument from "./relatorioMovTurma";

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

interface MovTurmaContainerProps {
  idCurso: number;
  turmas: Turma[];
}

export default function MovTurmaContainer({
  idCurso,
  turmas,
}: MovTurmaContainerProps) {
  const { data: session } = useSession();
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data: turmasData, isLoading: turmasLoading } = useTurmas(
    idCurso,
    turmas,
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      turma: turmas.at(0)?.idTurma.toString(),
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      if (!data.dateRange || !data.dateRange.from) {
        console.error("Intervalo de datas inválido.");
        return;
      }
      const dataFinal = data.dateRange.to
        ? data.dateRange.to
        : data.dateRange.from;

      const formattedData = {
        idCurso: idCurso,
        idTurma: +data.turma,
        dataInicial: data.dateRange.from,
        dataFinal: dataFinal,
      };

      const fetchRelatorio = await createRelatorioMovimentacoes(formattedData);

      if (fetchRelatorio.data.length === 0) {
        setOpenAlert(true);
        setAlertMessage(
          "Não há nenhum registro para o intervalo de datas selecionado.",
        );
        return;
      }

      const blob = await pdf(
        <RelatorioDocument
          data={fetchRelatorio}
          dates={{ inicio: data.dateRange.from, final: dataFinal }}
          user={session?.user.name}
        />,
      ).toBlob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (error) {
      setOpenAlert(true);
      setAlertMessage(`Erro ao gerar relatório: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-y-8 flex w-full flex-1 flex-col gap-28"
    >
      <div className="flex flex-wrap items-start gap-6">
        <FormField
          name="turma"
          control={control}
          render={({ field }) => (
            <FormItem className="relative w-[300px]">
              <VirtualizedCombobox
                {...field}
                required
                label="Turma"
                id="select-turma"
                height={100}
                // size="lg"
                options={
                  turmasData.map((turma: Turma) => ({
                    label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
                    id: turma.idTurma.toString(),
                  })) || []
                }
                placeholder="Buscar turma"
                loading={turmasLoading}
                error={errors.turma?.message}
                value={field.value}
                onChange={(value) => field.onChange(value ?? "")}
              />
              <span className="min-h-[16px] text-xs font-semibold text-destructive">
                {errors.turma && errors.turma.message}
              </span>
            </FormItem>
          )}
        />

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
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          loading={isLoading}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <FileText className="size-5" />
          Gerar Relatório
        </Button>
      </div>
      <Alert open={openAlert} onOpenChange={setOpenAlert} text={alertMessage} />
    </form>
  );
}
