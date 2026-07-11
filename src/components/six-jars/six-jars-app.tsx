import Link from "next/link";
import { TypographyH1 } from "../ui/typography";
import { SixJarsForm } from "./six-jars-form";
import { SixJarsSummary } from "./six-jars-summary";

export default function SixJarsApp() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <TypographyH1 className="text-3xl sm:text-4xl">
          Six Jars Calculator
        </TypographyH1>
        <p className="text-muted-foreground max-w-2xl leading-7">
          Split your income across the six jars of the classic money-management
          method. Tune the percentages and watch your allocation update live.{" "}
          <Link
            href="/about"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Why six jars? →
          </Link>
        </p>
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <SixJarsForm />
        <div className="lg:sticky lg:top-6">
          <SixJarsSummary />
        </div>
      </div>
    </div>
  );
}
