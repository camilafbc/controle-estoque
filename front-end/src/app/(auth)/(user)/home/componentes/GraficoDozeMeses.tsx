"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashRelatorioDozeMeses } from "@/queries/dashboard";
import { ReloadIcon } from "@radix-ui/react-icons";

const processarDadosUltimosDozeMeses = (dados: any[]) => {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junh",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Obter o mês atual
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();

  // Criar um array com os últimos 12 meses
  let ultimosDozeMeses = [];
  for (let i = 11; i >= 0; i--) {
    let data = new Date(anoAtual, mesAtual - i, 1);
    let mes = data.getMonth(); // de 0 a 11
    let ano = data.getFullYear();
    ultimosDozeMeses.push({
      month: meses[mes],
      entradas: 0, // Inicializa com 0
      saidas: 0, // Inicializa com 0
      ano: ano,
    });
  }

  // Preencher os meses com dados retornados da consulta SQL
  dados.forEach((dado) => {
    const mesIndex = parseInt(dado.mes) - 1; // O `mes` da SQL vai de '01' a '12'
    const anoDado = parseInt(dado.ano);

    // Encontrar o mês correspondente no array de últimos 12 meses
    const mesEncontrado = ultimosDozeMeses.find(
      (item) => item.month === meses[mesIndex] && item.ano === anoDado,
    );
    if (mesEncontrado) {
      mesEncontrado.entradas = dado.entradas;
      mesEncontrado.saidas = dado.saidas;
    }
  });

  // Retorna apenas os meses (sem o ano)
  return ultimosDozeMeses.map(({ month, entradas, saidas }) => ({
    month,
    entradas,
    saidas,
  }));
};

interface ChartData {
  month: string;
  entradas: number;
  saidas: number;
}

export default function GraficoDozeMeses({}) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { data: relatorioDozeMeses, isLoading } = useDashRelatorioDozeMeses();

  useEffect(() => {
    async function fetchData() {
      try {
        const dados = relatorioDozeMeses;
        const dataFormatada = processarDadosUltimosDozeMeses(dados);
        setChartData(dataFormatada);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [relatorioDozeMeses]); // Recarrega sempre que idCurso mudar

  const chartConfig = {
    entradas: {
      label: "Entradas",
      color: "hsl(var(--chart-2))",
    },
    saidas: {
      label: "Saídas",
      color: "hsl(var(--chart-1))",
    },
  };

  if (isLoading)
    return (
      <div>
        <ReloadIcon className="mr-2 size-4 animate-spin" />
      </div>
    );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Entradas e Saídas dos Últimos 12 Meses</CardTitle>
        <CardDescription>
          Comparação das entradas e saídas de produtos nos últimos 12 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Exibe apenas os 3 primeiros caracteres
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="entradas"
              stackId="a"
              fill="var(--color-entradas)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="saidas"
              stackId="a"
              fill="var(--color-saidas)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
