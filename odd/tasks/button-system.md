# Button system

## Objective
Unify button heights, radius, hovers, transitions and focus rings behind one shared `buttonClasses({ variant, size, surface })` helper (UI audit item #13).

## Problem / why
25 hand-written button classNames: heights h-11/h-10/h-9/h-8/py-2, radius md/lg/xl, four different secondary hovers, uneven `active:scale` and focus offsets. No shared primitive or class helper exists.

## Scope
- In: Hero, Form, Chat submit, Navbar (CV + menu toggle), Footer (socials + copy email), ProjectShowcase (demo, case-study link, IconLink), Projects ("Más proyectos en GitHub"), case-study pages `app/proyectos/{vame,coda}/page.tsx` (back link, repo, footer back, accent CTA).
- Out (deliberate pill/custom shapes): Chat trigger, suggestion chips, Chat close (X, see chat-header-style), gallery arrows and dots, project tabs, logo badges.

## Constraints
- Helper over component: elements are `Link`, `<a>`, `<button>` and `motion.button`.
- No new dependency (no clsx / tailwind-merge).
- Accessible names unchanged; ProjectShowcase tests assert total link count.
- Respect subtle-input-borders, keep-violet-roles-filled-icons, skills-no-highlight, chat-header-style.

## System
| variant | sizes | hover |
|---|---|---|
| primary | md h-11 px-5 / sm h-9 px-3 / icon h-9 w-9 | bg-brand-muted |
| secondary | md / sm / icon | border-border-strong + bg-overlay + text-fg |
| ghost | sm | text-fg |
| accent | md / sm (bg via inline style) | opacity-90 |

Shared: rounded-md, text-sm font-semibold, transition-colors duration-150, active:scale-[0.97], focus ring brand/60 + offset 2, disabled cursor-not-allowed opacity-60. `surface: "base" | "elevated"` picks the ring-offset color and the secondary bg on elevated cards.

## Tasks
- [x] T1 Fix stale ProjectShowcase demo-link names ("Abrir demo" → "Ver demo") broken since f984374; the two negative asserts were passing vacuously. Route: inline.
- [x] T2 Add `app/ui/button.ts` with `buttonClasses` + unit test (test-first). Route: delegated (writer trigger: T2+T3 span 10+ non-trivial files).
- [x] T3 Migrate in-scope components and case-study pages to `buttonClasses`. Route: delegated (same writer).

## Acceptance criteria
- Every in-scope element uses `buttonClasses`; no in-scope hand-written height/radius/hover classes remain.
- `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.

## Delivery
Strategy: ask-on-risk. Forecast ~250 authored changed lines.

## Progress / evidence
- T1: `npm test` 18/18 (was 2 failing in ProjectShowcase.test.tsx).
- T1 commit: bd66d2c.
- T2: RED observed (`npx vitest run app/ui` failed: module `../button` missing), then GREEN 9/9. Commit: `feat: add shared buttonClasses helper`.
- T2 judgment: primary keeps the site's existing `bg-fg text-bg-base shadow-xs` fill; hover `bg-brand-muted`.
- T2 judgment: transition lists color/bg/border/opacity/transform so `active:scale` eases; reduced motion via `motion-reduce:transition-none` plus the existing global rule in globals.css.
- T2 judgment: secondary text is `text-fg-muted` → `text-fg` on hover at every size; on elevated surfaces it is already `bg-bg-overlay`, so hover changes border and text only.
- T2 commit: fcba076.
- T3 commits: 55408ca `refactor: use buttonClasses for site buttons` (components), plus `refactor: use buttonClasses on case-study pages` (vame/coda pages + this doc).
- T3 checks: `npm test` 27/27 pass; `npx tsc --noEmit` exit 0; `npm run lint` no warnings or errors; `npm run build` compiles, then FAILS prerendering `/opengraph-image` and `/twitter-image` (`TypeError: Invalid URL` in `fileURLToPath` inside `next/dist/compiled/@vercel/og`). The same failure reproduces with base `app/components` and pages restored, so it is pre-existing/environmental, not caused by this feature.
- T3 judgment: Navbar CV/menu move from h-8 to h-9 (36px) inside a h-14/h-16 bar, which fits; CV text goes text-xs → text-sm per the system.
- T3 judgment: case-study header link ("Ver la tienda en vivo" / repo) is a header CTA → secondary md; footer pair ("Proyectos" + accent) → md on surface elevated (the section is bg-bg-elevated; old ring offset bg-base was wrong there).
- T3 judgment: "Volver a proyectos" ghost sm gets `-ml-3` so the label stays flush with the page content after gaining px-3.
- T3 judgment: "Ver caso de estudio" drops its bespoke border-strong/text-fg look for standard secondary sm (elevated); Chat submit disabled opacity goes 40 → 60 per the shared system.

## Next step
Parent: RDD assessment of the T2/T3 commits; decide on the pre-existing OG-image build failure (separate task).
