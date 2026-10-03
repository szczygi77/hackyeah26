import { test, expect, type Page } from "@playwright/test";

const stamp = Date.now().toString(36);

function watch(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 500) errors.push(`${res.status()} ${res.url()}`);
  });
  return errors;
}

test("przeklikanie platformy Szczep", async ({ page }) => {
  const errors = watch(page);

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Opisz problem" })).toBeVisible();
  await page.getByRole("link", { name: "Dla gminy lub organizacji" }).click();
  await expect(page).toHaveURL("/");

  await page.locator("#q").fill("samotni seniorzy po zamknięciu klubu");
  await page.getByRole("button", { name: "Szukaj dopasowań" }).click();
  await expect(page).toHaveURL(/\/wyniki\?q=/);
  await expect(page.getByRole("heading", { name: "Dopasowane ogłoszenia" })).toBeVisible();

  await page.getByRole("button", { name: "Sprawdź warunki u siebie" }).first().click();
  await expect(page).toHaveURL(/\/sprawdz\/[^/]+$/);
  await expect(page.getByRole("heading", { name: "Czy to zadziała u Was?" })).toBeVisible();

  const gmina = page.locator("#municipality");
  const value = await gmina.locator("option").nth(1).getAttribute("value");
  if (value) await gmina.selectOption(value);
  await page.locator('input[type="radio"][value="YES"]').first().check();
  await page.getByRole("button", { name: "Pokaż listę zgodności" }).click();
  await expect(page).toHaveURL(/\/wynik$/);
  await expect(page.getByRole("heading", { name: "Lista zgodności" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Macie to" })).toBeVisible();

  await page.getByRole("link", { name: /Middleman/ }).click();
  await expect(page.getByRole("heading", { name: /Middleman/ })).toBeVisible();

  await page.goto("/karta/telefon-na-dzien-dobry");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Sprawdź u siebie" }).click();
  await expect(page).toHaveURL(/\/sprawdz\//);

  await page.goto("/zasobnik");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/wyzwania");
  await page.locator('a[href^="/wyzwania/"]').first().click();
  await expect(page).toHaveURL(/\/wyzwania\/.+/);

  await page.goto("/tester?slug=telefon-na-dzien-dobry");
  await page.getByLabel(/Obszar/).fill(`Gmina demo ${stamp}`);
  await page.getByLabel(/Proponuję usprawnienie/).fill("Krótsze wizyty w tygodniu.");
  await page.getByRole("button", { name: "Wyślij zgłoszenie testu" }).click();
  await expect(page).toHaveURL(/\/zgloszenie\//);
  await expect(page.getByText("Status: Przyjęte")).toBeVisible();

  await page.goto("/pomysl");
  await page.locator("#title").fill(`Klub sąsiedzki ${stamp}`);
  await page.locator("#body").fill("Spotkania raz w tygodniu dla samotnych seniorów w małej gminie.");
  await page.locator("#roleLabel").fill("seniorzy");
  await page.getByRole("button", { name: "Wyślij fiszkę" }).click();
  await expect(page).toHaveURL(/\/zgloszenie\//);

  await page.goto("/partnerstwa");
  await page.locator("#area").fill("seniorzy");
  await page.locator("#body").fill(`Szukam partnera do testu ${stamp}.`);
  await page.getByRole("button", { name: "Opublikuj wpis" }).click();
  await expect(page).toHaveURL(/\/zgloszenie\//);

  await page.goto("/nabor/subskrypcja");
  await page.locator("#email").fill(`demo+${stamp}@example.com`);
  await page.locator("#topic").fill("seniorzy");
  await page.getByRole("button", { name: "Zapisz zainteresowanie" }).click();
  await expect(page.getByText("Zapisano zainteresowanie (symulacja).")).toBeVisible();

  await page.goto("/logowanie");
  await page.locator("#email").fill("admin@demo.szczep");
  await page.locator("#password").fill("demo1234");
  await page.getByRole("button", { name: "Zaloguj" }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await page.locator('a[href^="/admin/zgloszenie/"]').first().click();
  await expect(page).toHaveURL(/\/admin\/zgloszenie\//);
  await page.locator("#status").selectOption("IN_REVIEW");
  await page.locator("#note").fill("Przejrzane w teście.");
  await page.getByRole("button", { name: "Zapisz i wyślij" }).click();
  await expect(page.getByText("status W ocenie")).toBeVisible();

  await page.goto("/admin/karty");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/admin/nabory");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("button", { name: "Wyloguj" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/logowanie");
  await page.locator("#email").fill("ekspert@demo.szczep");
  await page.locator("#password").fill("demo1234");
  await page.getByRole("button", { name: "Zaloguj" }).click();
  await expect(page).toHaveURL(/\/ekspert/);
  await expect(page.getByRole("heading", { name: /ekspert|mentor/i })).toBeVisible();

  expect(errors, errors.join("\n")).toEqual([]);
});
