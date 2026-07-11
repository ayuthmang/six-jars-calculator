import { z } from "zod";
import type { SixJarsState } from "./six-jars-reducer";

const STORAGE_KEY = "six-jars:config:v1";

// Validate stored data so corrupt or outdated entries fall back to defaults.
const storedConfigSchema = z.object({
  income: z.number().min(0),
  necessities: z.number().min(0).max(1),
  longTermSavings: z.number().min(0).max(1),
  financialFreedom: z.number().min(0).max(1),
  education: z.number().min(0).max(1),
  play: z.number().min(0).max(1),
  give: z.number().min(0).max(1),
});

export function loadStoredConfig(): SixJarsState["config"] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = storedConfigSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function saveStoredConfig(config: SixJarsState["config"]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Storage may be unavailable (private mode, quota) — persisting is best-effort.
  }
}
