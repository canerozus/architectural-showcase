# Tanstack-MSW case — Runbook

## Local setup
```bash
npm install
```

## Run dev server
```bash
npm run dev
```
Open the Vite URL shown in the terminal.

## Lint and typecheck
```bash
npm run lint
npm run typecheck
```

## Data & mocks
- MSW handlers live in `src/mocks/` and can serve realistic API responses locally.
- If real APIs are unavailable, keep MSW enabled to validate UI flows.

## Operational notes (frontend)
- Use URL search params for filters/sort/pagination to keep browser navigation consistent.
- For slow networks, optimistic updates keep UI responsive; ensure rollback paths are visible.
