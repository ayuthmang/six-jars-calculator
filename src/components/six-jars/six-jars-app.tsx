"use client";

import { TypographyH1, TypographyP } from "../ui/typography";
import { SixJarsForm } from "./six-jars-form";
import { SixJarsSummary } from "./six-jars-summary";

export default function SixJarsApp() {
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
      <div className="flex flex-col gap-4 lg:flex-row lg:[&>*]:flex-1">
        <SixJarsForm />
        <SixJarsSummary />
      </div>
    </div>
  );
}
