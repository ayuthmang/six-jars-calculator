"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const availableColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function generateChartConfig(data: { key: string }[]): ChartConfig {
  const uniqueKeys = Array.from(new Set(data.map((item) => item.key)));
  const config: ChartConfig = {};
  uniqueKeys.forEach((key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: availableColors[index % availableColors.length],
    };
  });
  return config;
}

export function SixJarsSummaryPieChart({
  chartData,
}: {
  chartData: {
    key: string;
    value: number;
    fill?: string;
  }[];
}) {
  const dynamicChartConfig = React.useMemo(
    () => generateChartConfig(chartData),
    [chartData]
  );

  return (
    <Card className="flex flex-col self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>These are all the Jars</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={dynamicChartConfig}
          className="mx-auto aspect-square min-h-[250px] max-h-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} nameKey="key" dataKey="value" label>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={dynamicChartConfig[entry.key]?.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
