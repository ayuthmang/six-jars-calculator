import { test, expect, type Page } from "@playwright/test";

/**
 * Specification of desired behavior for the Six Jars calculator.
 *
 * Selector notes:
 * - Number inputs are targeted via the spinbutton role because each jar also
 *   has a slider (role=slider) sharing the same accessible name.
 * - Summary legend rows are list items: "<dot> <name> <percent> <amount>".
 */

const income = (page: Page) =>
  page.getByRole("spinbutton", { name: /Income/ });
const jar = (page: Page, name: RegExp) =>
  page.getByRole("spinbutton", { name });
const summaryRow = (page: Page, name: string) =>
  page.getByRole("listitem").filter({ hasText: name });
const summaryTotal = (page: Page) => page.getByTestId("summary-total");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("defaults", () => {
  test("has a descriptive page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Six Jars Calculator/);
  });

  test("shows the six jars with default percentages", async ({ page }) => {
    await expect(jar(page, /Necessities/)).toHaveValue("55");
    await expect(jar(page, /Long Term Savings/)).toHaveValue("10");
    await expect(jar(page, /Financial Freedom/)).toHaveValue("10");
    await expect(jar(page, /Education/)).toHaveValue("10");
    await expect(jar(page, /Play/)).toHaveValue("10");
    await expect(jar(page, /Give/)).toHaveValue("5");
  });

  test("summary starts at zero with an empty-state hint", async ({ page }) => {
    await expect(summaryTotal(page)).toHaveText("0");
    await expect(
      page.getByText(/Enter your income to see the breakdown/)
    ).toBeVisible();
  });
});

test.describe("income allocation", () => {
  test("income input is reachable by its label", async ({ page }) => {
    await expect(income(page)).toBeVisible();
    await income(page).fill("1000");
    await expect(income(page)).toHaveValue("1000");
  });

  test("splits income across the six jars", async ({ page }) => {
    await income(page).fill("1000");
    await expect(summaryRow(page, "Necessities")).toContainText("550");
    await expect(summaryRow(page, "Long Term Savings")).toContainText("100");
    await expect(summaryRow(page, "Financial Freedom")).toContainText("100");
    await expect(summaryRow(page, "Education")).toContainText("100");
    await expect(summaryRow(page, "Play")).toContainText("100");
    await expect(summaryRow(page, "Give")).toContainText("50");
  });

  test("recalculates when a percentage changes", async ({ page }) => {
    await income(page).fill("1000");
    await jar(page, /Necessities/).fill("60");
    await expect(summaryRow(page, "Necessities")).toContainText("600");
  });

  test("formats the total with thousand separators", async ({ page }) => {
    await income(page).fill("1000000");
    await expect(summaryTotal(page)).toHaveText("1,000,000");
  });
});

test.describe("play jar", () => {
  test("changing Play updates the Play jar and leaves Give alone", async ({
    page,
  }) => {
    await income(page).fill("1000");
    await jar(page, /Play/).fill("20");
    await expect(jar(page, /Play/)).toHaveValue("20");
    await expect(summaryRow(page, "Play")).toContainText("200");
    await expect(summaryRow(page, "Give")).toContainText("50");
  });
});

test.describe("sliders", () => {
  test("arrow keys on a slider adjust the jar percentage", async ({
    page,
  }) => {
    await income(page).fill("1000");
    const slider = page.getByRole("slider", { name: /Necessities/ });
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(jar(page, /Necessities/)).toHaveValue("55.5");
    await expect(summaryRow(page, "Necessities")).toContainText("555");
  });
});

test.describe("decimal input", () => {
  test("supports typing decimal percentages character by character", async ({
    page,
  }) => {
    await income(page).fill("1000");
    const necessities = jar(page, /Necessities/);
    await necessities.fill("");
    await necessities.pressSequentially("12.5");
    await expect(necessities).toHaveValue("12.5");
    await expect(summaryRow(page, "Necessities")).toContainText("125");
  });
});

test.describe("reset", () => {
  test("restores default percentages but keeps the entered income", async ({
    page,
  }) => {
    await income(page).fill("2000");
    await jar(page, /Necessities/).fill("60");
    await expect(summaryRow(page, "Necessities")).toContainText("1,200");

    await page.getByRole("button", { name: "Reset" }).click();

    await expect(income(page)).toHaveValue("2000");
    await expect(jar(page, /Necessities/)).toHaveValue("55");
    await expect(summaryRow(page, "Necessities")).toContainText("1,100");
  });
});

test.describe("pie chart", () => {
  test("renders six distinctly colored slices", async ({ page }) => {
    await income(page).fill("1000");
    const sectors = page.locator("path.recharts-sector");
    await expect(sectors).toHaveCount(6);
    const fills = await sectors.evaluateAll((els) =>
      els.map((el) => el.getAttribute("fill"))
    );
    expect(new Set(fills).size).toBe(6);
  });
});

test.describe("percentage sum warning", () => {
  // Next.js injects its own role="alert" route announcer, so scope by text.
  const sumWarning = (page: Page) =>
    page.getByRole("alert").filter({ hasText: /add up/i });

  test("warns when jar percentages do not add up to 100", async ({ page }) => {
    await expect(sumWarning(page)).toHaveCount(0);

    await jar(page, /Necessities/).fill("50");
    await expect(sumWarning(page)).toBeVisible();
    await expect(sumWarning(page)).toContainText("95");

    await jar(page, /Necessities/).fill("55");
    await expect(sumWarning(page)).toHaveCount(0);
  });
});
