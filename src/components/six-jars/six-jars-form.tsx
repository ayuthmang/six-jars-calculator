"use client";
import { useEffect } from "react";
import { toDisplay, toFixed } from "@/utils/number";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { useSixJarsContext } from "./six-jars-provider";
import { Button } from "../ui/button";
import { PercentageInput } from "./percentage-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultJarsState, type SixJarsState } from "./six-jars-reducer";
import { JARS } from "./jars";

const percentage = (label: string) =>
  z.coerce
    .number<string | number>()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      `${label} must be a number with up to 2 decimal places`
    );

export const sixJarsFormSchema = z.object({
  income: z.coerce
    .number<string | number>()
    .min(0, "Income must be a positive number")
    .max(10_000_000_000_000, "Income must be less than 10,000,000,000,000")
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Income must be a number with up to 2 decimal places"
    ),
  necessities: percentage("Necessities"),
  longTermSavings: percentage("Long Term Savings"),
  financialFreedom: percentage("Financial Freedom"),
  education: percentage("Education"),
  play: percentage("Play"),
  give: percentage("Give"),
});

const FORM_ID = "six-jars-form";

function toFormValues(config: SixJarsState["config"]) {
  return {
    income: config.income,
    necessities: toFixed(config.necessities * 100),
    longTermSavings: toFixed(config.longTermSavings * 100),
    financialFreedom: toFixed(config.financialFreedom * 100),
    education: toFixed(config.education * 100),
    play: toFixed(config.play * 100),
    give: toFixed(config.give * 100),
  };
}

function toNumber(raw: string) {
  const num = Number(raw);
  return Number.isNaN(num) ? 0 : num;
}

export function SixJarsForm() {
  const { state, dispatch } = useSixJarsContext();
  const { config } = state;

  const percentTotal = toFixed(
    JARS.reduce((sum, jar) => sum + config[jar.key], 0) * 100
  );
  const isBalanced = percentTotal === 100;

  const form = useForm({
    resolver: zodResolver(sixJarsFormSchema),
    defaultValues: toFormValues(state.config),
    mode: "onBlur",
  });

  function handleFormReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "RESET" });
    // RESET keeps the entered income; mirror that in the form values.
    form.reset(
      toFormValues({ ...defaultJarsState.config, income: state.config.income })
    );
  }

  useEffect(() => {
    dispatch({ type: "CALC_SUMMARY" });
  }, [state.config, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔧 Configure</CardTitle>
        <CardDescription>
          Set your income and tune each jar — results update live.
        </CardDescription>
        <CardAction>
          <Button form={FORM_ID} type="reset" variant="outline" size="sm">
            Reset
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id={FORM_ID}
            noValidate
            onReset={handleFormReset}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>💰 Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your income"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      autoFocus
                      className="h-11 text-base font-medium"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        dispatch({
                          type: "SET_INCOME",
                          value: toNumber(value),
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {JARS.map(({ key, label, hint, placeholder, action }) => (
              <PercentageInput
                key={key}
                name={key}
                label={label}
                hint={hint}
                placeholder={placeholder}
                onChange={(value) => {
                  dispatch({ type: action, value: toNumber(value) / 100 });
                }}
              />
            ))}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Allocated</span>
                <span
                  className={cn(
                    "font-medium tabular-nums",
                    isBalanced
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400",
                    percentTotal > 100 && "text-destructive dark:text-destructive"
                  )}
                >
                  {toDisplay(percentTotal)}%
                </span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    isBalanced ? "bg-emerald-500" : "bg-amber-500",
                    percentTotal > 100 && "bg-destructive"
                  )}
                  style={{ width: `${Math.min(percentTotal, 100)}%` }}
                />
              </div>
              {!isBalanced && (
                <p role="alert" className="text-destructive text-sm">
                  ⚠️ Your jars add up to {toDisplay(percentTotal)}%, not 100%.
                </p>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
