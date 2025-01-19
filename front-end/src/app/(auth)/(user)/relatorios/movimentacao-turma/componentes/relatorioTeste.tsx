import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
/* eslint-disable */
// Estilos atualizados
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  logo: {
    width: 50, // Logo menor
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 14, // Título menor
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
    textAlign: "left", // Alinhar colunas à esquerda por padrão
  },
  tableHeaderCol: {
    width: "25%",
    padding: 8,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 9, // Fonte menor para o cabeçalho
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
    textAlign: "right", // Alinhar números à direita
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: "center",
  },
});

// Componente de relatório
const MyDocument = ({ teste }: any) => {
  console.log(teste);
  // , turma, dataInicial, dataFinal, usuario
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
            Turma: {teste.codTurma} - {teste.turnoTurma}
          </Text>
          <Text style={styles.infoText}>
            Período:{" "}
            {format(new Date(teste.dataInicial + "T00:00:00"), "dd/MM/yyyy")} a{" "}
            {format(new Date(teste.dataFinal + "T00:00:00"), "dd/MM/yyyy")}
            {/* Período: {format(new Date(teste.dataInicial), "dd/MM/yyyy")} a{" "}
            {format(new Date(teste.dataFinal), "dd/MM/yyyy")} */}
          </Text>
          <Text style={styles.infoText}>Usuário: {teste.nomeUser}</Text>
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
          {teste.result.map((item: any, index: number) => (
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

        {/* Rodapé */}
        {/* <Text style={styles.footer}>
          Relatório gerado automaticamente pelo sistema.
        </Text> */}
      </Page>
    </Document>
  );
};

export default MyDocument;
