"use client";
import React, { useEffect } from "react";
import { toDisplay } from "@/utils/number";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { TypographyH1, TypographyH2, TypographyP } from "../ui/typography";
import { useSixJarsContext } from "./six-jars.provider";
import { SixJarsSummaryPieChart } from "./six-jars-summary-pie-chart";
import { Button } from "../ui/button";
import { defaultJarsState } from "./six-jars.reducer";

const sixJarsFormSchema = z
  .object({
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
  })
  .refine(
    (data) =>
      (data.necessities +
        data.longTermSavings +
        data.financialFreedom +
        data.education +
        data.play +
        data.give) /
        100 <=
      1,
    {
      message: "The sum of all jars values must not exceed 1",
      path: [
        "necessities",
        "longTermSavings",
        "financialFreedom",
        "education",
        "play",
        "give",
      ],
    }
  );

export default function SixJars() {
  const form = useForm<z.infer<typeof sixJarsFormSchema>>({
    resolver: zodResolver(sixJarsFormSchema),
    defaultValues: defaultJarsState.config,
  });

  return (
    <div className="flex flex-col gap-4 mx-4">
      <TypographyH1>Six Jars Calculator</TypographyH1>
      <TypographyP>
        Discover the power of disciplined saving with the Six Jars method.
        Embrace a revolutionary approach to managing your finances that ensures
        your money works for you. Each jar represents a distinct
        purpose—necessities, long term savings, financial freedom, education,
        play, and give—to help you achieve balance and financial well-being.
      </TypographyP>
      <TypographyP>
        Start your journey to sustainable financial health today and unlock the
        secrets of smart money management!
      </TypographyP>

      <div className="flex flex-col gap-4">
        <Form {...form}>
          <SixJarsForm />
        </Form>
        <SixJarsSummary />
      </div>
    </div>
  );
}

function PercentageInput({
  name,
  label,
  value,
  onChange,
  ...props
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
} & React.HTMLProps<HTMLInputElement>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center">
              <Input
                id={field.name}
                type="number"
                min={0}
                max={100}
                step={1}
                maxLength={2}
                {...props}
                {...field}
                value={value ?? field.value}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  onChange(value);
                }}
              />
              <span className="ml-1">%</span>
            </div>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
export function SixJarsForm() {
  const { state, dispatch } = useSixJarsContext();
  const form = useFormContext<z.infer<typeof sixJarsFormSchema>>();

  function onSubmit(values: z.infer<typeof sixJarsFormSchema>) {
    dispatch({ type: "CALC_SUMMARY" });
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
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
                <Button className="flex-1" type="submit">
                  Calculate
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function SixJarsSummary() {
  const { state } = useSixJarsContext();
  const {
    necessities,
    education,
    longTermSavings,
    financialFreedom,
    play,
    give,
    total,
  } = state.summary;

  const chartData = [
    { key: "necessities", value: necessities },
    { key: "longTermSavings", value: longTermSavings },
    { key: "education", value: education },
    { key: "financialFreedom", value: financialFreedom },
    { key: "play", value: play },
    { key: "give", value: give },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Summary</CardTitle>
        <CardDescription>
          This is how you should allocate your income.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 [&>div]:flex-1">
            <SixJarsSummaryPieChart chartData={chartData} />
            <div className="container mx-auto flex flex-col gap-4">
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>
                    Necessities: {toDisplay(necessities)}
                  </TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>
                    Long Term Savings: {toDisplay(longTermSavings)}
                  </TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>Education: {toDisplay(education)}</TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>
                    Financial Freedom: {toDisplay(financialFreedom)}
                  </TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>Play: {toDisplay(play)}</TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP>Give: {toDisplay(give)}</TypographyP>
                </CardContent>
              </Card>
              <Card className="transition-shadow hover:shadow-lg">
                <CardContent>
                  <TypographyP className="font-bold">
                    Total: {total}
                  </TypographyP>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
