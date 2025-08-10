import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import dayjs from "dayjs";
import React from "react";
/* eslint-disable */
// Estilos atualizados
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  logo: {
    width: 50,
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  infoSection: {
    marginBottom: 15,
    fontSize: 10,
  },
  infoText: {
    fontSize: 10,
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    textAlign: "right",
    marginBottom: 5,
  },
  table: {
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#E4E4E4",
    borderBottomWidth: 1,
  },
  tableCol: {
    width: "25%",
    padding: 8,
    textAlign: "left",
  },
  tableHeaderCol: {
    width: "25%",
    padding: 8,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 9,
  },
  tableHeaderColRight: {
    width: "25%",
    padding: 8,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 9,
    textAlign: "right",
  },
  tableCell: {
    fontSize: 10,
  },
  numberCell: {
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: "center",
  },
});

interface DocumentProps {
  data: {
    turma: string;
    turnoTurma: string;
    data: {
      prodDescricao: string;
      prodFabricante: string;
      entradas: number;
      saidas: number;
    }[];
  };
  dates: {
    inicio: Date;
    final: Date;
  };
  user: string | undefined;
}

// Componente de relatório
const RelatorioDocument = ({ data, dates, user }: DocumentProps) => {
  const currentDate = format(new Date(), "dd/MM/yyyy HH:mm");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo e cabeçalho */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/logo.png" />
          <Text style={styles.title}>Relatório de Movimentação de Estoque</Text>
        </View>

        {/* Informações do Relatório */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Turma: {data.turma} - {data.turnoTurma}
          </Text>
          <Text style={styles.infoText}>
            Período: {dayjs(dates.inicio).format("DD/MM/YYYY")} a{" "}
            {dayjs(dates.final).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.infoText}>Usuário: {user}</Text>
        </View>

        {/* Data de emissão */}
        <Text style={styles.date}>Data de emissão: {currentDate}</Text>

        {/* Tabela de dados */}
        <View style={styles.table}>
          {/* Cabeçalho da tabela */}
          <View style={styles.tableRow}>
            <View style={styles.tableHeaderCol}>
              <Text>Produto</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text>Fabricante</Text>
            </View>
            <View style={styles.tableHeaderColRight}>
              <Text>Entradas</Text>
            </View>
            <View style={styles.tableHeaderColRight}>
              <Text>Saídas</Text>
            </View>
          </View>

          {/* Linhas de dados */}
          {data.data.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.prodDescricao}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.prodFabricante}</Text>
              </View>
              <View style={[styles.tableCol, styles.numberCell]}>
                <Text style={styles.tableCell}>{item.entradas}</Text>
              </View>
              <View style={[styles.tableCol, styles.numberCell]}>
                <Text style={styles.tableCell}>{item.saidas}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default RelatorioDocument;
