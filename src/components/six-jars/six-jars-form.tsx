"use client";
import { useEffect } from "react";
import { toDisplay } from "@/utils/number";
import { Input } from "@/components/ui/input";

import {
  Card,
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
import { useForm, useFormContext } from "react-hook-form";
import { useSixJarsContext } from "./six-jars-provider";
import { Button } from "../ui/button";
import { PercentageInput } from "./percentage-input";
import { zodResolver } from "@hookform/resolvers/zod";

export const sixJarsFormSchema = z.object({
  income: z.coerce
    .number()
    .min(0, "Income must be a positive number")
    .max(10_000_000_000_000, "Income must be less than 10,000,000,000,000")
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Income must be a number with up to 2 decimal places"
    ),
  necessities: z.coerce
    .number()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Necessities must be a number with up to 2 decimal places"
    ),
  longTermSavings: z.coerce
    .number()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Long Term Savings must be a number with up to 2 decimal places"
    ),
  financialFreedom: z.coerce
    .number()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Financial Freedom must be a number with up to 2 decimal places"
    ),
  education: z.coerce
    .number()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Education must be a number with up to 2 decimal places"
    ),
  play: z.coerce
    .number()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Play must be a number with up to 2 decimal places"
    ),
  give: z.coerce
    .number()
    .min(0)
    .max(100)
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Give must be a number with up to 2 decimal places"
    ),
});

export function SixJarsForm() {
  const { state, dispatch } = useSixJarsContext();
  const form = useForm({
    resolver: zodResolver(sixJarsFormSchema),
    defaultValues: {
      income: state.config.income,
      necessities: state.config.necessities * 100,
      longTermSavings: state.config.longTermSavings * 100,
      financialFreedom: state.config.financialFreedom * 100,
      education: state.config.education * 100,
      play: state.config.play * 100,
      give: state.config.give * 100,
    },
    mode: "onBlur",
  });

  function handleFormSubmit(values: z.infer<typeof sixJarsFormSchema>) {
    dispatch({ type: "CALC_SUMMARY" });
  }

  function handleFormReset() {
    dispatch({ type: "RESET" });
    form.reset();
  }

  useEffect(() => {
    dispatch({ type: "CALC_SUMMARY" });
  }, [state.config]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Configurations</CardTitle>
          <CardDescription>
            Set your income and the percentage of each jar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                onReset={handleFormReset}
              >
                <FormField
                  control={form.control}
                  name="income"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>💰 Income</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your income"
                          type="number"
                          autoFocus
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            dispatch({
                              type: "SET_INCOME",
                              value: +value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex w-full flex-col gap-4">
                  <PercentageInput
                    name="necessities"
                    label="🛒 Necessities"
                    value={toDisplay(state.config.necessities * 100)}
                    placeholder="40 - 55"
                    onChange={() => {
                      dispatch({
                        type: "SET_NECESSITIES",
                        value: +form.getValues("necessities") / 100,
                      });
                    }}
                  />
                  <PercentageInput
                    name="longTermSavings"
                    label="🏦 Long Term Savings"
                    value={toDisplay(state.config.longTermSavings * 100)}
                    placeholder="10 - 15"
                    onChange={() => {
                      dispatch({
                        type: "SET_LONGTERMSAVINGS",
                        value: +form.getValues("longTermSavings") / 100,
                      });
                    }}
                  />
                  <PercentageInput
                    name="financialFreedom"
                    label="🚀 Financial Freedom"
                    value={toDisplay(state.config.financialFreedom * 100)}
                    placeholder="10 - 20"
                    onChange={() => {
                      dispatch({
                        type: "SET_FINANCIALFREEDOM",
                        value: +form.getValues("financialFreedom") / 100,
                      });
                    }}
                  />
                  <PercentageInput
                    name="education"
                    label="📚 Education"
                    value={toDisplay(state.config.education * 100)}
                    placeholder="10"
                    onChange={() => {
                      dispatch({
                        type: "SET_EDUCATION",
                        value: +form.getValues("education") / 100,
                      });
                    }}
                  />
                  <PercentageInput
                    name="play"
                    label="🎉 Play"
                    value={toDisplay(state.config.play * 100)}
                    placeholder="10 - 20"
                    onChange={() => {
                      dispatch({
                        type: "SET_GIVE",
                        value: +form.getValues("give") / 100,
                      });
                    }}
                  />
                  <PercentageInput
                    name="give"
                    label="🎁 Give"
                    value={toDisplay(state.config.give * 100)}
                    placeholder="5"
                    onChange={() => {
                      dispatch({
                        type: "SET_GIVE",
                        value: +form.getValues("give") / 100,
                      });
                    }}
                  />
                </div>
                <div className="flex w-full flex-row items-center gap-4">
                  <Button className="flex-1" type="submit" size={"lg"}>
                    Calculate
                  </Button>
                  <Button
                    className="flex-1"
                    type="reset"
                    variant="outline"
                    size={"lg"}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
