"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { FileSpreadsheet, FileText, Info, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox/VirtualizedCombobox";
import { useRelatorioMovimentacao } from "@/hooks/useRelatorioMovimentacao";
import { cn } from "@/lib/utils";
import { useTurmas } from "@/queries/turmas";
import { Turma } from "@/types/Turma";

import Alert from "./Alert";
import { RelatorioResumoCards } from "./RelatorioResumoCards";
import { RelatorioTabela } from "./RelatorioTabela";

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
  userName?: string;
}

export default function MovTurmaContainer({
  idCurso,
  userName,
}: MovTurmaContainerProps) {
  const { data: session } = useSession();
  const effectiveUserName = userName ?? session?.user?.name;

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { data: turmasData, isLoading: turmasLoading } = useTurmas(idCurso);

  const {
    reportData,
    isLoading,
    isGeneratingPdf,
    isExportingCsv,
    search,
    setSearch,
    resumo,
    filteredData,
    fetchRelatorio,
    exportPdf,
    exportCsv,
  } = useRelatorioMovimentacao();

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
      turma:
        turmasData
          ?.filter((turma: Turma) => turma.status === true)
          ?.at(0)
          ?.idTurma.toString() ?? "",
      dateRange: {
        from: addDays(new Date(), -30),
        to: new Date(),
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (!data.dateRange || !data.dateRange.from) {
        return;
      }
      const dataFinal = data.dateRange.to
        ? data.dateRange.to
        : data.dateRange.from;

      const formattedData = {
        idCurso,
        idTurma: +data.turma,
        dataInicial: data.dateRange.from,
        dataFinal,
      };

      const result = await fetchRelatorio(formattedData);

      if (result.data.length === 0) {
        setAlertMessage(
          "Não há nenhum registro de movimentação para o intervalo e turma selecionados.",
        );
        setOpenAlert(true);
      }
    } catch (error) {
      setAlertMessage(
        error instanceof Error
          ? error.message
          : `Erro ao consultar movimentações: ${String(error)}`,
      );
      setOpenAlert(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulário de Filtro e Parâmetros */}
      <Card className="border border-border/70 p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      height={180}
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
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Período de Movimentação</Label>
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
                        "w-full",
                        errors.dateRange &&
                          "rounded-md border border-destructive",
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Banner Orientativo */}
            <div className="flex items-start gap-3 rounded-2xl bg-orange-500/5 p-4 ring-1 ring-orange-500/15 dark:bg-orange-500/10">
              <Info className="mt-0.5 size-5 shrink-0 text-orange-600 dark:text-orange-400" />
              <div className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Visão Analítica:
                </span>{" "}
                Selecione a turma e o intervalo de datas para inspecionar os
                saldos diretamente nesta tela ou exportar o relatório oficial
                consolidado em PDF institucional e planilha CSV para o Excel.
              </div>
            </div>

            {/* Ações do Formulário */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <Button
                type="submit"
                loading={isLoading}
                size="lg"
                className="gap-2 rounded-xl px-6"
              >
                <Search className="size-4" />
                Consultar Movimentações
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* Seção de Resultados / Visualização Interativa do Relatório */}
      {reportData && (
        <div className="space-y-6">
          {/* Cabeçalho da Consulta com Informações e Ações de Exportação */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {reportData.curso ?? "Curso"}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs font-medium text-muted-foreground">
                  Turma:{" "}
                  <strong className="text-foreground">
                    {reportData.turma} ({reportData.turnoTurma})
                  </strong>
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Resultado Consolidado da Movimentação
              </h2>
            </div>

            {/* Botões de Exportação */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => exportCsv(effectiveUserName)}
                loading={isExportingCsv}
                className="gap-2 rounded-xl"
              >
                <FileSpreadsheet className="size-4 text-emerald-600 dark:text-emerald-400" />
                Planilha CSV
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => exportPdf(effectiveUserName)}
                loading={isGeneratingPdf}
                className="gap-2 rounded-xl"
              >
                <FileText className="size-4" />
                Visualizar PDF
              </Button>
            </div>
          </div>

          {/* Cartões com Indicadores Principais (KPIs) */}
          <RelatorioResumoCards resumo={resumo} />

          {/* Tabela Interativa de Produtos com Busca Integrada */}
          <RelatorioTabela
            items={filteredData}
            totalItens={reportData.data.length}
            search={search}
            onSearchChange={setSearch}
            resumo={resumo}
          />
        </div>
      )}

      {/* Alerta de feedback */}
      <Alert open={openAlert} onOpenChange={setOpenAlert} text={alertMessage} />
    </div>
  );
}
