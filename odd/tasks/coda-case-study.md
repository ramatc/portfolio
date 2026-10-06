# Coda case study

## Objective
Add a `/proyectos/coda` case-study page that shows real technical judgment on Coda, and make every Coda claim in the portfolio match the shipped code.

## Problem
The portfolio presents projects only as cards. Coda is the strongest project but its depth (catalog pipeline, rate limiting, search projection, recommendations) is invisible. The card and chat context also claim "content-based + collaborative" recommendations; collaborative filtering is spec-only in the Coda repo.

## Decisions
- Structure (user approved, 2026-10-06): context/problem, architecture with a simple diagram, three technical decisions with tradeoffs (catalog, search, recommendations), hard problems, testing, shipped vs roadmap.
- Correct the "colaborativo" claim in the card and chat context (user approved, 2026-10-06).
- Only facts verified in the Coda repo (local clone at `4788373`, same as GitHub `main`); spec-only items are labelled as roadmap.
- Branch `feat/coda-case-study` stacked on `feat/portfolio-quick-wins` (not yet merged).

## Scope
`app/components/Projects.tsx`, `app/components/CardProject.tsx`, `app/lib/definitions.ts`, `app/lib/actions.ts`, `app/sitemap.ts`, new route under `app/proyectos/coda/`.
Out of scope: other case studies, NDA banking case, visual rhythm of Projects, tests (deferred to the end of all work by user decision).

## Source facts (verified in Coda code)
- Spotify seeds the catalog; MusicBrainz enriches, match accepted only with score >= 80.
- MusicBrainz 1 req/s enforced twice: BullMQ limiter (1 job / 1100 ms, fleet-wide) + client-side serialized gate; 5 retries, exponential backoff.
- Resumable idempotent imports: deterministic job ids, Redis pagination checkpoint, upserts on unique `spotifyId`.
- Meilisearch is a rebuildable read projection; Postgres is the source of truth; writes through a `search-sync` queue; `reindex:search` rebuilds.
- Recommendations v1: precomputed heuristic 0.5 genre + 0.35 artist + 0.15 log popularity, top-5-genre SQL prefilter (300 candidates), top 50 stored, 5-min debounce, nightly refresh; explanation `{topGenre, matchedArtist}`.
- Modular monolith: NestJS 11 API + BullMQ workers as separate processes, Next.js 16 web, Postgres 17, Redis 7, Meilisearch.
- Feed: fan-in on read with cursor `(occurredAt desc, id desc)`.
- Hard problems: Spotify search caps (offset 1000) block the 100k-album goal; BullMQ silently skips a deterministic id left completed (`removeOnComplete`); BullMQ rejects `:` in job ids; CI ordering bug always skipped real-infra specs.
- Testing: Vitest, strict TDD, 570+ web tests, CI with real Postgres/Redis/Meilisearch.
- Roadmap (spec-only): Python reco service, collaborative filtering (ALS), embeddings, pgvector, mobile.

## Tasks
- [x] T1 Correct the collaborative-filtering claim in the Coda card and chat context. Route: inline (two one-line copy edits).
- [x] T2 Case-study page `/proyectos/coda` + link from the Coda card + sitemap entry. Route: delegated writer (new route plus edits to 3+ files, design work).

## Checks
No test runner in repo (test-first exception; tests deferred by user). Per task: `npx tsc --noEmit`, `npm run lint`; at close: `npm run build` + visual check.

## Delivery
Strategy: ask-on-risk. Forecast ~400 authored changed lines (T1 ~5, T2 ~350-400). Actual: ~820 (T2 alone 811 insertions, one new page with its copy) — chain strategy pending user decision.

## Progress / evidence
- Branch: `feat/coda-case-study`.
- T1 9164dae — `tsc` and `lint` clean.
- T2 27557d1 — writer: `tsc` 0, `lint` clean, `npm run build` OK (`/proyectos/coda` static). Parent spot check: `tsc` 0, `lint` clean. Navbar anchors now `/#x` and the active section resets on route change; page metadata lists share images explicitly. Parent corrected the explanation wording to the real UI strings ("Because you like {genre}" / "Because you follow this artist"). Visual check pending (user).

## Next step
Visual check of `/proyectos/coda` (diagram desktop/mobile, sticky index at lg, repo button contrast), then native review if due. Push / PR is the user's decision.
