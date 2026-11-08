import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";

import { RelatorioMovimentacaoResponse } from "@/types/Relatorio";

const SENAC_BLUE = "#004587";
const SENAC_ORANGE = "#F39200";
const TEXT_MAIN = "#0F172A";
const TEXT_MUTED = "#475569";
const BORDER_COLOR = "#E2E8F0";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 36,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: TEXT_MAIN,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 2,
    borderBottomColor: SENAC_BLUE,
    marginBottom: 14,
  },
  headerBrand: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 30,
    objectFit: "contain",
    marginRight: 12,
  },
  headerTextGroup: {
    flexDirection: "column",
  },
  orgTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: SENAC_BLUE,
    letterSpacing: 0.5,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: TEXT_MAIN,
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  headerBadgeText: {
    fontSize: 8,
    color: TEXT_MUTED,
  },
  headerBadgeHighlight: {
    fontSize: 9,
    fontWeight: "bold",
    color: SENAC_ORANGE,
    marginTop: 2,
  },
  metaSection: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaCol: {
    flexDirection: "column",
    width: "48%",
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  metaLabel: {
    width: 65,
    fontSize: 8,
    fontWeight: "bold",
    color: TEXT_MUTED,
  },
  metaValue: {
    fontSize: 8.5,
    color: TEXT_MAIN,
    flex: 1,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  summaryCard: {
    width: "23.5%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    padding: 6,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 7.5,
    color: TEXT_MUTED,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: "bold",
  },
  table: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: SENAC_BLUE,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: "#FFFFFF",
  },
  tableRowOdd: {
    backgroundColor: "#F8FAFC",
  },
  colProduto: {
    width: "42%",
    paddingRight: 6,
  },
  colFabricante: {
    width: "26%",
    paddingRight: 6,
  },
  colEntradas: {
    width: "16%",
    textAlign: "right",
    paddingRight: 4,
  },
  colSaidas: {
    width: "16%",
    textAlign: "right",
  },
  cellText: {
    fontSize: 8,
    color: TEXT_MAIN,
  },
  cellMuted: {
    fontSize: 8,
    color: TEXT_MUTED,
  },
  tableFooterRow: {
    flexDirection: "row",
    backgroundColor: "#EEF2F6",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  footerTotalLabel: {
    width: "68%",
    fontSize: 8,
    fontWeight: "bold",
    color: SENAC_BLUE,
    textTransform: "uppercase",
  },
  footerTotalValue: {
    width: "16%",
    fontSize: 8.5,
    fontWeight: "bold",
    textAlign: "right",
    color: TEXT_MAIN,
  },
  pageFooter: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7.5,
    color: TEXT_MUTED,
  },
});

export interface RelatorioDocumentProps {
  data: RelatorioMovimentacaoResponse;
  dates: {
    inicio: Date;
    final: Date;
  };
  user?: string;
}

const RelatorioDocument: React.FC<RelatorioDocumentProps> = ({
  data,
  dates,
  user,
}) => {
  const currentDate = dayjs().format("DD/MM/YYYY HH:mm");
  const dataInicioStr = dayjs(dates.inicio).format("DD/MM/YYYY");
  const dataFinalStr = dayjs(dates.final).format("DD/MM/YYYY");

  let totalEntradas = 0;
  let totalSaidas = 0;

  for (const item of data.data) {
    totalEntradas += Number(item.entradas) || 0;
    totalSaidas += Number(item.saidas) || 0;
  }

  const saldo = totalEntradas - totalSaidas;
  const logoUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/logo.png`
      : "/logo.png";

  return (
    <Document title={`Relatorio_Movimentacao_${data.turma}`}>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho Institucional */}
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image style={styles.logo} src={logoUrl} />
            <View style={styles.headerTextGroup}>
              <Text style={styles.orgTitle}>SENAC • GESTÃO DE ESTOQUE</Text>
              <Text style={styles.reportTitle}>
                Relatório de Movimentação por Turma
              </Text>
            </View>
          </View>
        </View>

        {/* Metadados e Escopo */}
        <View style={styles.metaSection}>
          <View style={styles.metaCol}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Curso:</Text>
              <Text style={styles.metaValue}>{data.curso ?? "Curso"}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Turma:</Text>
              <Text style={styles.metaValue}>
                {data.turma} ({data.turnoTurma})
              </Text>
            </View>
          </View>
          <View style={styles.metaCol}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Período:</Text>
              <Text style={styles.metaValue}>
                {dataInicioStr} a {dataFinalStr}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Emissão:</Text>
              <Text style={styles.metaValue}>
                {currentDate} • {user ?? "Sistema"}
              </Text>
            </View>
          </View>
        </View>

        {/* Resumo de Indicadores */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Itens Movimentados</Text>
            <Text style={[styles.summaryValue, { color: SENAC_BLUE }]}>
              {data.data.length}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total de Entradas</Text>
            <Text style={[styles.summaryValue, { color: "#16A34A" }]}>
              +{totalEntradas}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total de Saídas</Text>
            <Text style={[styles.summaryValue, { color: "#DC2626" }]}>
              -{totalSaidas}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Saldo do Período</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: saldo >= 0 ? "#16A34A" : "#DC2626" },
              ]}
            >
              {saldo > 0 ? `+${saldo}` : saldo}
            </Text>
          </View>
        </View>

        {/* Tabela de Produtos */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.colProduto}>
              <Text style={styles.tableHeaderText}>Produto</Text>
            </View>
            <View style={styles.colFabricante}>
              <Text style={styles.tableHeaderText}>Fabricante</Text>
            </View>
            <View style={styles.colEntradas}>
              <Text style={styles.tableHeaderText}>Entradas</Text>
            </View>
            <View style={styles.colSaidas}>
              <Text style={styles.tableHeaderText}>Saídas</Text>
            </View>
          </View>

          {data.data.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <View
                key={`${item.prodDescricao}-${index}`}
                style={[
                  styles.tableRow,
                  isEven ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <View style={styles.colProduto}>
                  <Text style={styles.cellText}>{item.prodDescricao}</Text>
                </View>
                <View style={styles.colFabricante}>
                  <Text style={styles.cellMuted}>
                    {item.prodFabricante || "—"}
                  </Text>
                </View>
                <View style={styles.colEntradas}>
                  <Text style={styles.cellText}>{item.entradas}</Text>
                </View>
                <View style={styles.colSaidas}>
                  <Text style={styles.cellText}>{item.saidas}</Text>
                </View>
              </View>
            );
          })}

          {/* Linha de Totais da Tabela */}
          <View style={styles.tableFooterRow}>
            <Text style={styles.footerTotalLabel}>Totais Consolidados</Text>
            <Text style={styles.footerTotalValue}>{totalEntradas}</Text>
            <Text style={styles.footerTotalValue}>{totalSaidas}</Text>
          </View>
        </View>

        {/* Rodapé Fixo */}
        <View style={styles.pageFooter} fixed>
          <Text style={styles.footerText}>
            Gestor de Estoque Senac • Relatório de Movimentação
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default RelatorioDocument;
