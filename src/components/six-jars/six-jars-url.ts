import { toFixed } from "@/utils/number";
import type { SixJarsState } from "./six-jars-reducer";
import { configSchema } from "./six-jars-storage";
import { JARS } from "./jars";

/** Query param carrying a shareable split: income followed by jar percentages. */
export const SHARE_PARAM = "s";

export function encodeConfigParam(config: SixJarsState["config"]): string {
  const parts = [
    config.income,
    ...JARS.map((jar) => toFixed(config[jar.key] * 100)),
  ];
  return parts.join(",");
}

export function parseConfigParam(
  raw: string | null
): SixJarsState["config"] | null {
  if (!raw) return null;
  const parts = raw.split(",").map(Number);
  if (parts.length !== JARS.length + 1 || parts.some(Number.isNaN)) {
    return null;
  }
  const [incomeValue, ...percents] = parts;
  const parsed = configSchema.safeParse({
    income: incomeValue,
    ...Object.fromEntries(
      JARS.map((jar, index) => [jar.key, percents[index] / 100])
    ),
  });
  return parsed.success ? parsed.data : null;
}
