"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { JARS } from "@/components/six-jars/jars";
import { toDisplay } from "@/utils/number";

/** Six jars filling live as the income slider moves. */
export function JarSplitDemo() {
  const [income, setIncome] = useState(30_000);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="text-muted-foreground text-sm">Monthly income</span>
          <span className="text-lg font-semibold tabular-nums">
            {toDisplay(income)}
          </span>
        </div>
        <Slider
          aria-label="Monthly income"
          value={[income]}
          min={1_000}
          max={100_000}
          step={1_000}
          onValueChange={([value]) => setIncome(value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {JARS.map((jar) => {
          const fraction = jar.share;
          const percent = fraction * 100;
          const [emoji] = jar.label.split(" ");
          return (
            <div key={jar.key} className="flex flex-col items-center gap-1.5">
              <div className="bg-muted/40 relative h-28 w-full overflow-hidden rounded-lg border">
                <div
                  className="absolute inset-x-0 bottom-0 transition-all duration-500 ease-out"
                  style={{ height: `${percent}%`, background: jar.color }}
                />
                <span className="absolute inset-x-0 top-1.5 text-center text-lg">
                  {emoji}
                </span>
              </div>
              <span className="text-muted-foreground text-xs">
                {toDisplay(percent)}%
              </span>
              <span className="text-xs font-medium tabular-nums">
                {toDisplay(income * fraction)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
