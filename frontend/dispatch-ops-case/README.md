# Tanstack-MSW case — Frontend UI

## One‑liner
Feature‑based React UI showcasing predictable data flows, reusable UI primitives, and fast iteration with a modern TanStack + Tailwind stack.

## 2‑Minute Pitch
Problem: build a dispatch operations UI that scales across features while keeping data flow and UI primitives consistent.  
Constraints: fast iteration, clear separation of concerns, and UX responsiveness under frequent mutations.  
Choice: TanStack Router + Query for routing/data, feature‑based structure for ownership, and a reusable UI system built with Tailwind + Radix + shadcn.  
Alternative avoided: route‑per‑feature without shared patterns (leads to drift and inconsistent UI).  
Next improvement: expand component contracts and add component‑level visual tests.

## Scope
Included:
- Feature‑based modules and shared UI components.
- Data fetching and caching with TanStack Query.
- Optimistic updates for key mutations.
- Forms with React Hook Form + Zod validation.
- URL‑driven UI state (filters/search/pagination) so browser back/forward preserves view state.

Not included (intentionally):
- Full backend integration or real auth flows.
- End‑to‑end test suite.
- Design system governance beyond core components.

## UI Surface
Representative UI areas include route‑based feature pages, data tables, and form flows.  
Key interaction pattern: optimistic updates with clear loading/error states.

## How to run locally
```bash
npm install
npm run dev
```
Run linting and type checks:
```bash
npm run lint
npm run typecheck
```

## What to look at
- Feature structure: `src/features/` and `src/routes/`
- Shared UI: `src/components/`
- Data & caching: `src/api/` and TanStack Query usage
- Utilities: `src/lib/utils.ts` (clsx + tailwind‑merge)
- Forms: React Hook Form + Zod integration

## Trade‑offs (short)
- **TanStack Router/Query**: strong type‑safety and caching, slightly more setup.
- **Feature‑based structure**: clearer ownership, but requires discipline in shared boundaries.
- **Tailwind + Radix + shadcn**: fast UI composition; custom tokens must stay consistent.
- **URL‑driven state**: great navigation UX; requires careful param mapping.
