"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  month: string;
  entradas: number;
  saidas: number;
  ano: number;
};

const chartConfig = {
  entradas: { label: "Entradas", color: "hsl(var(--chart-2))" },
  saidas: { label: "Saídas", color: "hsl(var(--chart-1))" },
};

export default function RechartsDozeMeses({
  chartData,
}: {
  chartData: ChartData[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%" className="flex-1">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="entradas" stackId="a" fill="var(--color-entradas)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="saidas" stackId="a" fill="var(--color-saidas)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
