'use client';
import { SixJarsProvider } from "@/components/six-jars/six-jars-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SixJarsProvider>{children}</SixJarsProvider>;
}
