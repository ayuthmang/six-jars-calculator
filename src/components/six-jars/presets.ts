import type { Jar } from "./jars";

type JarKey = Jar["key"];

/** Ready-made splits. Every preset's percentages sum to exactly 100. */
export const PRESETS = [
  {
    key: "classic",
    label: "Classic",
    percents: {
      necessities: 55,
      longTermSavings: 10,
      financialFreedom: 10,
      education: 10,
      play: 10,
      give: 5,
    },
  },
  {
    key: "saver",
    label: "Aggressive saver",
    percents: {
      necessities: 45,
      longTermSavings: 15,
      financialFreedom: 20,
      education: 10,
      play: 5,
      give: 5,
    },
  },
  {
    key: "tight",
    label: "Tight budget",
    percents: {
      necessities: 65,
      longTermSavings: 10,
      financialFreedom: 10,
      education: 5,
      play: 5,
      give: 5,
    },
  },
] as const satisfies ReadonlyArray<{
  key: string;
  label: string;
  percents: Record<JarKey, number>;
}>;

export type Preset = (typeof PRESETS)[number];
