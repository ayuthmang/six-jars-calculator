"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function PercentageInput({
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
