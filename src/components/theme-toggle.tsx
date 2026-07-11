"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

// False during SSR and the hydration render, true afterwards — the theme is
// unknown until then, so a neutral icon is shown to avoid a mismatch.
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      disabled={!hydrated}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span aria-hidden>{!hydrated ? "🌓" : isDark ? "☀️" : "🌙"}</span>
    </Button>
  );
}
