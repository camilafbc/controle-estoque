"use client";

import type { DocumentProps as ReactPdfDocumentProps } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";

import { createRelatorioMovimentacoes } from "@/api/relatorio";
import {
  RelatorioFiltroParams,
  RelatorioMovimentacaoItem,
  RelatorioMovimentacaoResponse,
  RelatorioResumo,
} from "@/types/Relatorio";

export function useRelatorioMovimentacao() {
  const [reportData, setReportData] =
    useState<RelatorioMovimentacaoResponse | null>(null);
  const [dates, setDates] = useState<{ inicio: Date; final: Date } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [search, setSearch] = useState("");

  const resumo: RelatorioResumo = useMemo(() => {
    if (!reportData || !reportData.data.length) {
      return {
        totalItens: 0,
        totalEntradas: 0,
        totalSaidas: 0,
        saldoGeral: 0,
      };
    }

    let totalEntradas = 0;
    let totalSaidas = 0;

    for (const item of reportData.data) {
      totalEntradas += Number(item.entradas) || 0;
      totalSaidas += Number(item.saidas) || 0;
    }

    return {
      totalItens: reportData.data.length,
      totalEntradas,
      totalSaidas,
      saldoGeral: totalEntradas - totalSaidas,
    };
  }, [reportData]);

  const filteredData: RelatorioMovimentacaoItem[] = useMemo(() => {
    if (!reportData?.data) return [];
    const term = search.trim().toLocaleLowerCase("pt-BR");
    if (!term) return reportData.data;

    return reportData.data.filter(
      (item) =>
        item.prodDescricao.toLocaleLowerCase("pt-BR").includes(term) ||
        item.prodFabricante.toLocaleLowerCase("pt-BR").includes(term),
    );
  }, [reportData, search]);

  const fetchRelatorio = async (params: RelatorioFiltroParams) => {
    try {
      setIsLoading(true);
      const result = await createRelatorioMovimentacoes(params);
      setReportData(result);
      setDates({
        inicio: params.dataInicial,
        final: params.dataFinal,
      });
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const exportPdf = async (userName?: string) => {
    if (!reportData || !dates) return;

    try {
      setIsGeneratingPdf(true);
      const [{ pdf }, { default: RelatorioDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import(
          "@/app/(auth)/(user)/relatorios/movimentacao-turma/componentes/relatorioMovTurma"
        ),
      ]);

      const docElement = (
        <RelatorioDocument
          data={reportData}
          dates={dates}
          user={userName}
        />
      ) as unknown as React.ReactElement<ReactPdfDocumentProps>;

      const blob = await pdf(docElement).toBlob();

      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const exportCsv = (userName?: string) => {
    if (!reportData || !dates) return;

    try {
      setIsExportingCsv(true);
      const dataInicioStr = dayjs(dates.inicio).format("DD/MM/YYYY");
      const dataFinalStr = dayjs(dates.final).format("DD/MM/YYYY");
      const dataEmissaoStr = dayjs().format("DD/MM/YYYY HH:mm");

      const rows: string[] = [
        `"SENAC - RELATÓRIO DE MOVIMENTAÇÃO DE ESTOQUE"`,
        `"Curso";"${reportData.curso ?? "Curso"}"`,
        `"Turma";"${reportData.turma} - ${reportData.turnoTurma}"`,
        `"Período";"${dataInicioStr} a ${dataFinalStr}"`,
        `"Emissão";"${dataEmissaoStr}"`,
        `"Emitido por";"${userName ?? "Usuário"}"`,
        "",
        `"Produto";"Fabricante";"Entradas";"Saídas";"Saldo"`,
      ];

      for (const item of reportData.data) {
        const entradas = Number(item.entradas) || 0;
        const saidas = Number(item.saidas) || 0;
        const saldo = entradas - saidas;
        const desc = item.prodDescricao.replace(/"/g, '""');
        const fab = item.prodFabricante.replace(/"/g, '""');
        rows.push(`"${desc}";"${fab}";${entradas};${saidas};${saldo}`);
      }

      rows.push("");
      rows.push(
        `"TOTAIS";"";${resumo.totalEntradas};${resumo.totalSaidas};${resumo.saldoGeral}`,
      );

      const csvContent = "\uFEFF" + rows.join("\r\n");
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      const safeTurma = reportData.turma.replace(/[^a-zA-Z0-9_-]/g, "_");
      link.setAttribute(
        "download",
        `relatorio-movimentacao-${safeTurma}-${dayjs().format("YYYYMMDD")}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExportingCsv(false);
    }
  };

  const clearReport = () => {
    setReportData(null);
    setDates(null);
    setSearch("");
  };

  return {
    reportData,
    dates,
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
    clearReport,
  };
}
