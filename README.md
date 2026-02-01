# Architectural Showcase

This repository is an **architectural showcase**, not a product.
The goal is to communicate **trade-offs, design choices, and operational thinking** quickly and clearly.

## How to navigate in 5 minutes
If you only have 5 minutes, start here:

1) **2 min -- Pitch + scope**
   - `backend/Search-Retrieval-API-mini-case/README.md`
   - `frontend/dispatch-ops-case/README.md`
2) **2 min -- Diagrams + request flow**
   - `backend/Search-Retrieval-API-mini-case/ARCHITECTURE.md`
   - `frontend/dispatch-ops-case/ARCHITECTURE.md`
3) **1 min -- Explicit trade-offs**
   - `backend/Search-Retrieval-API-mini-case/DECISIONS.md`
   - `frontend/dispatch-ops-case/DECISIONS.md`

---

## Showcase Index

### Backend
- **Search-Retrieval-API** -> `backend/Search-Retrieval-API-mini-case/`
  Problem: design a hybrid search endpoint with graceful degradation.
  Signals: ports/adapters, fallback strategy, minimal observability notes, testability.

### Frontend
- **Dispatch Ops case** -> `frontend/dispatch-ops-case/`
  Problem: build a dispatch operations UI with feature ownership and URL-driven state.
  Signals: TanStack Router/Query, optimistic updates + rollback, RHF + Zod validation.

### DevOps
- **CI/CD + Deployment** -> `devops/`
  Focus: minimal pipelines, environment separation, and safe deployment patterns.

---

## Repository Conventions
Each mini-case includes:
- `README.md` -- 2-minute pitch, scope, API/UI surface, how to run.
- `ARCHITECTURE.md` -- diagrams + request/render flow.
- `DECISIONS.md` (or `decisions/`) -- key choices with alternatives and trade-offs.
- `RUNBOOK.md` -- local run + notes.

**Docs-first:** architecture and decisions are the source of truth; code follows.

---

## Goals
- Communicate trade-offs, not just outcomes.
- Show operational and testability considerations.
- Keep each case small, focused, and reviewable in minutes.

## Non-Goals
- This is not a full product, and intentionally avoids heavy infrastructure unless it's the point of the case.
- Not optimizing for completeness; optimizing for clarity and signal.
