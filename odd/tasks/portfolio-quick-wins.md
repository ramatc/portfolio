# Portfolio quick wins

## Objective
Make the portfolio communicate positioning, evidence and judgment faster, without redesigning it.

## Problem
Benchmark against two reference portfolios showed: inconsistent positioning (hero/about/footer disagree), a hero without professional evidence, projects presented as a gallery (no impact or judgment), and small incoherences (Coda demo link points to the repo, skills missing tech used in projects).

## Decisions
- Positioning: **Full Stack Developer, end-to-end product** (user choice, 2026-10-05).
- Availability: **open to opportunities, remote or hybrid** (user choice, 2026-10-05).

## Scope
Copy and data in `app/components/{Hero,About,Footer,Projects,CardProject,Skills}.tsx`, `app/lib/definitions.ts`, `app/layout.tsx`, `app/manifest.ts`, new icons in `public/skills/`.
Out of scope: case-study pages, NDA banking case, chat suggestions, visual rhythm changes.

## Tasks
- [x] T1 Unify positioning copy (hero role + tagline, about, footer, metadata, manifest). Route: inline.
- [x] T2 Hero metadata strip + availability badge. Route: inline.
- [ ] T3 Project model: kind (client/personal), metrics, "what it proves"; render in card; reorder. Route: inline.
- [ ] T4 Fix incoherences: Coda demo link, skills (PostgreSQL, Prisma, Supabase). Route: inline.

Route note: all tasks inline — copy/data edits on already-read files, no research needed.

## Checks
No test runner in repo (test-first exception). Per task: `npx tsc --noEmit`, `npm run lint`; at close: `npm run build` + visual check in browser.

## Progress / evidence
- Branch: `feat/portfolio-quick-wins`

## Next step
T1.
