import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "", "core/", "agent/", "engines/", "engines/godot/", "engines/unity/", "engines/unreal/",
  "get-started/", "changelog/", "security/", "status/", "docs/", "docs/installation/",
  "docs/console-auth0/", "docs/evidence-and-cases/", "docs/unreal-blueprints/",
  "docs/typescript-server/", "docs/wasm-rules/", "docs/multi-region/",
];

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
  await expect(page.getByText(/register the game’s signed public trust material/)).toBeVisible();
});

test("documentation search filters guides and exposes an empty state", async ({ page }) => {
  await page.goto("docs/");
  const search = page.getByRole("searchbox", { name: "Search documentation" });
  await expect(search).toBeVisible();
  await search.fill("Auth0");
  await expect(page.getByRole("link", { name: /Console access with Auth0/ })).toBeVisible();
  await expect(page.getByText("1 guide shown")).toBeVisible();
  await search.fill("nothing-matches-this-query");
  await expect(page.getByRole("heading", { name: "No matching guides" })).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.getByText("15 guides shown")).toBeVisible();
});

test("changelog exposes every change category and both products", async ({ page }) => {
  await page.goto("changelog/");
  await expect(page.locator(".changelog-columns")).toBeVisible();
  await expect(page.locator("#core-releases")).toBeVisible();
  await expect(page.locator("#agent-releases")).toBeVisible();
  await expect(page.locator("#core-releases").getByRole("heading", { name: "v0.3.0-alpha.2" })).toBeVisible();
  await expect(page.locator("#agent-releases").getByRole("heading", { name: "v0.3.0-alpha.3" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "v0.2.0-alpha.1" })).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "Implemented" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fixes" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Breaking changes" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Migration" }).first()).toBeVisible();
  await expect(page.getByText("Tag only").first()).toBeVisible();
});

test("Agent guide covers current Windows and launch-bundle recovery", async ({ page }) => {
  await page.goto("agent/");
  await expect(page.getByRole("heading", { name: "Diagnose the actual boundary." })).toBeVisible();
  await expect(page.getByText(/PowerShell environment-clearing wrapper is no longer required/)).toBeVisible();
  await expect(page.getByText(/signed policy field 2, signed launch grant field 3/)).toBeVisible();
  await expect(page.getByText(/canonical protobuf omits a zero timestamp/)).toBeVisible();
});

test("reduced motion shows the static architecture", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/Certael-Website/");
  await expect(page.locator(".static-map")).toBeVisible();
  await context.close();
});
