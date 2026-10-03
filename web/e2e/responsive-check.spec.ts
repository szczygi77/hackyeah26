import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "phone", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1920, height: 1080 },
];

test.describe("responsive full-width", () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name} home`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, locale: "pl-PL" });
      const page = await ctx.newPage();
      await page.goto("/", { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
      expect(overflow, "page should not overflow horizontally").toBeFalsy();
      await expect(page.locator(".site-header")).toBeVisible();
      await expect(page.locator(".home-hero")).toBeVisible();
      await page.screenshot({ path: `test-results/responsive-${vp.name}.png`, fullPage: true });
      await ctx.close();
    });
  }
});
