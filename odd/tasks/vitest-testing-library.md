# Vitest + Testing Library

## Objective
Add a test runner (Vitest + React Testing Library) and cover the two behaviors flagged as untested by earlier reviews.

## Problem
The repo has no test runner. Reviews flagged two untested flows: the Chat suggested questions, and project previews rendering without a link when a project has neither `url` nor `repo` (originally in `CardProject.tsx`, now `ProjectShowcase.tsx`).

## Decisions
- Layout test mentioned earlier is dropped (user, 2026-10-06: "no importa").
- `CardProject.tsx` no longer exists; the no-link coverage targets `ProjectShowcase.tsx` (its demo/repo links render only when `url`/`repo` exist).

## Scope
`package.json`, `package-lock.json`, `vitest.config.mts`, `vitest.setup.ts`, `app/components/__tests__/`, `tsconfig.json` (types only if needed), this document.
Out of scope: production code changes (unless a test exposes a real bug — report first), layout test, e2e.

## Tasks
- [x] T1 Set up Vitest + jsdom + Testing Library (`npm test`), with a test for the Chat suggested questions. Route: delegated (writer trigger: config + setup + test files).
- [ ] T2 Test `ProjectShowcase` renders without demo/repo links when a project has neither `url` nor `repo`. Route: delegated (same writer).

## Checks
Test-first exception: the behavior already exists, so tests are characterization tests; each must be seen failing once by temporarily breaking the asserted condition (or asserting the opposite) before being committed green. Per task: `npm test`, `npx tsc --noEmit`, `npm run lint`.

## Delivery
Strategy: ask-on-risk. Forecast ~250 authored lines (lockfile excluded).

## Progress / evidence
- Branch: `test/vitest-testing-library`.
- T1 done. Versions pinned for compatibility: `vitest@^3.2.7` (vitest 5 peer-requires `@types/node` >=22, repo has ^20), `@vitejs/plugin-react@^4` (v5+ needs vite 8), `jsdom@^26` (latest needs Node >=24.15, local is 24.13.1), `vite-tsconfig-paths@^5` (components import `@/`).
  - Setup polyfills: `IntersectionObserver` stub (framer-motion `whileInView`/`useInView`), `Element.prototype.scrollTo` no-op (Chat scrolls its list). jsdom lacks both.
  - Mock: `@/app/lib/actions` `sendQuestion` via `vi.mock` (no network).
  - `app/components/__tests__/` is a private folder (`_` prefix) in the App Router, never routed.
  - RED: flipping `.not.toBeInTheDocument()` on the suggestions list after a click -> `FAIL ... sends the clicked suggestion, shows it with the answer, and hides the suggestions` / `Error: expect(received).toBeInTheDocument()`. Restored -> GREEN.
  - `npm test`: 2 passed. `npx tsc --noEmit`: exit 0. `npm run lint`: no warnings or errors.

## Next step
T2.
