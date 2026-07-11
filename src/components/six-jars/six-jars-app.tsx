import { SixJarsForm } from "./six-jars-form";
import { SixJarsSummary } from "./six-jars-summary";

export default function SixJarsApp() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Six Jars Calculator
      </h1>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <SixJarsForm />
        <div className="lg:sticky lg:top-20">
          <SixJarsSummary />
        </div>
      </div>
    </div>
  );
}
