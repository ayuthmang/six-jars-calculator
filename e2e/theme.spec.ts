import { test, expect, type Page } from "@playwright/test";

async function chooseTheme(page: Page, name: RegExp) {
  await page.getByRole("button", { name: /theme/i }).click();
  await page.getByRole("menuitemradio", { name }).click();
}

test.describe("theme", () => {
  test("follows a dark OS by default", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await context.close();
  });

  test("follows a light OS by default", async ({ page }) => {
    // Playwright's default colorScheme is light.
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("offers light, dark and system choices with system preselected", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /theme/i }).click();
    await expect(
      page.getByRole("menuitemradio", { name: "System" })
    ).toHaveAttribute("aria-checked", "true");
    await expect(
      page.getByRole("menuitemradio", { name: "Light" })
    ).toHaveAttribute("aria-checked", "false");
    await expect(
      page.getByRole("menuitemradio", { name: "Dark" })
    ).toHaveAttribute("aria-checked", "false");
  });

  test("an explicit choice overrides the OS and persists", async ({
    page,
  }) => {
    await page.goto("/");
    await chooseTheme(page, /dark/i);
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("choosing system returns to following the OS", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/");

    await chooseTheme(page, /light/i);
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await chooseTheme(page, /system/i);
    await expect(page.locator("html")).toHaveClass(/dark/);
    await context.close();
  });

  test("dark mode restyles the page background", async ({ page }) => {
    await page.goto("/");
    const bgOf = () =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    const lightBg = await bgOf();
    await chooseTheme(page, /dark/i);
    await expect(page.locator("html")).toHaveClass(/dark/);

    expect(await bgOf()).not.toBe(lightBg);
  });
});
