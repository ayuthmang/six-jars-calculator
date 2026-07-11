import { test, expect } from "@playwright/test";

test.describe("theme", () => {
  test("toggle switches to dark mode and persists across reloads", async ({
    page,
  }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /toggle theme/i });

    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    await page.reload();
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: /toggle theme/i }).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("dark mode restyles the page background", async ({ page }) => {
    await page.goto("/");
    const bgOf = () =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    const lightBg = await bgOf();
    await page.getByRole("button", { name: /toggle theme/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    expect(await bgOf()).not.toBe(lightBg);
  });
});
