import type { SixJarsActions, SixJarsState } from "./six-jars-reducer";

/**
 * Single source of truth for the six jars: drives the form fields,
 * the summary legend, the pie chart colors, and the about page.
 */
export const JARS = [
  {
    key: "necessities",
    share: 0.55,
    label: "🛒 Necessities",
    hint: "Rent, bills, groceries",
    why: "Rent, food, transport, bills — life's running costs. Keeping it near 55% is the honest half of the deal: if this jar creeps up, the other five starve.",
    placeholder: "40 - 55",
    action: "SET_NECESSITIES",
    color: "var(--chart-1)",
  },
  {
    key: "longTermSavings",
    share: 0.1,
    label: "🏦 Long Term Savings",
    hint: "Big purchases, rainy days",
    why: "The big, lumpy expenses you can see coming — a laptop, a wedding, an emergency buffer — saved for in advance so they never become debt.",
    placeholder: "10 - 15",
    action: "SET_LONGTERMSAVINGS",
    color: "var(--chart-2)",
  },
  {
    key: "financialFreedom",
    share: 0.1,
    label: "🚀 Financial Freedom",
    hint: "Investments that pay you back",
    why: "The golden goose. You never spend this jar — it buys assets, and one day the eggs pay your bills.",
    placeholder: "10 - 20",
    action: "SET_FINANCIALFREEDOM",
    color: "var(--chart-3)",
  },
  {
    key: "education",
    share: 0.1,
    label: "📚 Education",
    hint: "Books, courses, growth",
    why: "Books, courses, workshops. The jar that raises your ceiling: growing your skills grows every future paycheck.",
    placeholder: "10",
    action: "SET_EDUCATION",
    color: "var(--chart-4)",
  },
  {
    key: "play",
    share: 0.1,
    label: "🎉 Play",
    hint: "Guilt-free fun",
    why: "A massage, a concert, that absurd dessert — and you must spend it. Guilt-free joy is what makes the discipline sustainable.",
    placeholder: "10 - 20",
    action: "SET_PLAY",
    color: "var(--chart-5)",
  },
  {
    key: "give",
    share: 0.05,
    label: "🎁 Give",
    hint: "Charity and gifts",
    why: "Charity, presents, helping a friend. Generosity keeps money moving and reminds you there's enough.",
    placeholder: "5",
    action: "SET_GIVE",
    color: "var(--chart-6)",
  },
] as const satisfies ReadonlyArray<{
  key: Exclude<keyof SixJarsState["summary"], "total">;
  share: number;
  label: string;
  hint: string;
  why: string;
  placeholder: string;
  action: SixJarsActions["type"];
  color: string;
}>;

export type Jar = (typeof JARS)[number];
