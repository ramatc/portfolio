# Vitest follow-ups

## Objective
Close the non-blocking review findings left by `odd/tasks/vitest-testing-library.md`.

## Problem
- Chat tests depend on framer-motion's real exit animation timing (`AnimatePresence mode="wait"`) against the default 1000 ms `findBy*` timeout.
- Chat failure path (`sendQuestion` rejects) is not covered.
- `ProjectShowcase` tests only cover neither/both `url`+`repo`, not url-only or repo-only.

## Scope
`vitest.setup.ts`, `app/components/__tests__/Chat.test.tsx`, `app/components/__tests__/ProjectShowcase.test.tsx`, this document.
Out of scope: production code changes (if a test exposes a real bug, report first), new dependencies.

## Tasks
- [x] T1 Skip framer-motion animations in the test setup (`MotionGlobalConfig.skipAnimations`). Route: delegated (writer trigger: 3 test files across T1-T3).
- [x] T2 Test the Chat failure path when `sendQuestion` rejects. Route: delegated (same writer).
- [ ] T3 Test `ProjectShowcase` url-only and repo-only cases. Route: delegated (same writer).

## Checks
Test-first exception: behavior already exists, so new tests are characterization tests; each must be seen failing once (temporarily invert the asserted condition) before being committed green. T1 is a setup change: existing tests must stay green. Per task: `npm test`, `npx tsc --noEmit`, `npm run lint`.

## Delivery
Strategy: ask-on-risk. Forecast ~80 authored lines.

## Progress / evidence
- Branch: `test/vitest-followups` (from `main` at `b22b387`).
- T1 done. `MotionGlobalConfig` is exported by framer-motion 12.40.0 (re-exported from `motion-utils`, which types `skipAnimations?: boolean`); set to `true` in `vitest.setup.ts`. No test relied on the exit delay; only the Chat helper comment was updated.
  - RED: not applicable (setup change); existing tests must stay green.
  - `npm test`: 2 files, 4 passed. `npx tsc --noEmit`: exit 0. `npm run lint`: no warnings or errors.
  - Commit: `3116368`.
- T2 done. Chat already handles rejection (`app/components/Chat.tsx:66-76`: catch appends a fallback bot message, finally clears loading). Test asserts the fallback message, the user's question still shown, and the input re-enabled.
  - RED: inverting `toBeEnabled()` -> `FAIL ... shows an error message and re-enables the input when sending fails` / `Error: expect(element).not.toBeEnabled()`. Restored -> GREEN.
  - `npm test`: 2 files, 5 passed. `npx tsc --noEmit`: exit 0. `npm run lint`: no warnings or errors.

## Next step
T3.
