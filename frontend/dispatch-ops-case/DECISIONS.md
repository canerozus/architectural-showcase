# Tanstack-MSW case — Decisions

## 1) TanStack Router + Query
- Context: Need predictable routing with type‑safe data access and caching.
- Decision: Use TanStack Router for route composition and TanStack Query for server state.
- Alternatives: React Router + custom fetch layer.
- Trade‑offs: More initial setup and conventions, but clearer data flow and cache control.

## 2) Feature‑based module structure
- Context: UI spans multiple domains (orders, couriers, assignment, etc.).
- Decision: Organize by features with shared UI extracted into `components/`.
- Alternatives: Layer‑only structure or route‑only folders.
- Trade‑offs: Requires discipline on boundaries; reduces duplication and drift.

## 3) Reusable UI system (Tailwind + Radix + shadcn)
- Context: Need consistent, composable UI building blocks.
- Decision: Combine Tailwind for layout/utility, Radix for accessible primitives, shadcn patterns for composition.
- Alternatives: Custom components from scratch or full UI framework.
- Trade‑offs: Faster UI delivery; must keep design tokens and variants consistent.

## 4) Styling utilities via clsx + tailwind‑merge
- Context: Complex class composition and variants across shared components.
- Decision: Standardize class merging in `src/lib/utils.ts`.
- Alternatives: Manual class strings or custom utility.
- Trade‑offs: Predictable class merging; extra dependency surface.

## 5) Forms + validation (React Hook Form + Zod)
- Context: Forms need strong validation and minimal re‑renders.
- Decision: Use RHF for form state and Zod for schema validation.
- Alternatives: Formik or custom validation.
- Trade‑offs: Fast and type‑safe; requires schema definitions per form.

## 6) Optimistic updates for key mutations
- Context: High‑frequency updates in dispatch flows need immediate feedback.
- Decision: Implement optimistic updates with rollback on failure.
- Alternatives: Always wait for server round‑trip.
- Trade‑offs: Better UX; more logic to keep cache consistent.

## 7) URL‑driven UI state (search params)
- Context: Filters/sort/pagination should survive refresh and back/forward navigation.
- Decision: Encode view state in route search params (TanStack Router).
- Alternatives: Local component state only.
- Trade‑offs: Better navigation UX; requires disciplined param mapping and parsing.
