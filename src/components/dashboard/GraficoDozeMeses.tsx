"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const processarDadosUltimosDozeMeses = (dados: any[]) => {
  // Obter o mês atual
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();

  // Criar um array com os últimos 12 meses
  let ultimosDozeMeses = [];
  for (let i = 11; i >= 0; i--) {
    let data = new Date(anoAtual, mesAtual - i, 1);
    let mes = data.getMonth();
    let ano = data.getFullYear();
    ultimosDozeMeses.push({
      month: meses[mes],
      entradas: 0,
      saidas: 0,
      ano: ano,
    });
  }

  dados.forEach((dado) => {
    const mesIndex = parseInt(dado.mes) - 1;
    const anoDado = parseInt(dado.ano);

    // Encontrar o mês correspondente no array de últimos 12 meses
    const mesEncontrado = ultimosDozeMeses.find(
      (item) => meses.indexOf(item.month) === mesIndex && item.ano === anoDado,
    );
    if (mesEncontrado) {
      mesEncontrado.entradas = dado.entradas || 0;
      mesEncontrado.saidas = dado.saidas || 0;
    }
  });

  return ultimosDozeMeses;
};

type ChartData = {
  month: string;
  entradas: number;
  saidas: number;
};

interface GraficoDozeMesesProps {
  data: ChartData[];
  isLoading?: boolean;
  className?: string;
  delay: number;
}

export default function GraficoDozeMeses({
  data,
  isLoading,
  className,
  delay,
}: GraficoDozeMesesProps) {
  const chartData = processarDadosUltimosDozeMeses(data || []);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ReloadIcon className="mr-2 size-4 animate-spin" />
        Carregando dados...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: delay * 0.1, duration: 0.5, ease: "backOut" },
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300 },
      }}
      className={cn("w-full", className)}
    >
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">
            Entradas e Saídas dos Últimos 12 Meses
          </CardTitle>
          <CardDescription className="text-xs">
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
                tickFormatter={(value) => value.slice(0, 3)}
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
    </motion.div>
  );
}
