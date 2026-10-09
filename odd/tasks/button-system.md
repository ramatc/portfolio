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
- [ ] T2 Add `app/ui/button.ts` with `buttonClasses` + unit test (test-first). Route: delegated (writer trigger: T2+T3 span 10+ non-trivial files).
- [ ] T3 Migrate in-scope components and case-study pages to `buttonClasses`. Route: delegated (same writer).

## Acceptance criteria
- Every in-scope element uses `buttonClasses`; no in-scope hand-written height/radius/hover classes remain.
- `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.

## Delivery
Strategy: ask-on-risk. Forecast ~250 authored changed lines.

## Progress / evidence
- T1: `npm test` 18/18 (was 2 failing in ProjectShowcase.test.tsx).

## Next step
T2.
