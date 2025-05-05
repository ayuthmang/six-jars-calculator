"use client";
import React, { useEffect, useReducer } from "react";
import {
  defaultJarsState,
  sixJarsReducer,
} from "@/components/six-jars/six-jars.reducer";
import { toDisplay } from "@/utils/number";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, useFormContext } from "react-hook-form";
import { TypographyH1, TypographyH2, TypographyP } from "../ui/typography";
import {
  SixJarsContext,
  SixJarsProvider,
  useSixJarsContext,
} from "./six-jars.provider";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sixJarsFormSchema = z
  .object({
    income: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Income must be a number with up to 2 decimal places"
      ),
    necessities: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Necessities must be a number with up to 2 decimal places"
      ),
    longTermSavings: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Long Term Savings must be a number with up to 2 decimal places"
      ),
    financialFreedom: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Financial Freedom must be a number with up to 2 decimal places"
      ),
    education: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Education must be a number with up to 2 decimal places"
      ),
    play: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Play must be a number with up to 2 decimal places"
      ),
    give: z.coerce
      .number()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Give must be a number with up to 2 decimal places"
      ),
  })
  .refine(
    (data) =>
      data.necessities +
        data.longTermSavings +
        data.financialFreedom +
        data.education +
        data.play +
        data.give <=
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
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const { state } = useSixJarsContext();

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <SixJarsForm />
        <SixJarsSummary {...state.summary} />
      </div>
    </Form>
  );
}

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
} & React.HTMLProps<HTMLInputElement>;

function InputField({ id, label, value, onChange, ...props }: InputFieldProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
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
          <FormLabel>{label}</FormLabel>
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
  // return (
  //   <div className="grid w-full max-w-sm items-center gap-1.5">
  //     <div className="flex items-center">
  //       <Input
  //         id={id}
  //         type="number"
  //         min={0}
  //         max={100}
  //         step={1}
  //         value={value}
  //         onChange={(e) => onChange(e.target.value)}
  //         maxLength={2}
  //         {...rest}
  //       />
  //       <span className="ml-1">%</span>
  //     </div>
  //   </div>
  // );
}
export function SixJarsForm() {
  const { state, dispatch } = useSixJarsContext();
  const form = useFormContext<z.infer<typeof sixJarsFormSchema>>();
  console.log("state", state);
  console.log("form", { form });

  function onSubmit(values: z.infer<typeof sixJarsFormSchema>) {
    console.log(values);
    dispatch({ type: "CALC_SUMMARY" });
  }

  function validateOnChange(value: number) {
    if (isNaN(value)) return;

    const totalAllowed =
      Object.values(state.config).reduce((sum, cur) => sum + cur, 0) * 100;

    if (value > totalAllowed) {
      console.error(`Value cannot exceed ${totalAllowed}`);
      return;
    }
  }

  useEffect(() => {
    console.log("useEffect", state.config);
    dispatch({ type: "CALC_SUMMARY" });
  }, [state.config]);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="income"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Income</FormLabel>
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

        <div className="flex flex-col gap-4">
          <TypographyH2>🔧 Configurations</TypographyH2>
          <div className="flex w-full flex-col gap-4">
            <PercentageInput
              name="necessities"
              label="Necessities"
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
              label="Long Term Savings"
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
              label="Financial Freedom"
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
              label="Education"
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
              label="Play"
              value={toDisplay(state.config.play * 100)}
              placeholder="10"
              onChange={(value) => {
                dispatch({
                  type: "SET_GIVE",
                  value: +form.getValues("give") / 100,
                });
              }}
            />
            <PercentageInput
              name="give"
              label="Give"
              value={toDisplay(state.config.give * 100)}
              placeholder="5"
              onChange={(value) => {
                dispatch({
                  type: "SET_GIVE",
                  value: +form.getValues("give") / 100,
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function SixJarsSummary({
  ...props
}: {
  necessities: number;
  education: number;
  longTermSavings: number;
  financialFreedom: number;
  play: number;
  give: number;
  total: number;
}) {
  const {
    necessities,
    education,
    longTermSavings,
    financialFreedom,
    play,
    give,
    total,
  } = useSixJarsContext().state.summary;

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <TypographyH2>💰 Summary</TypographyH2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <TypographyP>Necessities: {toDisplay(necessities)}</TypographyP>
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
      </div>

      <Card className="transition-shadow hover:shadow-lg">
        <CardContent>
          <TypographyP>Total: {total}</TypographyP>
        </CardContent>
      </Card>
    </div>
  );
}
