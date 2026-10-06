# Vame case study

## Objective
Add a `/proyectos/vame` case-study page that shows real technical judgment on Vame Fútbol, linked from the Vame project card and listed in the sitemap.

## Problem
Vame is presented only as a card with metrics. The engineering behind it (HTML-to-React migration, live per-size stock from Supabase, WhatsApp checkout, image performance work) is invisible.

## Decisions
- Structure (proposed 2026-10-06, user approved by asking to include the online checkout): context, architecture, three technical decisions (per-size stock, WhatsApp checkout + cart, images/performance), hard problems, testing, results, roadmap.
- Online checkout (transfer, server-side price recalculation) is included as roadmap / in progress: it lives only on `feat/checkout-pagos` in the Vame repo, not merged (user decision 2026-10-06).
- Mirror the Coda case study: only facts verified in the Vame repo (`C:\Users\ramit\Desktop\workspace\vame`); unverified figures are attributed or omitted.
- Branch `feat/vame-case-study` from `main`.

## Scope
New route `app/proyectos/vame/`, `app/components/Projects.tsx` (add `caseStudy`), `app/sitemap.ts`, related tests if the existing Coda tests establish a pattern.
Out of scope: changes to the Vame repo, NDA banking case, Inaria highlight.

## Source facts (verified in Vame code, explorer report 2026-10-06)
- Stack: React 19, react-router-dom 7, Vite 6, TypeScript strict (`noUncheckedIndexedAccess`), plain global CSS, Supabase JS, Vercel (SPA rewrite, Analytics, Speed Insights). No state library: `CartProvider` + `CatalogFilterProvider` contexts.
- Migration: single static HTML (427 hard-coded products) to React via 8 chained PRs with a baseline rollback commit; then Supabase-only catalog, photos in Supabase Storage, per-size stock sync. 121 commits, 2026-07-18 to 2026-09-27.
- Data: read-only Supabase view `storefront_products` owned by a separate inventory app (kitstock-pro); anon key has `select` on the view only. Catalog cached in localStorage (`vame:catalog`) as stale fallback when Supabase fails. Fetched once per mount, not realtime.
- Stock: `stock_s`..`stock_xxxl` columns mapped to `stockBySize`; built only when all are numbers, otherwise all sizes treated as available. `stock_mode` `inmediato | encargo`.
- Catalog: league chips (La Liga, Premier, Serie A, Ligue 1, Liga Argentina, Selecciones), accent-insensitive search, size filter shows only confirmed stock > 0 ("what can I buy now"), in-stock first via stable sort, page size 20, "Última unidad" banner when total stock is 1.
- Out-of-stock size remains selectable on the product page: note "se hace por encargo", button becomes "Realizar encargo"; first in-stock size auto-selected. Note space reserved with `visibility` to avoid layout shift.
- Cart: generic `useLocalStorage` hook with type-guard validator (bad JSON/shape/storage falls back), key `vame:cart`; line identity `key|size|dorsalName|dorsalNumber` (fixed a legacy bug where qty/remove used only the product key); dorsal surcharge ARS 5,000 flat; positive-integer qty guard.
- WhatsApp checkout: message built per line (team, season, variant, size, dorsal, qty) + total, encoded once with `encodeURIComponent` (dorsal names with `&`, `#`, `%` cannot break the URL); `noopener,noreferrer`; toast when a popup blocker stops it.
- Images: Supabase Storage `/object/` rewritten to `/render/image/` with square box + `resize=contain`, `quality=75` (Supabase does not infer the missing dimension). Author comment: ~6 MB to <150 KB, fixed a 19s+ LCP (attribute as reported, not measured). `KitImage` lazy by default, `priority` = eager + `fetchPriority=high`, shimmer skeleton. Hero LCP image preloaded in `index.html` via Vite env substitution. Self-hosted preloaded fonts. Static meta, Open Graph, JSON-LD.
- Hard problems: Supabase transform dimensions; SPA rewrite for client routing on Vercel; previous RLS incident with anon key on the same Supabase project led to view-only anon grants and service-role on the server; `.js` extensions required for Vercel Node server imports.
- Testing: Vitest + jsdom + React Testing Library (26 files, ~211 unit/component tests by grep count, not runner), Playwright e2e (6 specs, 19 tests) against the production build. No CI.
- Roadmap / in progress (branch `feat/checkout-pagos`, not merged): `/checkout` with bank transfer; `api/orders/create` validates body and recalculates price, discount and dorsal surcharge on the server (client never sends price); stock checked for `inmediato` products (409 on insufficient); orders expire after 24h via a cron with `CRON_SECRET`; WhatsApp kept as the proven channel until the new one is proven. Mercado Pago card payment not built. No stock reservation yet.
- Results: 5,800+ visitors and 19,000 page views in the first month, 97% mobile traffic (already in the card).

## Tasks
- [x] T1 Case-study page `/proyectos/vame` + `caseStudy` link on the Vame card + sitemap entry (+ tests following the existing pattern, if any). Route: delegated writer (new route plus edits to 2+ files, design work).

## Checks
Per task: `npx tsc --noEmit`, `npm run lint`, `npm test`; at close: `npm run build` + visual check by the user.

## Delivery
Strategy: ask-on-risk. Forecast ~600-800 authored changed lines (one new page with its copy, comparable to Coda's 811).

## Progress / evidence
- Branch: `feat/vame-case-study`.
- T1 written (delegated writer): `app/proyectos/vame/page.tsx` (632), `ArchitectureDiagram.tsx` (169), Projects.tsx +1, sitemap.ts +6. Writer: `tsc` 0, `lint` clean, `npm test` 7/7, `npm run build` OK (`/proyectos/vame` static). Parent spot check: `tsc` 0. Test skipped: PROJECTS is not exported, fixture-based test could not fail first. Inferred consequence wording (legacy cart bug, SPA rewrite, `.js` imports, tradeoffs) flagged for user review.

- T1 committed 9db4c5c. Native review: risk medium, `slice_budget_reached`, consent granted, reliability lens approved and acknowledged. Advisory (non-blocking) findings: sitemap entry untested (WARNING), Vame card caseStudy link not proved by a rendered test (SUGGESTION).
- User asked to push to `main` (2026-10-06).

## Next step
Feature closed. Review advisories addressed on branch `test/vame-case-study-links`: `sitemap()` test (absolute URLs, no double slash, priorities) and a rendered `Projects` test for the Coda and Vame case-study links. RED observed by removing the Vame `caseStudy` and doubling the sitemap slash; GREEN: `npm test` 11/11, `tsc` 0, lint clean.
