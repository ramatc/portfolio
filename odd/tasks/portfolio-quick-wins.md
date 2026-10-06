# Portfolio quick wins

## Objective
Make the portfolio communicate positioning, evidence and judgment faster, without redesigning it.

## Problem
Benchmark against two reference portfolios showed: inconsistent positioning (hero/about/footer disagree), a hero without professional evidence, projects presented as a gallery (no impact or judgment), and small incoherences (Coda demo link points to the repo, skills missing tech used in projects).

## Decisions
- Positioning: **Full Stack Developer, end-to-end product** (user choice, 2026-10-05).
- Availability: **open to opportunities, remote or hybrid** (user choice, 2026-10-05).
- About stat stays **AR · Buenos Aires** (user rejected "UTC−3").
- Project order: **Coda, Vame, Vito** — Coda is the most important project even while in progress.
- Older course projects (Rick and Morty, Guess Pokémon, Memotest, VinylWRLD) are not shown; a "Más proyectos en GitHub" link replaces them.
- Hero scroll-cue bounce is intentional (user confirmed; detector exception in `.impeccable/config.json`).

## Scope
Copy and data in `app/components/{Hero,About,Footer,Projects,CardProject,Skills,Chat}.tsx`, `app/lib/{definitions,actions}.ts`, `app/layout.tsx`, `app/manifest.ts`, project and skill images in `public/`.
Out of scope: case-study pages, NDA banking case, visual rhythm changes.

## Tasks
- [x] T1 Unify positioning copy (hero role + tagline, about, footer, metadata, manifest). Route: inline.
- [x] T2 Hero metadata strip + availability badge. Route: inline.
- [x] T3 Project model: kind (client/personal), metrics, "what it proves"; render in card; reorder. Route: inline.
- [x] T4 Fix incoherences: Coda demo link, skills (PostgreSQL, Prisma, Supabase). Route: inline.
- [x] T5 Follow-up adjustments from user review: tighter card + new Vame mockup, clearer Vame takeaway, "En desarrollo" badge, Coda first, Vame role Fullstack, GitHub link, removed legacy images. Route: inline.
- [x] T6 Chat: refresh assistant context with current experience/projects, add suggested questions. Route: inline.
- [x] T7 Review follow-up: `CardProject` renders the preview image without a link when a project has neither `url` nor `repo`. Route: inline.

Route note: all tasks inline — copy/data edits on already-read files, no research needed.

## Checks
No test runner in repo (test-first exception). Per task: `npx tsc --noEmit`, `npm run lint`; at close: `npm run build` + visual check in browser.

## Progress / evidence
- Branch: `feat/portfolio-quick-wins`.
- T1 8632d6a, T2 9a7ae37, T3 06366c4, T4 2fb62d4.
- T5 3a27dfc, 30fea84, 3285fc7, 298565e, 64f6baa, a5a5c9e, ab488be, 15cca45, 7812061, 1471a95.
- T6 f626d6e, e9c9161.
- T7 committed with this task-record update (`fix: render project preview without link when no url or repo`); `tsc` and `lint` clean.
- Checks: `tsc` and `lint` clean on every task; `npm run build` OK after T4; visual checks on localhost; chat verified end to end (suggested question answered with current context).
- Review: branch base-diff (412 lines, medium) reviewed with consent granted; approved and acknowledged (lineage review-a0aced49a8e417d6).

## Follow-ups (non-blocking review findings)
- Chat suggested questions have no automated test (repo has no test runner). User decision (2026-10-06): add Vitest + Testing Library at the end of the feature, covering chat suggestions and the `CardProject` no-link case.

## Next step
Important improvements: Coda case-study page (needs real technical decisions from the user), NDA banking case, visual rhythm in Projects. Push / PR is the user's decision.
