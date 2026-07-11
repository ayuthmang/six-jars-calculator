"use client";

import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { cn } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type SliceDatum = {
  key: string;
  label: string;
  value: number;
  color: string;
};

export function SixJarsSummaryPieChart({
  chartData,
  centerLabel,
}: {
  chartData: SliceDatum[];
  centerLabel: string;
}) {
  const config = React.useMemo(() => {
    const result: ChartConfig = {};
    for (const item of chartData) {
      result[item.key] = { label: item.label, color: item.color };
    }
    return result;
  }, [chartData]);

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square w-full max-w-[280px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          nameKey="key"
          dataKey="value"
          innerRadius="58%"
          paddingAngle={2}
          cornerRadius={4}
        >
          {chartData.map((entry) => (
            <Cell key={entry.key} fill={entry.color} />
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className={cn(
                        "fill-foreground font-bold",
                        centerLabel.length > 9 ? "text-sm" : "text-xl"
                      )}
                    >
                      {centerLabel}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground text-xs"
                    >
                      Total
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
