"use client";
import { toDisplay, toFixed } from "@/utils/number";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SixJarsSummaryPieChart } from "./six-jars-summary-pie-chart";
import { useSixJarsContext } from "./six-jars-provider";
import { JARS } from "./jars";

export function SixJarsSummary() {
  const { state } = useSixJarsContext();
  const { summary, config } = state;

  const chartData = JARS.map((jar) => ({
    key: jar.key,
    label: jar.label,
    value: summary[jar.key],
    color: jar.color,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Your allocation</CardTitle>
        <CardDescription>
          How your income splits across the jars.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {summary.total > 0 ? (
          <SixJarsSummaryPieChart
            chartData={chartData}
            centerLabel={toDisplay(summary.total)}
          />
        ) : (
          <div className="border-muted mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center rounded-full border-2 border-dashed">
            <p className="text-muted-foreground max-w-[70%] text-center text-sm">
              Enter your income to see the breakdown
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-2.5">
          {JARS.map((jar) => (
            <li key={jar.key} className="flex items-center gap-2.5 text-sm">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: jar.color }}
              />
              <span className="truncate">{jar.label}</span>
              <span className="text-muted-foreground text-xs tabular-nums">
                {toDisplay(toFixed(config[jar.key] * 100))}%
              </span>
              <span className="ml-auto font-medium tabular-nums">
                {toDisplay(summary[jar.key])}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t pt-4 text-sm font-semibold">
          <span>Total</span>
          <span data-testid="summary-total" className="tabular-nums">
            {toDisplay(summary.total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
