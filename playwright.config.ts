import { defineConfig, devices } from "@playwright/test";

// Next dev allows a single instance per project; PORT lets the suite reuse an
// already-running dev server (e.g. PORT=3000 pnpm test:e2e).
const port = Number(process.env.PORT ?? 3210);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: `http://localhost:${port}`,
    actionTimeout: 10_000,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm dev --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
