# EventOps Copilot MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a truthful, interactive EventOps Copilot portfolio product that turns synthetic event documents into a sourced, approval-gated execution pack.

**Architecture:** A Next.js App Router application serves a Chinese-first portfolio site and interactive workspace. Focused TypeScript domain modules calculate readiness, conflicts, approval gates, and evaluation metrics from versioned synthetic fixtures; adapter interfaces isolate simulated and future real AI/calendar integrations.

**Tech Stack:** Next.js 15+, React 19+, TypeScript 5+, Tailwind CSS 4+, Vitest, Testing Library, Playwright, pnpm.

## Global Constraints

- All demo data and evaluation results must be labeled as synthetic.
- No user, interview, feedback, efficiency gain, deployment, or integration may be claimed without current evidence.
- Unsupported facts must remain missing or be labeled as template suggestions.
- External writes require approval and idempotency protection.
- Use a single controlled workflow; do not add multi-agent orchestration.
- Keep secrets server-side and out of logs and screenshots.

---

### Task 1: Application foundation and design system

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/components/ui/status-pill.tsx`, `src/components/site/header.tsx`
- Test: `src/components/ui/status-pill.test.tsx`

**Interfaces:**
- Produces: `StatusPill({ tone, children })` and the global visual tokens used by every route.

- [ ] Write a component test asserting synthetic, warning, success, and neutral status labels render with accessible text.
- [ ] Run `pnpm vitest run src/components/ui/status-pill.test.tsx` and confirm it fails before implementation.
- [ ] Scaffold Next.js and implement a Chinese-first editorial operations aesthetic: warm paper background, ink typography, cobalt action color, amber warnings, restrained motion, responsive navigation.
- [ ] Run component tests, `pnpm lint`, and `pnpm build`.
- [ ] Commit with `feat: establish EventOps product foundation`.

### Task 2: Domain model, synthetic fixture, and deterministic services

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/readiness.ts`, `src/domain/conflicts.ts`, `src/domain/evaluation.ts`, `src/domain/approval.ts`
- Create: `src/data/demo-event.ts`, `src/data/evaluation-cases.ts`
- Test: `src/domain/readiness.test.ts`, `src/domain/conflicts.test.ts`, `src/domain/evaluation.test.ts`, `src/domain/approval.test.ts`

**Interfaces:**
- Produces: `calculateReadiness(project): ReadinessResult`, `detectConflicts(facts): Issue[]`, `evaluateCases(cases): EvaluationSummary`, `canApprove(project): ApprovalGate`.
- Demo fixture: one synthetic event with source-backed facts, one schedule conflict, three missing facts, four deliverable groups, approvals, run traces, and explicit simulated tool status.

- [ ] Write tests for readiness score, blocking issues, conflicting times, unsupported claims, metric denominators, and approval rejection.
- [ ] Run domain tests and confirm failures before implementations exist.
- [ ] Implement readonly TypeScript types and pure functions without framework dependencies.
- [ ] Build a coherent synthetic Chinese event fixture; every sourced fact includes document name, locator, and quote.
- [ ] Run `pnpm vitest run src/domain` and commit with `feat: add auditable event domain`.

### Task 3: Interactive workspace

**Files:**
- Create: `src/app/workspace/page.tsx`
- Create: `src/components/workspace/workspace-shell.tsx`
- Create: `src/components/workspace/readiness-card.tsx`, `fact-register.tsx`, `issue-list.tsx`, `execution-pack.tsx`, `approval-panel.tsx`, `run-trace.tsx`
- Create: `src/app/api/calendar/simulate/route.ts`
- Test: `src/components/workspace/workspace-shell.test.tsx`, `src/app/api/calendar/simulate/route.test.ts`

**Interfaces:**
- Consumes: domain fixture and pure services from Task 2.
- Produces: tabbed evidence-first workspace and `POST /api/calendar/simulate` returning `{ mode: "simulated", idempotencyKey, status }`.

- [ ] Write tests asserting conflict visibility, source quote expansion, blocked approval, synthetic labeling, and repeated calendar calls returning the same idempotency key.
- [ ] Run focused tests and confirm failures.
- [ ] Implement the workspace with client state for confirming missing facts, resolving the seeded conflict, approving the pack, and performing a clearly labeled simulated calendar call.
- [ ] Add empty, blocked, loading, success, and failure states without inventing backend completion.
- [ ] Run tests and commit with `feat: build evidence-first event workspace`.

### Task 4: Evaluation and Case Study routes

**Files:**
- Create: `src/app/evaluation/page.tsx`, `src/components/evaluation/metric-card.tsx`, `src/components/evaluation/evaluation-table.tsx`
- Create: `src/app/case-study/page.tsx`
- Create: `docs/CASE_STUDY.md`, `docs/RESUME.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`
- Test: `src/components/evaluation/evaluation-table.test.tsx`

**Interfaces:**
- Consumes: evaluation summary from Task 2.
- Produces: transparent synthetic benchmark and a one-page hiring narrative with problem, decisions, implementation, evidence, limits, and next steps.

- [ ] Write tests asserting formulas, sample counts, synthetic warnings, and zero-denominator display.
- [ ] Implement evaluation page with no unsupported improvement claims.
- [ ] Implement Case Study page and source documents, keeping product status consistent.
- [ ] Run tests, lint, build, and commit with `feat: add evaluation and portfolio narrative`.

### Task 5: End-to-end verification and release assets

**Files:**
- Create: `e2e/core-flow.spec.ts`
- Create: `public/screenshots/home.png`, `public/screenshots/workspace.png`, `public/screenshots/evaluation.png`
- Create: `docs/DEMO_SCRIPT.md`
- Create: `public/demo/eventops-copilot-demo.mp4`
- Create: `README.md`, `.env.example`, `LICENSE`, `.github/workflows/ci.yml`

**Interfaces:**
- Produces: reproducible local setup, CI checks, browser-tested critical path, three real screenshots of the built UI, and a 45–60 second recorded walkthrough.

- [ ] Write Playwright tests for homepage entry, source inspection, conflict resolution, approval, and simulated calendar completion.
- [ ] Run the E2E test before final fixes and capture the failing state.
- [ ] Fix only observed failures; run full unit, lint, build, and E2E verification.
- [ ] Start the production build, capture screenshots with Playwright, write the timed Chinese demo script, and record the browser walkthrough with the bundled browser tooling and ffmpeg.
- [ ] Write a 30-second-scan README with Demo status, key screenshot, differentiators, architecture, local setup, tests, truthfulness boundary, and roadmap.
- [ ] Commit with `docs: package EventOps Copilot portfolio`.

### Task 6: Publication and post-publication checks

**Files:**
- Create when applicable: `.openai/hosting.json`
- Modify: `README.md` only after verified public URLs exist.

**Interfaces:**
- Produces: a public GitHub repository URL and production deployment URL when account connections and permissions are available.

- [ ] Inspect available GitHub and hosting connections without printing credentials.
- [ ] Create or select the repository only if authorized by the connected account; push the exact verified commit.
- [ ] Deploy only a saved version of the exact pushed source state.
- [ ] Verify GitHub README rendering, screenshot paths, CI result, live routes, critical browser flow, console errors, and mobile layout.
- [ ] If publication is unavailable, report it as the sole external blocker and leave a fully verified local deliverable without claiming publication.

