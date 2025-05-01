"use client";
import React, { useEffect, useReducer, useState } from "react";
import {
  defaultJarsState,
  jarsReducer,
  type SixJarsState,
} from "@/app/jarsReducer";
import { toFixed } from "@/utils/number";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

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
  id,
  label,
  value,
  onChange,
  ...rest
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
} & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center">
        <Input
          id={id}
          type="number"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          maxLength={2}
          {...rest}
        />
        <span className="ml-1">%</span>
      </div>
    </div>
  );
}

export default function SixJarsForm() {
  const [income, setIncome] = useState("");
  const [state, dispatch] = useReducer(jarsReducer, defaultJarsState);
  console.log("state", state);

  useEffect(() => {
    dispatch({ type: "CALC_SUMMARY" });
  }, [income, state.config]);

  useEffect(() => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      dispatch({ type: "SET_INCOME", value: incomeValue });
    }
  }, [income]);

  return (
    <div className="flex flex-col gap-4">
      <InputField
        id="income"
        label="Income"
        value={income}
        onChange={(value) => setIncome(value.toString())}
      />
      <div className="flex flex-col gap-4">
        <TypographyH2>🔧 Configurations</TypographyH2>
        <div className="flex w-full flex-col gap-4">
          <PercentageInput
            id="necessities"
            label="Necessities"
            value={state.config.necessities}
            placeholder="40 - 55"
            onChange={(value) =>
              dispatch({ type: "SET_NECESSITIES", value: +value / 100 })
            }
          />
          <PercentageInput
            id="longTermSavings"
            label="Long Term Savings"
            value={state.config.longTermSavings * 100}
            placeholder="10 - 15"
            onChange={(value) =>
              dispatch({ type: "SET_LONGTERMSAVINGS", value: +value / 100 })
            }
          />
          <PercentageInput
            id="financialFreedom"
            label="Financial Freedom"
            value={state.config.financialFreedom}
            placeholder="10 - 20"
            onChange={(value) =>
              dispatch({ type: "SET_FINANCIALFREEDOM", value: +value / 100 })
            }
          />
          <PercentageInput
            id="education"
            label="Education"
            value={state.config.education}
            placeholder="10"
            onChange={(value) =>
              dispatch({ type: "SET_EDUCATION", value: +value / 100 })
            }
          />
          <PercentageInput
            id="play"
            label="Play"
            value={state.config.play}
            placeholder="10"
            onChange={(value) =>
              dispatch({ type: "SET_PLAY", value: +value / 100 })
            }
          />
          <PercentageInput
            id="give"
            label="Give"
            value={state.config.give}
            placeholder="5"
            onChange={(value) =>
              dispatch({ type: "SET_GIVE", value: +value / 100 })
            }
          />
        </div>
      </div>
      <SixJarsSummary {...state.summary} />
    </div>
  );
}
function SixJarsSummary({
  necessities,
  education,
  longTermSavings,
  financialFreedom,
  play,
  give,
  total,
}: {
  necessities: number;
  education: number;
  longTermSavings: number;
  financialFreedom: number;
  play: number;
  give: number;
  total: number;
}) {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <TypographyH2>💰 Summary</TypographyH2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <p>Necessities: {necessities}</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <p>Long Term Savings: {longTermSavings}</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <p>Education: {education}</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <p>Financial Freedom: {financialFreedom}</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <p>Play: {play}</p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-lg">
          <CardContent>
            <p>Give: {give}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-shadow hover:shadow-lg">
        <CardContent>
          <p>Total: {total}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TypographyH1({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function TypographyH2({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function TypographyP({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}
