import { test, expect } from "@playwright/test";

test.describe("about page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("tells the story of the method", async ({ page }) => {
    await expect(page).toHaveTitle(/Why Six Jars/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const name of [
      "Necessities",
      "Long Term Savings",
      "Financial Freedom",
      "Education",
      "Play",
      "Give",
    ]) {
      await expect(
        page.getByRole("heading", { name: new RegExp(name) })
      ).toBeVisible();
    }
  });

  test("interactive demo splits a sample income live", async ({ page }) => {
    // 55% of the 30,000 default
    await expect(page.getByText("16,500")).toBeVisible();
    const slider = page.getByRole("slider", { name: /monthly income/i });
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    // 55% of 31,000
    await expect(page.getByText("17,050")).toBeVisible();
  });

  test("golden goose projection reacts to the slider", async ({ page }) => {
    const fv20 = page.getByTestId("fv-20");
    await expect(fv20).toHaveText(/\d{1,3}(,\d{3})+/);
    const before = await fv20.textContent();

    const slider = page.getByRole("slider", { name: /invest/i });
    await slider.focus();
    await page.keyboard.press("ArrowRight");

    await expect(fv20).not.toHaveText(before ?? "");
  });

  test("links back to the calculator", async ({ page }) => {
    await page
      .getByRole("link", { name: /open the calculator/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("spinbutton", { name: /Income/ })
    ).toBeVisible();
  });
});

test.describe("calculator to about", () => {
  test("home links to the why page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /why six jars/i }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
