import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["", "core/", "agent/", "engines/", "engines/godot/", "engines/unity/", "engines/unreal/", "get-started/", "security/", "status/"];

for (const route of routes) {
  test(`${route || "home"} renders without serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
  });
}

test("setup selector changes the generated guide", async ({ page }) => {
  await page.goto("get-started/");
  await expect(page.locator(".setup-builder[data-hydrated=true]")).toBeVisible();
  await page.selectOption("select", "unity");
  await page.getByRole("button", { name: "Core + Agent" }).click();
  await expect(page.getByRole("heading", { name: /certael-unity/i })).toBeVisible();
  await expect(page.getByText(/Install the complete Agent/)).toBeVisible();
});

test("reduced motion shows the static architecture", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/Certael-Website/");
  await expect(page.locator(".static-map")).toBeVisible();
  await context.close();
});
