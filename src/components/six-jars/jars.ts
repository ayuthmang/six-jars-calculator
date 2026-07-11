import type { SixJarsActions, SixJarsState } from "./six-jars-reducer";

/**
 * Single source of truth for the six jars: drives the form fields,
 * the summary legend, and the pie chart colors.
 */
export const JARS = [
  {
    key: "necessities",
    label: "🛒 Necessities",
    hint: "Rent, bills, groceries",
    placeholder: "40 - 55",
    action: "SET_NECESSITIES",
    color: "var(--chart-1)",
  },
  {
    key: "longTermSavings",
    label: "🏦 Long Term Savings",
    hint: "Big purchases, rainy days",
    placeholder: "10 - 15",
    action: "SET_LONGTERMSAVINGS",
    color: "var(--chart-2)",
  },
  {
    key: "financialFreedom",
    label: "🚀 Financial Freedom",
    hint: "Investments that pay you back",
    placeholder: "10 - 20",
    action: "SET_FINANCIALFREEDOM",
    color: "var(--chart-3)",
  },
  {
    key: "education",
    label: "📚 Education",
    hint: "Books, courses, growth",
    placeholder: "10",
    action: "SET_EDUCATION",
    color: "var(--chart-4)",
  },
  {
    key: "play",
    label: "🎉 Play",
    hint: "Guilt-free fun",
    placeholder: "10 - 20",
    action: "SET_PLAY",
    color: "var(--chart-5)",
  },
  {
    key: "give",
    label: "🎁 Give",
    hint: "Charity and gifts",
    placeholder: "5",
    action: "SET_GIVE",
    color: "var(--chart-6)",
  },
] as const satisfies ReadonlyArray<{
  key: Exclude<keyof SixJarsState["summary"], "total">;
  label: string;
  hint: string;
  placeholder: string;
  action: SixJarsActions["type"];
  color: string;
}>;

export type Jar = (typeof JARS)[number];
