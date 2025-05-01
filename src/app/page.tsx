import SixJarsForm from "@/components/six-jars-form";

export default function Home() {
  return (
    <main className="my-8 container mx-auto flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Six Jars Calculator
      </h1>
      <SixJarsForm />;
    </main>
  );
}
