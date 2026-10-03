import { test, expect } from "@playwright/test";

const PAGES = [
  { name: "home", url: "/" },
  { name: "zasobnik", url: "/zasobnik" },
  { name: "wyzwania", url: "/wyzwania" },
];

test.describe("visual chrome check", () => {
  for (const p of PAGES) {
    test(`desktop ${p.name}`, async ({ page }) => {
      await page.goto(p.url, { waitUntil: "networkidle" });
      await expect(page.locator(".site-header .brand")).toBeVisible();
      await expect(page.locator("#main-nav")).toBeVisible();
      await expect(page.locator(".site-footer .footer-grid")).toBeVisible();
      await page.screenshot({ path: `test-results/chrome-desktop-${p.name}.png`, fullPage: true });
    });
  }

  test("mobile home + menu", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, locale: "pl-PL" });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator(".menu-toggle")).toBeVisible();
    await expect(page.locator("#main-nav")).toBeHidden();
    await page.screenshot({ path: "test-results/chrome-mobile-closed.png", fullPage: true });
    await page.locator(".menu-toggle").click();
    await expect(page.locator("#main-nav")).toBeVisible();
    await expect(page.locator(".header-cta")).toBeVisible();
    await page.screenshot({ path: "test-results/chrome-mobile-open.png", fullPage: false });
    // footer stacked
    await expect(page.locator(".site-footer .footer-grid")).toBeVisible();
    await ctx.close();
  });
});
