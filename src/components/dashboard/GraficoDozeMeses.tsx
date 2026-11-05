"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Recharts = dynamic(() => import("./RechartsDozeMeses"), {
  loading: () => <div className="h-80 animate-pulse rounded-md bg-muted" />,
  ssr: false,
});

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { RelatorioDozeMeses } from "@/types/Operacao";

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

const processarDadosUltimosDozeMeses = (dados: RelatorioDozeMeses[]) => {
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
    const mesIndex = Number(dado.mes) - 1;
    const anoDado = Number(dado.ano);

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

interface GraficoDozeMesesProps {
  data: RelatorioDozeMeses[];
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
          <CardTitle className="text-lg">
            Entradas e Saídas dos Últimos 12 Meses
          </CardTitle>
          <CardDescription className="text-xs">
            Comparação das entradas e saídas de produtos nos últimos 12 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <Recharts chartData={chartData} />
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
