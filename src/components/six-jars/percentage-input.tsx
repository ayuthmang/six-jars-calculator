"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

export function PercentageInput({
  name,
  label,
  hint,
  onChange,
  ...props
}: {
  name: string;
  label: string;
  hint?: string;
  onChange: (value: string) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, "name" | "value" | "onChange">) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const numericValue = Number(field.value);
        const percent = Number.isNaN(numericValue) ? 0 : numericValue;
        return (
          <FormItem>
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-0.5">
                <FormLabel>{label}</FormLabel>
                {hint && (
                  <FormDescription className="text-xs">{hint}</FormDescription>
                )}
              </div>
              <div className="flex items-center gap-1">
                <FormControl>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step="any"
                    className="w-20 text-right"
                    {...props}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <span className="text-muted-foreground text-sm">%</span>
              </div>
            </div>
            <Slider
              aria-label={label}
              aria-valuetext={`${percent}%`}
              value={[percent]}
              min={0}
              max={100}
              step={0.5}
              onValueChange={([value]) => {
                field.onChange(value);
                onChange(String(value));
              }}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
