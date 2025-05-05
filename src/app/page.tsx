import SixJars from "@/components/six-jars/six-jars-form";
import { TypographyH1 } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="my-8 container mx-auto flex flex-col gap-4">
      <TypographyH1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Six Jars Calculator
      </TypographyH1>
      <SixJars />
    </main>
  );
}
