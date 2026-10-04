import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { groupFields, isFieldVisible, missingRequired, parseCallFields } from "./call-fields";
import { COST_COLUMNS, INKUBATOR_FIELDS, INKUBATOR_FIELDS_JSON, INKUBATOR_SECTION_TITLES } from "./inkubator-form";

const EXPECTED_TITLES = [
  "Tytuł innowacji",
  "Dane pomysłodawcy",
  "Opis innowacji",
  "Innowacyjność rozwiązania",
  "Diagnoza problemu, na który odpowiada Twoja innowacja",
  "Opis odbiorców innowacji",
  "Zmiana jaką wprowadza innowacja",
  "Wizja przyszłości innowacji",
  "Plan działania i koszty",
  "Wnioskowana kwota grantu",
  "Zespół projektowy i jego doświadczenie",
  "Oświadczenia",
];

describe("formularz Inkubatora", () => {
  it("ma 12 punktów w kolejności ze wzoru", () => {
    assert.deepEqual(INKUBATOR_SECTION_TITLES, EXPECTED_TITLES);
    const sections = groupFields(parseCallFields(INKUBATOR_FIELDS_JSON));
    assert.deepEqual(
      sections.map((section) => section.title),
      EXPECTED_TITLES
    );
    assert.deepEqual(
      sections.map((section) => section.id),
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    );
  });

  it("tabele kosztów mają trzy kolumny oraz fazę I i II", () => {
    const tables = INKUBATOR_FIELDS.filter((field) => field.type === "rows");
    assert.equal(tables.length, 3);
    for (const table of tables) {
      assert.deepEqual(table.columns, [...COST_COLUMNS]);
    }
    assert.ok(tables.some((table) => table.label === "Faza I testu"));
    assert.ok(tables.some((table) => table.label === "Faza II testu"));
    const hints = INKUBATOR_FIELDS.map((field) => field.hint || "").join(" ");
    assert.match(hints, /3 miesięcy/);
    assert.match(hints, /9 miesięcy/);
  });

  it("oświadczenia zależą od rodzaju pomysłodawcy", () => {
    const person = INKUBATOR_FIELDS.filter((field) => field.key.startsWith("stmtPerson"));
    const entity = INKUBATOR_FIELDS.filter((field) => field.key.startsWith("stmtEntity"));
    assert.ok(person.length >= 15);
    assert.ok(entity.length >= 15);
    for (const field of person) {
      assert.equal(isFieldVisible(field, { applicantKind: "Osoba fizyczna" }), true);
      assert.equal(isFieldVisible(field, { applicantKind: "Grupa nieformalna" }), true);
      assert.equal(isFieldVisible(field, { applicantKind: "Podmiot" }), false);
    }
    for (const field of entity) {
      assert.equal(isFieldVisible(field, { applicantKind: "Podmiot" }), true);
      assert.equal(isFieldVisible(field, { applicantKind: "Osoba fizyczna" }), false);
    }
  });

  it("ukryte pola osoby nie blokują wniosku podmiotu", () => {
    const form = new FormData();
    form.set("applicantKind", "Podmiot");
    form.set("title", "Sąsiedzi");
    form.set("orgName", "Stowarzyszenie");
    form.set("orgKrs", "0000000000");
    form.set("orgRegon", "000000000");
    form.set("orgNip", "0000000000");
    form.set("orgAddress", "ul. Test 1");
    form.set("orgPostal", "30-001");
    form.set("orgCity", "Kraków");
    form.set("orgPhone", "000");
    form.set("orgEmail", "a@example.com");
    form.set("repRole", "prezes");
    form.set("repName", "Anna Test");
    form.set("repPhone", "000");
    form.set("repEmail", "a@example.com");
    form.set("contactRole", "koordynator");
    form.set("contactName", "Jan Test");
    form.set("contactPhone", "000");
    form.set("contactEmail", "a@example.com");
    for (const key of ["description", "novelty", "diagnosis", "audience", "change", "future", "prepNarrative", "testNarrative", "grantAmount", "team"]) {
      form.set(key, "opis");
    }
    form.set("prepCosts__0__0", "prototyp");
    form.set("testPhase1__0__0", "spotkanie");
    form.set("testPhase2__0__0", "model");
    for (const field of INKUBATOR_FIELDS.filter((item) => item.key.startsWith("stmtEntity"))) {
      form.set(field.key, "tak");
    }
    assert.equal(missingRequired(INKUBATOR_FIELDS, form), false);
  });
});
