"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

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
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
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
  console.log("dynamicChartConfig", dynamicChartConfig);

  return (
    <Card className="flex flex-col self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>These are all the Jars</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={dynamicChartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
