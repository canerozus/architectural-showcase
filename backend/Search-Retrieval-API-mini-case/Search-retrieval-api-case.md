# CODE AGENT BRIEF — Architectural Showcase Repo (Search/Retrieval mini-case)

## 0) Amaç / Bağlam
Bu repo bir “ürün” değil; teknik mülakatlarda anlatı gücünü artırmak için hazırlanmış bir **architectural showcase**.  
Hedef: “kullandım” demek yerine **neden seçtim / trade-off / alternatif / risk** anlatısını somutlaştırmak.

Bu showcase’in ilk mini-case’i:
**Backend → Search-Retrieval-API-mini-case (Hybrid Search)**  
Neden ilk case olarak uygun?
- Tek case içinde: katmanlı mimari, ports/adapters, fallback, ölçülebilirlik (evaluation notları), ops odaklı düşünme (health, timeouts, logging) sinyali veriyor.
- Mülakatta 2 dakikada anlatılabilir net bir problem/çözüm var.

---

## 1) Var olan klasörler (Caner localde oluşturdu)
Repo kökü: `architectural-showcase/`
İçerik:
- `README.md`
- `backend/`
- `frontend/`
- `devops/`

İlk mini-case:
- `backend/Search-Retrieval-API-mini-case/`

Bu brief’e göre gereken dosya ve yapıyı oluştur.

---

## 2) Repo seviyesi (root) kurallar ve standartlar

### 2.1 Root README.md’de ne olacak?
**Root README hedefi:** Recruiter/hiring manager 5 dakikada repo’yu gezebilsin.

Root README içeriği (önerilen başlıklar):
1. **What this repo is** (architectural showcase, ürün değil)
2. **How to navigate in 5 minutes**
   - “If you only have 5 minutes, open:”
     - `backend/Search-Retrieval-API-mini-case/README.md`
     - `backend/Search-Retrieval-API-mini-case/ARCHITECTURE.md`
3. **Showcase index**
   - Backend / Frontend / DevOps altında mini-case listesi (şimdilik 1 tane var)
   - Her mini-case için 2 satır:
     - Problem (1 cümle)
     - Signal / what it demonstrates (2–3 bullet)
4. **Conventions**
   - Her mini-case’de: `README.md`, `ARCHITECTURE.md`, `DECISIONS.md` (veya `decisions/`)
   - “Docs first” yaklaşımı: karar + mimari + run path
5. **Repo goals**
   - Trade-off thinking, architecture, operational mindset, testability
6. (Opsiyonel) License / Contact

> Root README “okunma yolu” üzerine kurulu olmalı. Uzun teknik detayı root’a koyma.

---

## 3) Mini-case: Search-Retrieval-API-mini-case

### 3.1 Bu mini-case’in hedefi (net)
- Bir `/v1/search` endpoint’i üzerinden:
  - **Hybrid retrieval** (keyword + vector) + basit **blending**
  - **Fallback**: vector store down ise keyword-only devam
- Operational sinyal:
  - `GET /v1/health`
  - timeouts, structured logging, correlation id (minimal)
- Mimari sinyal:
  - ports/adapters (VectorStore, KeywordIndex)
  - servis orkestrasyonu (SearchService)
  - test edilebilir tasarım (mock adapter + integration test)

### 3.2 Mini-case klasör yapısı (oluşturulacak)
`backend/Search-Retrieval-API-mini-case/`
├─ README.md
├─ ARCHITECTURE.md
├─ DECISIONS.md                      # 0–3 karar varsa tek dosya
│  # (4+ karar olursa decisions/0001-...md formatına geçilebilir)
├─ openapi/
│  └─ openapi.json                   # opsiyonel (export veya generate)
├─ app/
│  ├─ main.py                        # FastAPI init, router mount, lifespan
│  ├─ api/
│  │  └─ v1/
│  │     ├─ routes/
│  │     │  ├─ search.py             # HTTP layer only (request/response)
│  │     │  └─ health.py
│  │     └─ dependencies.py          # request context, auth stub, wiring
│  ├─ core/
│  │  ├─ config.py                   # env parsing
│  │  ├─ logging.py                  # structured log + correlation id
│  │  └─ errors.py                   # shared exceptions
│  ├─ domain/
│  │  ├─ models.py                   # domain entities (Query, Document, etc.)
│  │  ├─ ports.py                    # interfaces: VectorStore, KeywordIndex
│  │  └─ policies.py                 # blending weights, thresholds
│  ├─ services/
│  │  └─ search_service.py           # orchestration: hybrid + fallback
│  ├─ adapters/
│  │  ├─ vector_store_inmemory.py    # basit mock impl (demo)
│  │  └─ keyword_index_inmemory.py   # basit mock impl (demo)
│  └─ dtos/
│     └─ search.py                   # request/response DTO (Pydantic)
├─ tests/
│  ├─ test_health.py                 # integration-ish
│  ├─ test_search_hybrid.py          # happy path
│  └─ test_search_fallback.py        # vector down -> keyword-only
├─ .env.example
├─ pyproject.toml OR requirements.txt
└─ runbook.md                        # çok kısa: local run + prod notes (opsiyonel)

Notlar:
- “repositories/pg…” vs bu ilk iterasyonda şart değil. Şişirme.
- İn-memory adapter’lar demo için yeterli. Port/adapters anlatısını taşır.
- İstersen ikinci iterasyonda Postgres FTS / gerçek vector store adapter eklenebilir ama ilk sürüm minimal kalsın.

---

## 4) Mini-case dokümanları: İçerik şablonları

### 4.1 `backend/Search-Retrieval-API-mini-case/README.md` (1 sayfa, hızlı)
Amaç: 2 dakikada okunup anlaşılacak “giriş”.

Önerilen iskelet:

1) Title + One-liner
- “Hybrid Search Retrieval API (keyword + vector) with fallback”

2) **2-Minute Pitch (5 cümle)**
- Problem
- Kısıtlar (latency/cost/ops)
- Seçim (hybrid + ports/adapters)
- Alternatif neden elendi
- Next improvement

3) **Scope**
- Included: /v1/search, /v1/health, hybrid blending, fallback
- Not included (bilerek): gerçek DB, auth full, UI, ingest pipeline

4) **API Surface**
- `POST /v1/search`
- `GET /v1/health`
(Body örnekleri minimal; kod vermeden JSON örneği verilebilir.)

5) **How to run locally**
- env, install, run komutları (kısa)
- örn: `uvicorn app.main:app --reload`

6) **What to look at (review map)**
- `ARCHITECTURE.md` (diagrams + request flow)
- `DECISIONS.md` (trade-offs)
- `app/domain/ports.py` (interfaces)
- `app/services/search_service.py` (orchestration)

7) **Trade-offs (very short)**
- “Why ports/adapters?”
- “Why fallback?”
- “Why minimal adapters first?”

Keep it short. Detay ARCHITECTURE/DECISIONS’ta.

---

### 4.2 `backend/Search-Retrieval-API-mini-case/ARCHITECTURE.md`
Amaç: “bu sistemi production düşüncesiyle nasıl kurdum?” sorusunu tek dokümanda cevaplamak.
Şişirmeden 2 diagram + net açıklama.

Önerilen iskelet:

1) **Architecture Overview**
- Katmanlar: API → Service → Ports → Adapters
- “Domain owns interfaces”

2) **Diagrams**
A) Sequence Diagram (request flow)
- POST /v1/search
- keyword retrieval
- vector retrieval (timeout/fail -> fallback)
- blend + return

B) Mini C4 / Container-ish Diagram
- Client → API (FastAPI) → SearchService → (KeywordIndex, VectorStore)

> Mermaid kullan. Sadece 2 diyagram yeter.

3) **Request Flow (step-by-step)**
- 1) validate request
- 2) run keyword search
- 3) run vector search with timeout
- 4) blend results (weights)
- 5) fallback rules
- 6) response mapping

4) **Key Components & Responsibilities**
- Route: HTTP concerns only
- DTO: contract
- Service: orchestration
- Ports: stable interfaces
- Adapters: concrete implementations

5) **Failure handling**
- vector down => keyword-only
- both down => return 503 (or defined error)
- timeouts, retries (sadece not olarak)

6) **Operational notes (minimal)**
- correlation id + structured logs
- health endpoint
- timeouts configuration via env

7) **Next improvements**
- evaluation metrics (nDCG/recall@k)
- real adapters (Postgres FTS, real vector DB)
- caching

---

### 4.3 `backend/Search-Retrieval-API-mini-case/DECISIONS.md`
Amaç: “bilinçli karar” sinyali.

Kural:
- 0–3 karar: tek dosya DECISIONS.md
- 4+ karar: `decisions/0001-...md` formatına geçilebilir

DECISIONS.md formatı (her karar 5–8 satır):
- Context
- Decision
- Alternatives considered
- Trade-offs / consequences

Bu mini-case için minimum kararlar:
1) Hybrid retrieval (keyword + vector) seçimi
2) Vector failure fallback stratejisi (timeout + degrade)
3) Blending weights / threshold yaklaşımı (basit kural tabanlı)

---

## 5) Mimari / Teknik seçimler (implementation guidance)

### 5.1 Ports / Adapters
Ports (`app/domain/ports.py`):
- `VectorStore.search(query, k) -> list[DocumentHit]`
- `KeywordIndex.search(query, k) -> list[DocumentHit]`

Adapters (in-memory demo):
- deterministic dataset ile sonuç döndür
- “vector down” senaryosu için controlled failure (env flag veya test override)

Service (`app/services/search_service.py`):
- `search(query, k, mode=hybrid)` gibi
- hybrid: keyword + vector
- blend: basit scoring normalize + weights
- fallback: vector exception/timeout -> keyword-only

### 5.2 API contract
`POST /v1/search`
- input: query, top_k, mode(optional)
- output: results[] (id, title, score, source=keyword|vector|blended), latency_ms, degraded(boolean)

`GET /v1/health`
- ok / degraded info (opsiyonel)

### 5.3 Config / Logging
- `.env.example` ekle: timeout, weights, adapter mode
- correlation id:
  - request header `X-Request-Id` varsa kullan, yoksa üret
- structured log:
  - minimal: request_id, route, latency, degraded

### 5.4 Tests
En az 3 test:
- health 200
- hybrid happy path (keyword + vector blend)
- fallback path (vector fails -> degraded=true + keyword results)

Testler “mülakat sinyali” için önemli; ama çok sayıda test yazma.

---

## 6) Root README.md taslağı (kopyalanabilir içerik)
Başlık: Architectural Showcase

- Purpose: interview-ready architecture + decisions showcase
- How to navigate in 5 minutes
- Index:
  - Backend:
    - Search-Retrieval-API-mini-case — hybrid search + fallback + ports/adapters
  - Frontend: (placeholder)
  - DevOps: (placeholder)
- Conventions
- Notes: This is not a production product, intentionally scoped.

---

## 7) Deliverable Checklist (Code Agent için “Done” kriteri)
- Root:
  - `architectural-showcase/README.md` navigable, index var
- Mini-case:
  - `README.md`, `ARCHITECTURE.md`, `DECISIONS.md` tamam
  - FastAPI app çalışır: /v1/search + /v1/health
  - Fallback senaryosu var ve dokümante
  - 3 minimal test geçiyor
  - `.env.example` mevcut
- Şişirme yok:
  - Gereksiz DB / queue / ingest pipeline ilk sürümde yok
  - Diyagram sayısı 2 ile sınırlı
  - Cross-cutting “production notes” bullet’larla sınırlı

---

## 8) Mermaid diagram metinleri (ARCHITECTURE.md içine kopyala)

A) Sequence (Request Flow)
```mermaid
sequenceDiagram
  participant C as Client
  participant API as FastAPI Route
  participant S as SearchService
  participant K as KeywordIndex (Port)
  participant V as VectorStore (Port)

  C->>API: POST /v1/search (query, top_k)
  API->>S: search(query, top_k)

  S->>K: search(query, top_k)
  K-->>S: keyword_hits

  S->>V: search(query, top_k) (with timeout)
  alt Vector OK
    V-->>S: vector_hits
    S->>S: blend(keyword_hits, vector_hits)
    S-->>API: results + degraded=false
  else Vector fails/timeout
    S->>S: fallback to keyword-only
    S-->>API: results + degraded=true
  end

  API-->>C: 200 OK (results, degraded, latency_ms)

B) Mini C4 (Container-ish)
flowchart LR
  C[Client] --> API[FastAPI API Layer]
  API --> S[SearchService]
  S --> K[KeywordIndex Port]
  S --> V[VectorStore Port]
  K --> KA[Keyword Adapter (in-memory)]
  V --> VA[Vector Adapter (in-memory)]
```
## 9) Uygulama notu (önemli)

Bu brief “docs-first” olduğu için önce dokümanları ve klasörleri üret:

Root README

Mini-case README

ARCHITECTURE + diagrams

DECISIONS
Sonra kod ve test.

Bu sırayla ilerle; böylece repo “mülakat vitrini” gibi durur.