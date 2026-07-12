import { test, expect, type Page } from "@playwright/test";

const income = (page: Page) =>
  page.getByRole("spinbutton", { name: /Income/ });
const jar = (page: Page, name: RegExp) =>
  page.getByRole("spinbutton", { name });
const summaryRow = (page: Page, name: string) =>
  page.getByRole("listitem").filter({ hasText: name });

test.describe("shareable links", () => {
  test("copy link puts a restorable URL on the clipboard", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");

    await income(page).fill("4000");
    await jar(page, /Play/).fill("15");
    await expect(summaryRow(page, "Play")).toContainText("600");

    await page.getByRole("button", { name: /copy link/i }).click();
    await expect(
      page.getByRole("button", { name: /copied/i })
    ).toBeVisible();

    const url = await page.evaluate(() => navigator.clipboard.readText());
    expect(url).toContain("?s=4000");

    // A fresh visit to the copied URL restores the exact split.
    await page.goto(url);
    await expect(income(page)).toHaveValue("4000");
    await expect(jar(page, /Play/)).toHaveValue("15");
    await expect(summaryRow(page, "Play")).toContainText("600");
  });

  test("opening a shared link restores the split", async ({ page }) => {
    await page.goto("/?s=2500,50,15,10,10,10,5");
    await expect(income(page)).toHaveValue("2500");
    await expect(jar(page, /Necessities/)).toHaveValue("50");
    await expect(jar(page, /Long Term Savings/)).toHaveValue("15");
    await expect(summaryRow(page, "Necessities")).toContainText("1,250");
  });

  test("invalid share params fall back to defaults", async ({ page }) => {
    await page.goto("/?s=garbage,99");
    await expect(income(page)).toHaveValue("");
    await expect(jar(page, /Necessities/)).toHaveValue("55");
  });
});
