"use client";
import { ThemeProvider } from "next-themes";
import { SixJarsProvider } from "@/components/six-jars/six-jars-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SixJarsProvider>{children}</SixJarsProvider>
    </ThemeProvider>
  );
}
