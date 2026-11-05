"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { FileText, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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

const validationSchema = z.object({
  turma: z.string().min(1, "Turma é obrigatória"),
  dateRange: z
    .object({
      from: z.date({ message: "Data de início é obrigatória" }),
      to: z.date().nullable().optional(),
    })
    .nullable()
    .refine((value) => value?.from, "Intervalo de datas é obrigatório"),
});

type FormData = z.infer<typeof validationSchema>;

interface MovTurmaContainerProps {
  idCurso: number;
}

export default function MovTurmaContainer({ idCurso }: MovTurmaContainerProps) {
  const { data: session } = useSession();
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data: turmasData, isLoading: turmasLoading } = useTurmas(idCurso);

  const turmaOptions = useMemo(
    () =>
      (turmasData ?? [])
        .filter((turma: Turma) => turma.status)
        .map((turma: Turma) => ({
          label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
          id: turma.idTurma.toString(),
        })),
    [turmasData],
  );

  const form = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      turma: turmasData
        ?.filter((turma: Turma) => turma.status === true)
        ?.at(0)
        ?.idTurma.toString() ?? "",
    },
  });

  const {
    control,
    handleSubmit,
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

      const [{ pdf }, { default: RelatorioDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./relatorioMovTurma"),
      ]);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Seletor de Turma */}
          <FormField
            name="turma"
            control={control}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <VirtualizedCombobox
                  {...field}
                  required
                  label="Turma Selecionada"
                  id="select-turma"
                  size="lg"
                  height={150}
                  options={turmaOptions}
                  placeholder="Selecione a turma desejada..."
                  loading={turmasLoading}
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seletor de Intervalo de Datas */}
          <FormField
            name="dateRange"
            control={control}
            defaultValue={{
              from: addDays(new Date(), -30),
              to: new Date(),
            }}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label>Período de Movimentação</Label>
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
                    "w-full",
                    errors.dateRange && "rounded-md border border-destructive",
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Card informativo de apoio ao usuário */}
        <div className="flex items-start gap-3 rounded-2xl bg-orange-500/5 p-4 ring-1 ring-orange-500/15 dark:bg-orange-500/10">
          <Info className="size-5 shrink-0 text-orange-600 dark:text-orange-400 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Como funciona o relatório:</span> O sistema consolidará todas as entradas e saídas de produtos no período selecionado, calculando os saldos e organizando os dados prontos para impressão ou arquivo digital oficial do Senac.
          </div>
        </div>

        {/* Ação de Submissão alinhada */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            loading={isLoading}
            size="lg"
            className="gap-2 rounded-xl px-6"
          >
            <FileText className="size-5" />
            Gerar Relatório em PDF
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
