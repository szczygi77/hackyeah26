---
name: Szczep — Hub Innowacji Społecznych
colors:
  background: '#f2f4f5'
  surface: '#ffffff'
  ink: '#1a1a1a'
  ink-muted: '#3d4450'
  line: '#d0d5dd'
  line-strong: '#6b7580'
  primary: '#0f2d6b'
  on-primary: '#ffffff'
  cta: '#ff6f0f'
  on-cta: '#1a1a1a'
  cta-deep: '#e8630a'
  ok: '#047857'
  low: '#be123c'
  info: '#0369a1'
  dark-background: '#121820'
  dark-surface: '#1a2330'
  dark-ink: '#f4f6f8'
  dark-link: '#d6e2ff'
typography:
  display:
    fontFamily: Syne
    role: H1 i znak
    fontWeight: '700'
  body:
    fontFamily: Source Sans 3
    fontSize: 18px
    lineHeight: 1.5
rounded:
  control: 0.35rem
  panel: 0.5rem
spacing:
  gutter: 1.5rem
  touch: 48px
---

## Brand & Style

**Atlas terenowy Hubu** — instytucjonalny, terenowy, konkretny (ROPS / CUS). Bez SaaS-gradientów, bez pill clutter, bez długich pitchy.

### Personality
- Navy + kamień + jeden akcent bursztyn (CTA/brand)
- Syne (display) + Source Sans 3 (body)
- Grafiki: ręczne SVG (HeroAtlas, CategoryGlyph) — nie stock/AI
- Karty tylko jako interakcja listingu; cover = glyph kategorii

## Colors

The color architecture enforces institutional credibility while maintaining social warmth and strict accessibility compliance (exceeding WCAG 2.1 AA with contrast ≥ 4.5:1 for all text and ≥ 3:1 for interactive components).

### Key Roles
- **Primary (`#0F2D6B` — navy):** Struktura: logo, linki, aktywny krok, focus, obrys przycisków drugorzędnych. Nie jest kolorem głównego przycisku.
- **CTA (`#FF6F0F` — pomarańcz ogłoszeń, hover `#E8630A`):** Jeden przycisk główny na ekranie, wzorzec tablicy ogłoszeń. Tekst `#1A1A1A` (biel na tym pomarańczu nie spełnia WCAG). Kontrast powyżej 4.5:1.
- **Tertiary (`#047857`):** Zgodność „Macie to” i ukończony krok.
- **Neutral (`#3D4450` na `#F4F6F8`):** Tekst pomocniczy. Linie `#D0D5DD`, obrys pól `#6B7580`.

### Semantic Tiers (Match & Readiness Indicators)
- **High Match / "Macie to" (`#047857` on `#ECFDF5` background, `#A7F3D0` border):** Unambiguous positive readiness.
- **Gaps / "Brakuje" (`#BE123C` on `#FFF1F2` background, `#FECDD3` border):** Dignified intervention callout; conveys needs without alarmist shock.
- **Verification / "Do sprawdzenia" (`#0284C7` on `#F0F9FF` background, `#BAE6FD` border):** Analytical inquiry and pending field evidence.

### Background & Surface Hierarchy
- **Canvas Base:** `#F4F6F8`
- **Surface:** `#FFFFFF` + border `#D0D7DE` (bez cieni)
- **Subtle Fill:** `#E4E9EE`

## Typography

**Source Sans 3** na cały interfejs: H1–H3, tekst, etykiety i przyciski. Baza 18 px.

### Rules of Engagement
- **Hierarchy:** Primary page headings utilize high weight (`700` and `800`) paired with tight negative tracking to command authority without intimidation.
- **Reading Comfort:** Body copy is pinned to a generous line height ratio (~1.5–1.55) to guarantee effortless scanning for users experiencing cognitive fatigue.
- **Evidence Badges (E0–E3):** Typeset strictly using `label-badge` with uppercase transformation and tabular tracking (`+0.04em`), ensuring quick visual grouping across dense catalog listings.

## Layout & Spacing

The structural layout utilizes an accessible 12-column fluid grid system on desktop, collapsing to 6 columns on tablet and 4 columns on mobile devices.

### Form Factor Behavior
- **Desktop (≥ 1280px):** Max container width bounded to `1280px` centered, utilizing `2rem` outer margins and `1.5rem` gutters.
- **Tablet (768px – 1279px):** Adaptive 6-column fluid structure with `1.5rem` outer margins and `1rem` gutters. Sidebars collapse to off-canvas drawer systems.
- **Mobile (< 768px):** Strict single-column stack with `1rem` margins and `1rem` vertical flow gaps. All critical touch targets preserve a minimum 48×48px boundary.

## Elevation & Depth

Visual hierarchy uses physical, grounded clarity rather than dramatic layered illusions. 

### Layering Philosophy
- **Surface Level (Base):** `#F4F6F8` flat canvas.
- **Resting Cards & Containers:** `#FFFFFF` z linią `1px solid #D0D5DD`. Bez cienia.
- **Interactive Hover State:** Zmiana obrysu na `#6B7580`. Bez unoszenia i bez gradientu.
- **Panel dostępności:** Ta sama biała powierzchnia i linia. Bez rozmycia tła.

## Shapes

The design system incorporates **Level 2 (Rounded)** shape styling (`0.5rem` base roundedness), instilling an approachable, contemporary visual texture while retaining institutional rigor.

### Token Mapping
- **Buttons, Form Inputs, Filter Pills:** `0.5rem` (8px).
- **Cards, Modules, Fieldsets, Dialog Containers:** `rounded-lg` at `1rem` (16px).
- **Floating Modals, Summary Drawers:** `rounded-xl` at `1.5rem` (24px).
- **Status Badges, Evidence Pills, Step Markers:** Fully circular/pill rounded (`9999px`).

## Components

### 1. 4-Step Progress Flow Indicator
- **Steps:** `1. Opisz` → `2. Dopasuj` → `3. Sprawdź` → `4. Wdróż`.
- **States:**
  - *Completed:* `#047857` (Sprout) circle with white check icon, connecting line solid `#047857`.
  - *Active:* `#0F2D6B` (Navy) circle containing bold white step numeral, enclosed by a 3px ring offset `#DBEAFE`. Connecting line dashed `#CBD5E1`.
  - *Upcoming:* `#F1F5F9` background, `#64748B` numeral, border `1px solid #CBD5E1`.
- **Accessibility:** Accessible via `<nav aria-label="Kroki wdrożenia">` and `aria-current="step"`.

### 2. "Karta w 60 sekund" (Snapshot Innovation Card)
- **Container:** White background, `16px` border-radius, `1px solid #E2E8F0`, padded with `1.5rem`.
- **Header:** Title (`title-card`), Innovation ID (e.g., `#INNO-402`), and primary Evidence Level Badge (`E0`–`E3`) positioned at top right.
- **Content Blocks:** Two-column diagnostic split:
  - *Dla kogo (Target Group):* Compact bulleted list with `#0F2D6B` iconography.
  - *Potrzebne zasoby (Resources):* High-level estimate chips (e.g., "Zespół: 2 os.", "Czas: 3 mies.").
- **Footer Action:** Right-aligned secondary action button "Zobacz profil innowacji" with directional arrow icon.

### 3. Evidence Tier Badges (E0 – E3)
- **E0 (Pomysł / Zgłoszenie):** Background `#F1F5F9`, text `#475569`, border `1px solid #CBD5E1`.
- **E1 (Testowane lokalnie):** Background `#FEF3C7`, text `#B45309`, border `1px solid #FCD34D`.
- **E2 (Zweryfikowana skuteczność):** Background `#E0F2FE`, text `#0369A1`, border `1px solid #7DD3FC`.
- **E3 (Skalowalne / Standard):** Background `#DCFCE7`, text `#15803D`, border `1px solid #86EFAC`.

### 4. Interactive Match & Readiness Indicators
- **High Match ("Macie to"):** Pill badge with green tick (`#047857`), soft green fill (`#ECFDF5`).
- **Gaps ("Brakuje"):** Outlined tag `#BE123C`, subtle alert tint (`#FFF1F2`).
- **Review Needed ("Do sprawdzenia"):** Sky badge (`#0284C7`), informational prompt tag.

### 5. Pływający panel dostępności
- **Pozycja:** przycisk „Dostępność” przyklejony do prawego dolnego rogu (min. 48 px). Poza głównym menu.
- **Po otwarciu:** region z trzema grupami — wielkość tekstu A / A+ / A++, kontrast Jasny / Ciemny, język Standardowy / Prosty język.
- **Sterowanie:** te same ciasteczka (`/api/tekst`, `/api/motyw`, `/api/prosty`). `aria-expanded`, Escape zamyka i wraca fokus na przycisk.
- **Ciemny motyw:** tło `#121820`, tekst `#F4F6F8`, linki `#D6E2FF`. Przycisk główny zostaje bursztynem z białym tekstem.

### 6. Synthetic Demo Data Banner
- **Container:** High-contrast amber-amber-light gradient bar pinned above main layout (`#FFFBEB`, border-bottom `1px solid #FDE68A`).
- **Content:** Information icon (`#B45309`), accompanied by text: *"Tryb demonstracyjny: Prezentowane dane innowacji mają charakter poglądowy (ROPS Kraków)."*
- **Action:** Dismiss button with high focus ring visibility.

### 7. Form Inputs & Interactive Filters
- **Inputs:** `44px` minimum height, `#FFFFFF` background, `1px solid #6B7580` border. Pod każdym polem wolnego tekstu: „Bez danych osób trzecich. Bez logowania.”
- **Focus State:** 2px outline in `#0F2D6B` with a `2px` offset (`#DBEAFE`).
- **Filter Chips:** Toggable chips with checkable states. Inactive: `#F8FAFC`, border `#E2E8F0`. Selected: `#0F2D6B` fill, `#FFFFFF` text.