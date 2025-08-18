"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { pdf } from "@react-pdf/renderer";
import { addDays } from "date-fns";
import { FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { createRelatorioMovimentacoes } from "@/api/relatorio";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox/VirtualizedCombobox";
import { cn } from "@/lib/utils";
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

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      turma: turmasData
        .filter((turma: Turma) => turma.status === true)
        .at(0)
        ?.idTurma.toString(),
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

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
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-y-8 flex w-full flex-1 flex-col"
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
                  size="lg"
                  height={100}
                  options={
                    turmasData
                      .filter((turma: Turma) => turma.status === true)
                      .map((turma: Turma) => ({
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="dateRange"
            control={control}
            defaultValue={{
              from: addDays(new Date(), -10),
              to: new Date(),
              //to: undefined,
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <div className="flex h-[20px] items-center">
                  <Label>Data</Label>
                </div>

                <DatePickerWithRange
                  onChange={(value) => {
                    field.onChange({
                      from: value?.from,
                      to: value?.to ?? undefined,
                    });
                  }}
                  value={{
                    from: field.value?.from,
                    to: field.value?.to ?? undefined,
                  }}
                  className={cn(
                    "!mt-0 h-10",
                    errors.dateRange && "rounded-md border border-destructive",
                  )}
                />
              </FormItem>
            )}
          />
          <FormMessage />
        </div>
        <div className="mt-72 flex w-full justify-end">
          <Button
            type="submit"
            loading={isLoading}
            className="flex items-center gap-2 hover:bg-orange-500/90"
          >
            <FileText className="size-5" />
            Gerar Relatório
          </Button>
        </div>
        <Alert
          open={openAlert}
          onOpenChange={setOpenAlert}
          text={alertMessage}
        />
      </form>
    </Form>
  );
}
