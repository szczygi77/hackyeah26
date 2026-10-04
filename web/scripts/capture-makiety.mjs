import { chromium } from "@playwright/test";
import path from "node:path";

const out = path.resolve("docs/makiety");
const base = "http://127.0.0.1:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, locale: "pl-PL" });
await page.emulateMedia({ reducedMotion: "reduce" });
page.setDefaultTimeout(60_000);
page.setDefaultNavigationTimeout(60_000);

async function shot(name) {
  await page.evaluate(async () => {
    await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => undefined)));
    await Promise.all(
      [...document.images].map(
        (img) =>
          img.decode?.().catch(() => undefined) ??
          new Promise((resolve) => {
            if (img.complete) resolve(undefined);
            else {
              img.addEventListener("load", () => resolve(undefined), { once: true });
              img.addEventListener("error", () => resolve(undefined), { once: true });
            }
          })
      )
    );
  });
  await page.screenshot({ path: path.join(out, name), animations: "disabled" });
  console.log(name);
}

await page.goto(base + "/", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: /Znajdź innowację/ }).waitFor();
await shot("01-home.png");

await page.goto(base + "/wyniki?q=" + encodeURIComponent("samotni seniorzy"), { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: "Dopasowane ogłoszenia" }).waitFor();
await shot("02-wyniki.png");

await page.goto(base + "/karta/telefon-na-dzien-dobry", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { level: 1 }).waitFor();
await shot("03-karta.png");

await page.getByRole("button", { name: "Sprawdź u siebie" }).click();
await page.waitForURL(/\/sprawdz\//);
await page.getByRole("heading", { name: "Warunki z tej karty" }).waitFor();
await shot("04-sprawdz.png");

const gmina = page.locator("#municipality");
const value = await gmina.locator("option").nth(1).getAttribute("value");
if (value) await gmina.selectOption(value);
await page.locator('input[type="radio"][value="YES"]').first().check();
await page.getByRole("button", { name: "Pokaż listę zgodności" }).click();
await page.waitForURL(/\/wynik$/);
await page.getByRole("heading", { name: "Lista zgodności" }).waitFor();
await shot("05-zgodnosc.png");

await page.goto(base + "/middleman/telefon-na-dzien-dobry", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: /Middleman/ }).waitFor();
await shot("06-middleman.png");

await page.goto(base + "/pomysl", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: "Kreator pomysłów" }).waitFor();
await shot("07-pomysl.png");

await page.goto(base + "/pomysl/wniosek/TREND-01", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: "Wniosek w naborze" }).waitFor();
await shot("11-wniosek.png");

await page.goto(base + "/zgloszenie/TREND-01", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { level: 1 }).waitFor();
await shot("08-zgloszenie.png");

await page.goto(base + "/logowanie");
await page.locator("#email").fill("admin@demo.szczep");
await page.locator("#password").fill("demo1234");
await page.locator("#tresc").getByRole("button", { name: "Zaloguj" }).click();
await page.waitForURL(/\/admin$/);
await page.getByRole("heading", { level: 1 }).waitFor();
await shot("09-admin.png");

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(base + "/", { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: /Znajdź innowację/ }).waitFor();
await shot("10-mobile-home.png");

await browser.close();
