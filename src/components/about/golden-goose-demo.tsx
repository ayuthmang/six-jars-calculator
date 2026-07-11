"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { toDisplay } from "@/utils/number";

const ANNUAL_RATE = 0.07;

function futureValue(monthly: number, years: number) {
  const monthlyRate = ANNUAL_RATE / 12;
  const months = years * 12;
  return monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate);
}

/** What investing the Financial Freedom jar every month grows into. */
export function GoldenGooseDemo() {
  const [monthly, setMonthly] = useState(3_000);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="text-muted-foreground text-sm">
            Invested every month
          </span>
          <span className="text-lg font-semibold tabular-nums">
            {toDisplay(monthly)}
          </span>
        </div>
        <Slider
          aria-label="Amount invested every month"
          value={[monthly]}
          min={500}
          max={20_000}
          step={500}
          onValueChange={([value]) => setMonthly(value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[10, 20, 30].map((years) => (
          <div
            key={years}
            className="flex flex-col gap-1 rounded-lg border p-3 text-center"
          >
            <span className="text-muted-foreground text-xs">
              in {years} years
            </span>
            <span
              data-testid={`fv-${years}`}
              className="text-sm font-semibold tabular-nums sm:text-base"
            >
              {toDisplay(Math.round(futureValue(monthly, years)))}
            </span>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        Illustration only: 7% yearly growth, compounded monthly, no
        inflation or taxes. Not financial advice — just the shape of the
        curve.
      </p>
    </div>
  );
}
