# AstraLedger Master Blueprint

**Save this entire document as `docs/master-blueprint.md`**

---

## 1. Explain AstraLedger Like I Am New to Fintech

**The simple idea first:** When you sell online, money does not move in one step. A customer pays → a payment gateway holds it → the gateway settles to your bank account days later, minus fees and taxes. Along the way, refunds, chargebacks, and adjustments can happen. Each step produces a different report. Those reports often disagree by a few rupees, a few days, or a reference number.

**What breaks:** Finance teams get alerts like “₹50,000 missing from bank” when the money is simply delayed. Or they spend hours matching Order #A123 to Settlement #S456 when the real issue is a recurring T+3 settlement delay from WalletFlow.

**What AstraLedger does:** It is a local app on your computer that:
1. Imports synthetic (fake but realistic) finance files.
2. Matches records using strict rules—not guesswork.
3. Draws a visual trail: Order → Payment → Settlement → Bank Credit.
4. When something breaks, it shows **evidence** (the raw source rows and calculations).
5. Remembers past similar cases.
6. Proposes a **prevention policy** (e.g., “treat WalletFlow credits as pending until T+3”).
7. **Simulates** that policy on history before activating it.
8. Requires a manager to approve before anything changes.
9. Never hides real missing-money risk.

**Think of it as:** A detective for money trails, plus a safety-checked “learn from repeats” system—not just another spreadsheet matcher.

---

## 2. One-Sentence Problem Statement

Finance teams repeatedly investigate the same settlement discrepancies because reconciliation tools flag unmatched records without converting recurring operational failures into evidence-backed, manager-approved prevention policies.

---

## 3. One-Sentence Differentiator Statement

AstraLedger is the only reconciliation workflow in this build that closes the loop from exception → evidence → historical pattern → simulated prevention policy → guarded activation → measured recurrence reduction—without silently suppressing genuine missing-money risk.

---

## 4. MVP Versus Final Showcase Feature Scope

| Area | MVP (10 days) | Final Showcase (5–6 weeks) |
|------|---------------|------------------------------|
| Data | 1 merchant, 2 cycles, synthetic CSVs | 3 merchants, 6+ cycles, richer edge cases |
| Ingestion | CSV upload + basic validation | Mapping studio, re-import, checksums |
| Matching | Deterministic + fuzzy candidates | One-to-many, many-to-one, fee/GST splits |
| Exceptions | Create, view, assign, resolve | DNA profiles, cross-cycle memory |
| Money trail | Static node diagram per case | Interactive trail, timeline, amount panels |
| Patterns | Manual “similar cases” search | Automated recurring-pattern detection |
| Policy simulator | Basic replay + approval | Full guardrails, expiry, rollback, monitoring |
| AI Copilot | Template explanations | Ollama integration + tool schemas |
| Razorpay | Synthetic CSV only | Optional Sandbox adapter |
| Evaluation | Smoke tests on labeled data | Held-out set with documented metrics |
| UI | Clean, functional, narrative headlines | Premium motion, polished demo flow |

---

## 5. Must / Should / Could / Will Not Feature Matrix

| Feature | Priority |
|---------|----------|
| Synthetic CSV ingestion | **Must** |
| Canonical transaction model | **Must** |
| Deterministic matching | **Must** |
| Fuzzy candidate generation (RapidFuzz) | **Must** |
| Exception creation with evidence | **Must** |
| Visual money trail (basic) | **Must** |
| Exception queue + investigation | **Must** |
| Audit log (append-only) | **Must** |
| Prevention policy model + replay | **Must** |
| Manager approval gate | **Must** |
| WalletFlow T+3 flagship scenario | **Must** |
| Local PostgreSQL in Docker | **Must** |
| Core app works without Ollama | **Must** |
| Mapping studio | **Should** |
| Cross-cycle historical memory | **Should** |
| Automated pattern detection | **Should** |
| Exception DNA profiles | **Should** |
| Fee/GST/refund/chargeback validation | **Should** |
| Policy expiry + rollback | **Should** |
| Ollama Copilot | **Should** |
| Held-out evaluation dashboard | **Should** |
| One-to-many / many-to-one matching | **Could** |
| Razorpay Sandbox adapter | **Could** |
| Multi-merchant tenancy | **Could** |
| Export PDF audit pack | **Could** |
| Real-time webhooks | **Could** |
| External LLM APIs | **Will Not** |
| Production payment credentials | **Will Not** |
| AI final match decisions | **Will Not** |
| Silent alert suppression | **Will Not** |
| Cloud-hosted primary database | **Will Not** |
| Auto-activate policies without approval | **Will Not** |

---

## 6. User Roles and Permissions

| Role | Can Do | Cannot Do |
|------|--------|-----------|
| **Finance Analyst** | Upload files, run reconciliation, view exceptions, propose resolutions, draft policy descriptions, request policy simulation | Approve policies, activate policies, modify audit logs, override high-risk matches |
| **Finance Manager** | Everything Analyst can do + approve/reject policies, activate scoped policies, rollback policies, approve high-value exception closures | Modify source records, delete audit entries, bypass simulation |
| **System (deterministic engine)** | Match, validate, create exceptions, compute simulations | Approve, activate, resolve without human gate on high-risk items |
| **AI Copilot (read-only assistant)** | Explain results, summarize queues, suggest root-cause category from fixed list, draft policy text | Match, change amounts, activate, resolve, write to DB |

**Permission model:** Role stored on `users` table. Every sensitive action checks role + writes to `audit_events`. Policies require `finance_manager` role. Exception resolution on `MISSING_MONEY` type requires manager sign-off.

---

## 7. End-to-End User Journey

```
1. SETUP
   Analyst opens local app → Docker Postgres running → seeds synthetic merchant "WalletFlow Demo"

2. INGEST
   Analyst uploads 4 CSVs (orders, payments, settlements, bank credits) for Cycle 2025-01
   → System validates schema → maps columns → stores raw JSONB + canonical rows

3. RECONCILE
   Analyst clicks "Run Reconciliation"
   → Deterministic pass → Fuzzy candidates queued for review
   → Conservation checks (fees, GST, refunds)

4. INVESTIGATE
   Exception queue shows: "₹1,24,500 bank credit missing for Settlement SET-8842"
   Analyst opens case → sees money trail with broken link at Bank Credit
   → Evidence chips show settlement row, expected T+1 vs actual T+3 pattern
   → System finds 12 similar historical cases

5. CLASSIFY
   Analyst selects root cause: SETTLEMENT_DELAY_GATEWAY
   System builds Exception DNA profile

6. PATTERN
   System detects: WalletFlow settlements consistently arrive T+3, not T+1
   → Suggests prevention policy draft

7. SIMULATE
   Analyst runs "Expected Pending Credit (T+3 for WalletFlow)"
   → Replay on 6 historical cycles
   → Shows: 34 alerts → 8 alerts, 0 unsafe suppressions, 2 genuine risks preserved

8. APPROVE
   Manager reviews simulation evidence → Approves policy with 90-day expiry

9. ACTIVATE
   Policy goes live with scope: gateway=WalletFlow, type=bank_credit_pending
   New Cycle 2025-02 imports → fewer false alerts, escalations still fire after T+3

10. MEASURE
    Dashboard shows recurrence rate drop for WalletFlow delay exceptions
    Audit log proves every decision
```

---

## 8. Page/Route Map

### Frontend Routes (Next.js App Router)

| Route | Purpose | Key Interactions |
|-------|---------|------------------|
| `/` | Landing / dashboard | Cycle selector, exception count, recent activity, CTA to reconcile |
| `/cycles` | Reconciliation cycles list | Create cycle, view status, import files |
| `/cycles/[id]` | Cycle detail | Upload CSVs, run reconcile, view match summary |
| `/cycles/[id]/import` | File upload wizard | Drag-drop, validation errors, mapping preview |
| `/mapping` | Mapping studio | Column mapping, save templates, test mapping |
| `/exceptions` | Exception queue | Filter by type/status/owner, bulk assign |
| `/exceptions/[id]` | Investigation workspace | Money trail, evidence, timeline, DNA, similar cases, actions |
| `/exceptions/[id]/trail` | Full-screen money trail | Pan/zoom nodes, broken-link highlight |
| `/policies` | Policy list | Active/expired/draft policies |
| `/policies/[id]` | Policy detail | Scope, simulation results, approval history |
| `/policies/new` | Policy wizard | From pattern → draft → simulate → submit for approval |
| `/policies/[id]/simulate` | Simulation results | Before/after charts, unsafe suppression warnings |
| `/approvals` | Manager approval queue | Approve/reject with comment |
| `/patterns` | Detected patterns | Recurring exception clusters |
| `/audit` | Audit log viewer | Immutable event stream, filters |
| `/evaluation` | Held-out metrics | Precision/recall on labeled set (no invented numbers until you run it) |
| `/settings` | App settings | Ollama URL, roles, merchant config |
| `/copilot` | AI side panel (global) | Context-aware explanations (drawer, not separate page) |

### Backend API Base: `http://localhost:8000/api/v1`

---

## 9. UX Design System and Motion System

### Visual Identity
- **Tone:** Calm, precise, trustworthy—like a premium finance terminal, not a generic admin panel.
- **Palette:** Deep navy (`#0F172A`) background option + warm off-white (`#FAFAF9`) light mode. Accent: amber for warnings, emerald for matched, rose for broken links. Never traffic-light emoji semantics alone.
- **Typography:** `Inter` or `Geist` for UI; `JetBrains Mono` for amounts and IDs.
- **Amounts:** Always `tabular-nums`, right-aligned, `₹` prefix, 2 decimal places.

### Narrative UI Pattern (replace label-value dumps)

**Bad:**
```
Status: Pending | Risk: High | Confidence: 96%
```

**Good:**
```
Headline: "₹1,24,500 still hasn't reached your bank — but WalletFlow usually pays on day 3"
Trail: [Order ₹1,30,000] → [Payment captured] → [Settlement ₹1,24,500] → [Bank: missing]
Evidence chips: [Settlement CSV row 8842] [Expected T+1] [History: 12 similar]
Action panel: [Mark as delayed pending] [Escalate] [Propose T+3 policy]
```

### Components (shadcn/ui + Radix)
- `MoneyTrailGraph` — horizontal node flow with SVG connectors
- `EvidenceChip` — expandable raw source snippet
- `AmountComparisonPanel` — expected vs actual with delta
- `ExceptionHeadline` — one-line narrative
- `TimelineRail` — T+0, T+1, T+3 markers
- `PolicySimulationCard` — before/after bar chart
- `AuditEventRow` — who/when/what immutable

### Motion (Framer Motion)
- Page transitions: 200ms fade + 8px y-shift
- Trail nodes: stagger 50ms on load
- Broken link: subtle pulse on dashed connector (not alarming flash)
- Exception resolve: checkmark draw 300ms
- Policy activation: progress ring, then success state
- **Rule:** Motion communicates state change, never decorates idle screens

### Progressive Disclosure
- Level 1: Headline + trail + primary action
- Level 2: Amount breakdown, timeline
- Level 3: Raw JSONB evidence (collapsed by default)

---

## 10. Frontend Architecture and Folder Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout, Copilot drawer provider
│   ├── page.tsx                # Dashboard
│   ├── cycles/
│   ├── exceptions/
│   ├── policies/
│   ├── mapping/
│   ├── approvals/
│   ├── patterns/
│   ├── audit/
│   ├── evaluation/
│   └── settings/
├── components/
│   ├── ui/                     # shadcn primitives
│   ├── money-trail/            # Trail graph, nodes, connectors
│   ├── exceptions/             # Headlines, evidence, investigation
│   ├── policies/               # Simulator UI, approval cards
│   ├── ingestion/              # Upload, validation display
│   └── copilot/                # AI panel, message bubbles
├── lib/
│   ├── api/                    # Typed fetch wrappers per resource
│   ├── hooks/                  # useCycle, useException, usePolicy
│   ├── types/                  # Shared TS types mirroring API schemas
│   └── utils/                  # formatCurrency, formatDate
├── stores/                     # Zustand or React Context for UI state
└── public/
```

**Key patterns:**
- Server Components for layout/static; Client Components for interactive trail and tables.
- TanStack Table for exception queue and audit log.
- Recharts for simulation before/after.
- API calls via typed `lib/api/*`—no raw fetch in components.
- Copilot is a global drawer; sends context (exception ID, policy ID) to backend.

---

## 11. Backend Architecture and Folder Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI app, CORS, lifespan
│   ├── config.py               # Settings from env
│   ├── api/
│   │   └── v1/
│   │       ├── cycles.py
│   │       ├── ingestion.py
│   │       ├── reconciliation.py
│   │       ├── exceptions.py
│   │       ├── policies.py
│   │       ├── patterns.py
│   │       ├── audit.py
│   │       ├── copilot.py
│   │       └── evaluation.py
│   ├── core/
│   │   ├── security.py         # Role checks
│   │   └── dependencies.py     # DB session, current user
│   ├── models/                 # SQLAlchemy ORM
│   ├── schemas/                # Pydantic request/response
│   ├── services/
│   │   ├── ingestion/
│   │   ├── normalization/
│   │   ├── matching/
│   │   ├── validation/
│   │   ├── exceptions/
│   │   ├── patterns/
│   │   ├── policies/
│   │   ├── copilot/
│   │   └── evaluation/
│   ├── engines/
│   │   ├── deterministic_matcher.py
│   │   ├── fuzzy_candidate.py
│   │   ├── conservation_validator.py
│   │   └── policy_replay.py
│   └── db/
│       ├── session.py
│       └── base.py
├── alembic/
│   └── versions/
├── scripts/
│   ├── seed_synthetic.py
│   └── generate_heldout.py
├── tests/
├── pyproject.toml
└── Dockerfile                  # Optional; dev runs uvicorn directly
```

**Key patterns:**
- Services orchestrate; engines are pure logic (testable without DB).
- Polars for CSV parsing and batch transforms.
- All money in Python `Decimal`, never `float`.
- Engines return structured results; services persist and audit.

---

## 12. Local Docker Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Developer Machine                                       │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │
│  │ Next.js      │───▶│ FastAPI      │───▶│ PostgreSQL │ │
│  │ :3000        │    │ :8000        │    │ :5432      │ │
│  └──────────────┘    └──────┬───────┘    │ (Docker)   │ │
│                             │            └────────────┘ │
│                             ▼                           │
│                      ┌──────────────┐                   │
│                      │ Ollama       │  (optional)       │
│                      │ :11434       │                   │
│                      └──────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

**`docker-compose.yml` (minimal):**
- Service: `postgres` — image `postgres:16`, volume `astraledger_pg_data`, env `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`.
- FastAPI and Next.js run on host in dev (hot reload). Only Postgres in Docker for MVP.

**Env files:**
- `backend/.env` — `DATABASE_URL`, `OLLAMA_BASE_URL=http://localhost:11434`
- `frontend/.env.local` — `NEXT_PUBLIC_API_URL=http://localhost:8000`

**Startup order:** Docker Postgres → Alembic migrate → seed → FastAPI → Next.js → (optional) Ollama pull model.

---

## 13. PostgreSQL Database Design

### ER Diagram (Conceptual)

```
merchants ──┬── reconciliation_cycles ──┬── source_files
            │                           ├── canonical_transactions
            │                           └── match_groups
            │
            ├── exceptions ──┬── exception_evidence
            │                ├── exception_dna
            │                └── exception_links (cross-cycle)
            │
            ├── prevention_policies ──┬── policy_simulations
            │                         └── policy_activations
            │
            ├── detected_patterns
            ├── audit_events (append-only)
            └── users
```

### Core Tables

#### `merchants`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(255) | e.g. "WalletFlow Demo" |
| config | JSONB | settlement expectations, gateway rules |
| created_at | TIMESTAMPTZ | |

#### `users`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| email | VARCHAR(255) UNIQUE | |
| role | user_role ENUM | `analyst`, `finance_manager` |
| display_name | VARCHAR(255) | |

#### `reconciliation_cycles`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| merchant_id | UUID FK → merchants | |
| label | VARCHAR(100) | e.g. "2025-01" |
| period_start | DATE | |
| period_end | DATE | |
| status | cycle_status ENUM | `draft`, `imported`, `reconciled`, `closed` |
| created_at | TIMESTAMPTZ | |

#### `source_files`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| cycle_id | UUID FK | |
| file_type | source_file_type ENUM | `orders`, `payments`, `settlements`, `bank_credits`, `refunds`, `adjustments` |
| filename | VARCHAR(500) | |
| row_count | INTEGER | |
| checksum_sha256 | VARCHAR(64) | |
| column_mapping | JSONB | mapping studio output |
| uploaded_at | TIMESTAMPTZ | |

#### `source_records` (immutable raw)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| source_file_id | UUID FK | |
| row_number | INTEGER | |
| raw_data | JSONB | **immutable** original row |
| imported_at | TIMESTAMPTZ | |

#### `canonical_transactions`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| cycle_id | UUID FK | |
| source_record_id | UUID FK | nullable if synthetic internal |
| txn_type | txn_type ENUM | `order`, `payment`, `settlement`, `bank_credit`, `refund`, `fee`, `gst`, `chargeback`, `adjustment` |
| external_id | VARCHAR(255) | merchant/gateway reference |
| amount | NUMERIC(18,2) | **never float** |
| currency | CHAR(3) | default `INR` |
| txn_date | DATE | |
| gateway | VARCHAR(100) | e.g. `WalletFlow` |
| metadata | JSONB | normalized extras |
| created_at | TIMESTAMPTZ | |

**Index:** `(cycle_id, txn_type)`, `(external_id)`, `(gateway, txn_date)`

#### `match_groups`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| cycle_id | UUID FK | |
| match_type | match_type ENUM | `deterministic`, `fuzzy_approved`, `manual`, `one_to_many`, `many_to_one` |
| status | match_status ENUM | `proposed`, `confirmed`, `rejected` |
| confidence_basis | TEXT | human-readable rule name, not ML score |
| created_by | VARCHAR(50) | `system` or user id |
| created_at | TIMESTAMPTZ | |

#### `match_group_members`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| match_group_id | UUID FK | |
| canonical_transaction_id | UUID FK | |
| role | VARCHAR(50) | `primary`, `fee`, `gst`, `offset` |

#### `fuzzy_candidates`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| cycle_id | UUID FK | |
| left_txn_id | UUID FK | |
| right_txn_id | UUID FK | |
| score | NUMERIC(5,2) | RapidFuzz ratio |
| match_reason | VARCHAR(255) | |
| status | candidate_status ENUM | `pending`, `approved`, `rejected` |

#### `exceptions`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| cycle_id | UUID FK | |
| exception_type | exception_type ENUM | see Section 24 |
| severity | severity ENUM | `low`, `medium`, `high`, `critical` |
| headline | TEXT | narrative summary |
| status | exception_status ENUM | `open`, `investigating`, `pending_policy`, `resolved`, `escalated` |
| root_cause_category | root_cause ENUM | fixed list |
| assigned_to | UUID FK → users | nullable |
| amount_at_risk | NUMERIC(18,2) | |
| created_at | TIMESTAMPTZ | |
| resolved_at | TIMESTAMPTZ | nullable |

#### `exception_evidence`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| exception_id | UUID FK | |
| evidence_type | VARCHAR(100) | `source_row`, `calculation`, `trail_snapshot` |
| payload | JSONB | immutable snapshot |
| created_at | TIMESTAMPTZ | |

#### `exception_dna`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| exception_id | UUID FK UNIQUE | |
| gateway | VARCHAR(100) | |
| pattern_signature | VARCHAR(255) | hash of key attributes |
| attributes | JSONB | structured DNA fields |
| created_at | TIMESTAMPTZ | |

#### `exception_links`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| exception_id | UUID FK | |
| related_exception_id | UUID FK | |
| link_type | VARCHAR(50) | `same_dna`, `same_gateway`, `same_root_cause` |
| similarity_score | NUMERIC(5,2) | |

#### `detected_patterns`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| merchant_id | UUID FK | |
| pattern_type | VARCHAR(100) | |
| description | TEXT | |
| occurrence_count | INTEGER | |
| first_seen_cycle_id | UUID FK | |
| last_seen_cycle_id | UUID FK | |
| attributes | JSONB | |
| status | VARCHAR(50) | `detected`, `policy_proposed`, `resolved` |

#### `prevention_policies`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| merchant_id | UUID FK | |
| name | VARCHAR(255) | |
| description | TEXT | |
| policy_type | policy_type ENUM | `expected_pending_credit`, `fee_tolerance`, `reference_alias`, etc. |
| scope | JSONB | gateway, txn_type, amount range |
| rules | JSONB | structured rule definition |
| status | policy_status ENUM | `draft`, `simulated`, `pending_approval`, `active`, `expired`, `rolled_back` |
| expires_at | TIMESTAMPTZ | nullable |
| created_by | UUID FK | |
| approved_by | UUID FK | nullable |
| approved_at | TIMESTAMPTZ | nullable |

#### `policy_simulations`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| policy_id | UUID FK | |
| cycle_ids | UUID[] | historical cycles replayed |
| alerts_before | INTEGER | |
| alerts_after | INTEGER | |
| unsafe_suppressions | INTEGER | must be 0 to approve |
| genuine_risks_preserved | INTEGER | |
| results | JSONB | per-cycle breakdown |
| simulated_at | TIMESTAMPTZ | |

#### `policy_activations`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| policy_id | UUID FK | |
| activated_at | TIMESTAMPTZ | |
| deactivated_at | TIMESTAMPTZ | nullable |
| reason | TEXT | activation or rollback reason |
| activated_by | UUID FK | |

#### `audit_events` (append-only, no UPDATE/DELETE)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| event_type | VARCHAR(100) | |
| actor_id | UUID FK | nullable for system |
| actor_type | VARCHAR(50) | `user`, `system`, `copilot` |
| entity_type | VARCHAR(100) | |
| entity_id | UUID | |
| payload | JSONB | before/after snapshots |
| created_at | TIMESTAMPTZ | |

**Index:** `(entity_type, entity_id)`, `(created_at DESC)`

### NUMERIC/Decimal Rules
- All money: `NUMERIC(18,2)` in DB, Python `Decimal` in code.
- Comparisons use exact decimal equality with explicit tolerance rules only where documented (e.g. ₹0.01 rounding tolerance for GST).
- Never store paise as integers without documenting it—stick to rupees with 2 decimals for clarity.

### JSONB Usage
- **Allowed:** `raw_data`, `column_mapping`, `metadata`, `evidence.payload`, `policy.scope`, `policy.rules`, `simulation.results`, `audit.payload`.
- **Not allowed:** computed match status, mutable financial amounts, anything that should be queryable/indexed as a primary filter (promote to column instead).

### Audit Immutability
- DB trigger or application rule: `audit_events` has no UPDATE/DELETE grants.
- Source records immutable after import; corrections = new import + new cycle note.

---

## 14. Database Migration Order

| Order | Migration | Depends On |
|-------|-----------|------------|
| 001 | `users`, enums base | — |
| 002 | `merchants` | 001 |
| 003 | `reconciliation_cycles` | 002 |
| 004 | `source_files`, `source_records` | 003 |
| 005 | `canonical_transactions` | 004 |
| 006 | `match_groups`, `match_group_members` | 005 |
| 007 | `fuzzy_candidates` | 005 |
| 008 | `exceptions`, `exception_evidence` | 005 |
| 009 | `exception_dna`, `exception_links` | 008 |
| 010 | `detected_patterns` | 008, 003 |
| 011 | `prevention_policies` | 002 |
| 012 | `policy_simulations` | 011 |
| 013 | `policy_activations` | 011 |
| 014 | `audit_events` + immutability trigger | all |
| 015 | Indexes and constraints pass | all |

---

## 15. REST API Catalog

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Liveness |
| GET/POST | `/merchants` | List/create merchants |
| GET | `/merchants/{id}` | Merchant detail |
| GET/POST | `/cycles` | List/create cycles |
| GET | `/cycles/{id}` | Cycle detail + summary |
| POST | `/cycles/{id}/files` | Upload CSV |
| GET | `/cycles/{id}/files` | List uploaded files |
| POST | `/cycles/{id}/validate` | Validate imports |
| POST | `/cycles/{id}/reconcile` | Run full reconciliation |
| GET | `/cycles/{id}/matches` | Match groups |
| GET | `/cycles/{id}/summary` | Counts: matched, exceptions, pending |
| GET/PUT | `/mapping/templates` | Column mapping templates |
| POST | `/mapping/preview` | Preview mapping on sample rows |
| GET | `/exceptions` | Queue with filters |
| GET | `/exceptions/{id}` | Full investigation payload |
| GET | `/exceptions/{id}/trail` | Money trail graph data |
| PATCH | `/exceptions/{id}` | Update status, assign, root cause |
| POST | `/exceptions/{id}/resolve` | Resolve (role-gated) |
| GET | `/exceptions/{id}/similar` | Cross-cycle similar cases |
| GET/POST | `/fuzzy-candidates` | List/approve/reject |
| GET | `/patterns` | Detected patterns |
| POST | `/patterns/detect` | Run pattern detection job |
| GET/POST | `/policies` | List/create policies |
| GET | `/policies/{id}` | Policy detail |
| POST | `/policies/{id}/simulate` | Run historical replay |
| GET | `/policies/{id}/simulations` | Simulation history |
| POST | `/policies/{id}/submit-approval` | Submit to manager |
| POST | `/policies/{id}/approve` | Manager approve |
| POST | `/policies/{id}/reject` | Manager reject |
| POST | `/policies/{id}/activate` | Activate approved policy |
| POST | `/policies/{id}/rollback` | Rollback active policy |
| GET | `/approvals/pending` | Manager queue |
| GET | `/audit` | Audit log (paginated) |
| POST | `/copilot/chat` | Copilot message with context |
| GET | `/copilot/status` | Ollama available? |
| GET | `/evaluation/metrics` | Held-out evaluation results |
| POST | `/evaluation/run` | Run evaluation job |

---

## 16. Synthetic Source-File Schemas

### `orders.csv`
| Column | Type | Example |
|--------|------|---------|
| order_id | string | ORD-2025-001234 |
| order_date | date | 2025-01-15 |
| gross_amount | decimal | 1500.00 |
| currency | string | INR |
| payment_method | string | UPI |
| status | string | paid |

### `payments.csv`
| Column | Type | Example |
|--------|------|---------|
| payment_id | string | PAY-8844221 |
| order_id | string | ORD-2025-001234 |
| captured_amount | decimal | 1500.00 |
| gateway | string | WalletFlow |
| captured_at | datetime | 2025-01-15T14:32:00 |
| status | string | captured |

### `settlements.csv`
| Column | Type | Example |
|--------|------|---------|
| settlement_id | string | SET-8842 |
| payment_id | string | PAY-8844221 |
| settled_amount | decimal | 1455.00 |
| fee_amount | decimal | 30.00 |
| gst_on_fee | decimal | 5.40 |
| settlement_date | date | 2025-01-18 |
| gateway | string | WalletFlow |
| utr | string | UTREF123456 |

### `bank_credits.csv`
| Column | Type | Example |
|--------|------|---------|
| bank_txn_id | string | BNK-9912 |
| credit_amount | decimal | 145500.00 |
| credit_date | date | 2025-01-19 |
| utr | string | UTREF123456 |
| narration | string | NEFT WalletFlow settlement |
| account_ref | string | ACC-MAIN |

**Note:** Bank credits may be batched (one bank row = many settlements). Ground-truth labels document intended matches.

### `refunds.csv` (Should for final)
| Column | Type | Example |
|--------|------|---------|
| refund_id | string | REF-001 |
| payment_id | string | PAY-8844221 |
| refund_amount | decimal | 500.00 |
| refund_date | date | 2025-01-20 |
| reason | string | customer_request |

### `adjustments.csv` (Could)
| Column | Type | Example |
|--------|------|---------|
| adjustment_id | string | ADJ-001 |
| reference_id | string | SET-8842 |
| amount | decimal | -15.00 |
| type | string | chargeback_fee |
| adjustment_date | date | 2025-01-22 |

---

## 17. CSV Ingestion and Validation Workflow

```
Upload → Parse (Polars) → Schema Check → Column Mapping →
Normalize → Store raw JSONB → Store canonical rows → Validation Report
```

**Steps:**
1. **Upload:** Multipart POST, compute SHA256, reject duplicate checksum in same cycle.
2. **Parse:** Polars read_csv with inferred types; fail on unparseable dates/amounts.
3. **Schema check:** Required columns per file_type; report missing/extra columns.
4. **Mapping:** Apply saved template or mapping studio output; unmapped required columns = blocking error.
5. **Normalize:** Transform to `canonical_transactions`; amounts via `Decimal(str(value))`.
6. **Store raw:** Every row → `source_records.raw_data` (immutable).
7. **Validation report:**
   - Row count
   - Duplicate external IDs
   - Negative amounts where unexpected
   - Date outside cycle period (warning)
   - Empty required fields (error)

**Blocking vs warning:** Errors block reconcile; warnings show in UI but allow proceed with acknowledgment.

---

## 18. Mapping-Studio Design

**Purpose:** Different merchants export different column names. Mapping studio maps source columns → canonical fields without code changes.

**UI flow:**
1. Upload sample file (or use existing import).
2. Left panel: detected source columns + sample values (3 rows).
3. Right panel: canonical field dropdowns (required fields marked).
4. Auto-suggest: string similarity between column names and canonical names (deterministic, not AI).
5. Transform options per field: `direct`, `date_parse`, `amount_parse`, `trim`, `uppercase`.
6. Preview table: 10 mapped rows.
7. Save as template: `{merchant_id, file_type, mapping_json}`.

**Rules:**
- Required canonical fields must be mapped before reconcile.
- Mapping changes do not alter stored raw JSONB; re-normalize creates new canonical rows (version via new import or explicit re-process).

---

## 19. Canonical Transaction Normalization Rules

| Source Type | txn_type | external_id | amount field | date field |
|-------------|----------|-------------|--------------|------------|
| orders | order | order_id | gross_amount | order_date |
| payments | payment | payment_id | captured_amount | captured_at |
| settlements | settlement | settlement_id | settled_amount | settlement_date |
| bank_credits | bank_credit | bank_txn_id | credit_amount | credit_date |
| refunds | refund | refund_id | refund_amount | refund_date |

**Additional rules:**
- `gateway` from payments/settlements; bank credits infer from narration metadata if present.
- `metadata` stores: `order_id`, `payment_id`, `utr`, `fee_amount`, `gst_on_fee`, `fee`, `gst`, `narration`.
- All amounts positive in canonical form; refunds stored as positive `refund` type (sign handled in conservation math).
- Currency default INR; reject multi-currency in MVP unless labeled in synthetic data.

---

## 20. Exact Deterministic Matching Design

**Principle:** Deterministic matches are exact, explainable, and auto-confirmed. No probability.

### Pass Order (sequential)

**Pass 1 — Payment to Order**
- Join: `payment.metadata.order_id == order.external_id`
- Amount: `payment.amount == order.amount` (exact)
- Result: match_group linking payment + order

**Pass 2 — Settlement to Payment**
- Join: `settlement.metadata.payment_id == payment.external_id`
- Amount: `settlement.amount == payment.amount - fee - gst` (computed from metadata fields)
- UTR optional corroboration

**Pass 3 — Bank Credit to Settlement (1:1)**
- Join: `bank_credit.metadata.utr == settlement.metadata.utr` AND amounts equal
- Or: `bank_credit.external_id` referenced in settlement metadata

**Pass 4 — Refund to Payment**
- Join: `refund.metadata.payment_id == payment.external_id`
- Amount: exact

**Unmatched after all passes → exception candidates** (type assigned by what's missing in chain).

**Every match records:** `match_type=deterministic`, `confidence_basis="rule:payment_order_exact_id_amount"`.

---

## 21. Safe Fuzzy Candidate-Matching Design

**Principle:** Fuzzy matching **never** auto-confirms. It only creates `fuzzy_candidates` for human review.

**Tool:** RapidFuzz `fuzz.ratio` and `fuzz.partial_ratio` on normalized strings only.

**Candidate generation rules (all must pass gates):**

| Gate | Rule |
|------|------|
| Amount gate | Absolute diff ≤ ₹1.00 OR relative diff ≤ 0.1% |
| Date gate | Dates within 7 days |
| Type gate | Only compatible pairs (settlement↔bank_credit, payment↔settlement) |
| Score gate | RapidFuzz ≥ 85 on normalized reference fields |

**Normalized fields:** Strip prefixes (`ORD-`, `PAY-`), uppercase, remove hyphens.

**Output:** `fuzzy_candidates` row with `score`, `match_reason` (e.g. "utr_partial_match"). Analyst approves → creates `match_group` with `match_type=fuzzy_approved`. Rejected → logged in audit, no match.

**Prohibited:** Fuzzy match across different gateways without explicit rule. Fuzzy match when conservation check fails.

---

## 22. One-to-Many and Many-to-One Matching Design

**Common case:** One bank credit = sum of multiple settlements (batch NEFT).

### Many-to-One (settlements → bank credit)
1. Group settlements by `utr` + `settlement_date` window.
2. Sum `settled_amount` per group.
3. Find bank_credit where `amount == sum` and `utr` matches and date within T+1 to T+5 window.
4. If exact sum match → `match_type=many_to_one`, status `proposed` (analyst confirm for MVP; auto-confirm only if labeled in ground truth for evaluation).

### One-to-Many (settlement → fees + GST + net bank)
1. Settlement already carries `fee_amount` and `gst_on_fee` in metadata.
2. Validation creates virtual fee/gst canonical rows or uses metadata in conservation check.
3. Match group contains: settlement + fee + gst → net = bank credit amount.

**UI:** Trail shows fan-in/fan-out nodes with sum annotation on connector.

---

## 23. Fee/GST/Refund/Chargeback/Conservation Validation Design

**Conservation law (per payment chain):**
```
Payment Amount
  = Settlement Amount + Fee + GST on Fee + Refunds + Chargebacks + Adjustments
```

**Validation engine (runs after matching):**
1. For each matched payment chain, compute expected vs actual.
2. Tolerance: ₹0.01 for rounding only.
3. Mismatch → exception type `AMOUNT_MISMATCH` with calculation breakdown in evidence.

**Fee/GST:**
- Read from settlement metadata (not invented).
- GST = 18% of fee in synthetic data (document in generator config).

**Refunds:**
- Reduce expected settlement; unmatched refund → `UNMATCHED_REFUND` exception.

**Chargebacks:**
- Adjustment row or negative settlement; type `CHARGEBACK` exception if unexplained.

**Conservation report:** Per-cycle summary stored in reconciliation result JSON for Copilot explanation.

---

## 24. Exception Taxonomy

### `exception_type` ENUM

| Type | Meaning |
|------|---------|
| `MISSING_BANK_CREDIT` | Settlement matched, no bank credit in expected window |
| `MISSING_SETTLEMENT` | Payment captured, no settlement |
| `MISSING_PAYMENT` | Order paid status, no payment record |
| `AMOUNT_MISMATCH` | Linked records exist, amounts don't conservation-check |
| `UNMATCHED_BANK_CREDIT` | Bank credit with no settlement |
| `UNMATCHED_SETTLEMENT` | Settlement with no payment |
| `DUPLICATE_IMPORT` | Same external_id imported twice |
| `DELAYED_SETTLEMENT` | Settlement exists but outside merchant expectation (informational → may pair with policy) |
| `REFUND_MISMATCH` | Refund doesn't match payment chain |
| `FEE_ANOMALY` | Fee/GST outside configured rules |

### `root_cause` ENUM (fixed list for AI + manual)
- `SETTLEMENT_DELAY_GATEWAY`
- `BATCHED_BANK_CREDIT`
- `FEE_RULE_CHANGE`
- `REFERENCE_FORMAT_MISMATCH`
- `DUPLICATE_FILE_IMPORT`
- `REFUND_TIMING_LAG`
- `DATA_MAPPING_ERROR`
- `GENUINE_MISSING_MONEY`
- `UNKNOWN`

### `severity`
- `critical`: unmatched bank debit or confirmed money loss
- `high`: missing bank credit past policy window
- `medium`: amount mismatch
- `low`: delay within policy window, format issues

---

## 25. Exception DNA and Investigation Design

### Exception DNA
A structured fingerprint stored in `exception_dna.attributes`:
```json
{
  "gateway": "WalletFlow",
  "exception_type": "MISSING_BANK_CREDIT",
  "amount_bucket": "100000-150000",
  "days_since_settlement": 2,
  "utr_present": true,
  "settlement_to_bank_delta_days": null,
  "root_cause_category": "SETTLEMENT_DELAY_GATEWAY"
}
```

`pattern_signature` = SHA256 of normalized key fields (gateway + type + root_cause + amount_bucket).

### Investigation Workspace Layout
1. **Headline** (narrative)
2. **Money trail** (interactive)
3. **Amount comparison panel**
4. **Timeline** (T+0 order → T+1 expected → T+3 actual)
5. **Evidence chips** (expandable raw rows)
6. **DNA card** (structured attributes)
7. **Similar cases** (linked via `exception_links`)
8. **Action panel** (assign, classify root cause, propose policy, escalate, resolve)

**Resolution rules:**
- `GENUINE_MISSING_MONEY` → only manager can resolve
- `SETTLEMENT_DELAY_GATEWAY` → can mark "pending under policy" if active policy covers it
- Every resolution requires reason text → audit event

---

## 26. Cross-Cycle Historical-Memory Design

**Goal:** When investigating Cycle 2025-03 exception, surface related cases from 2025-01, 2025-02.

**Mechanism:**
1. On exception creation, compute `exception_dna.pattern_signature`.
2. Query `exception_dna` + `exceptions` across all cycles for same `merchant_id`.
3. Score similarity:
   - Same `pattern_signature` → 100% link
   - Same gateway + type → 80%
   - Same root_cause → 70%
4. Store top 10 in `exception_links`.
5. UI section: "This happened before" with cycle label, resolution outcome, active policy if any.

**No ML embedding** — deterministic signature matching only for MVP.

---

## 27. Pattern-Detection Design

**Input:** All `exception_dna` rows for merchant, last N cycles.

**Rules (deterministic):**
1. **Recurrence:** Same `pattern_signature` appears ≥ 3 times → `detected_patterns` row.
2. **Gateway delay:** For `MISSING_BANK_CREDIT` + gateway X, compute median `settlement_to_bank_delta_days` from resolved cases; if median ≥ 2 and stdev low → suggest `expected_pending_credit` policy.
3. **Fee drift:** Fee % changes > 0.5% from historical median → `FEE_RULE_CHANGE` pattern.

**Output:** `detected_patterns` with `description`, `occurrence_count`, link to example exceptions, CTA "Draft policy from pattern".

**Schedule:** On-demand button in MVP; auto-run after reconcile in final showcase.

---

## 28. Prevention Policy Simulator

### Policy Model (`prevention_policies.rules` JSON)
```json
{
  "policy_type": "expected_pending_credit",
  "gateway": "WalletFlow",
  "pending_window_days": 3,
  "applies_to_exception_types": ["MISSING_BANK_CREDIT"],
  "escalate_after_window": true,
  "never_suppress_severity": ["critical"]
}
```

### Replay Algorithm
```
For each historical cycle C in simulation set:
  Run reconciliation engine on C WITHOUT policy → count exceptions E_before
  Run reconciliation engine on C WITH policy applied → count E_after
  For each suppressed alert:
    Check if ground_truth labels it as genuine_missing_money
    If yes → mark UNSAFE_SUPPRESSION (blocking)
  For each remaining critical exception → count GENUINE_RISKS_PRESERVED
Return simulation summary
```

### Outcomes Displayed
- Alerts before / after (per cycle + total)
- Alert reduction count and percentage
- Money impact: sum of `amount_at_risk` for suppressed vs preserved
- Unsafe suppressions: **must be 0** for approval
- Genuine risks preserved: count
- List of exceptions that would still fire after policy window

### Guardrails
- Policy cannot suppress `critical` severity
- Policy cannot suppress exceptions labeled `GENUINE_MISSING_MONEY` in ground truth (evaluation) or manually escalated
- `unsafe_suppressions > 0` → approval button disabled

### Approval Flow
1. Analyst drafts policy → runs simulation
2. Submits for approval with simulation ID attached
3. Manager reviews simulation evidence + affected exception examples
4. Approve → status `pending_approval` → `active`
5. Reject → back to `draft` with comment

### Scope
- `scope` JSON: `merchant_id`, `gateway`, `exception_types`, optional `amount_min/max`
- Policy applies only to matching scope

### Expiry
- `expires_at` required for MVP (default 90 days)
- Cron check on app load: expired → status `expired`, audit event

### Rollback
- Manager clicks rollback → `policy_activations.deactivated_at` set, status `rolled_back`
- Exceptions previously marked "pending under policy" revert to `open` if still unresolved

### Monitoring
- Dashboard widget: active policies, exceptions suppressed this cycle, escalations post-window
- Weekly recurrence count per pattern (manual view in MVP)

---

## 29. Local AI Copilot Design

### Ollama Setup Role
- Optional service at `http://localhost:11434`
- Recommended model: small instruct model (e.g. `llama3.2:3b` or `mistral:7b`)—you choose based on your machine
- `GET /copilot/status` checks Ollama reachability

### Three Modes
1. **Deterministic-only:** No Copilot UI explanations beyond template strings.
2. **Template mode:** Backend fills Jinja-style templates from structured data.
3. **Local-AI mode:** Ollama generates prose from provided context JSON.

### Structured Tool Schemas (AI receives, cannot invent)
Copilot endpoint accepts:
```json
{
  "context_type": "exception | policy_simulation | queue_summary | mapping_help",
  "entity_id": "uuid",
  "verified_facts": { ... },
  "allowed_root_causes": [ ... enum list ... ],
  "user_question": "string"
}
```

Backend builds prompt:
- System: "You may only use verified_facts. Do not invent amounts, dates, or matches."
- User question
- Response: markdown explanation

### Privacy Boundaries
- No raw DB access from Copilot
- Backend queries data, passes minimal verified_facts
- No PII in synthetic data anyway; still minimize context sent to model

### Prohibited Actions (enforced in API, not prompt-only)
- Copilot has no POST endpoints for match, resolve, approve, activate
- `actor_type=copilot` in audit only for `explanation_generated` events

### Fallback
- If Ollama down → auto-fallback to template mode
- UI badge: "Local AI unavailable — showing rule-based explanation"

### AI UI
- Right drawer, 400px
- Suggested prompts: "Explain this exception", "Summarize my queue", "Explain simulation results"
- Responses cite evidence chip IDs as clickable links

---

## 30. Optional Razorpay Sandbox Adapter

**Scope:** Optional, backend-only, not required for demo.

**Design:**
- Env vars: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (test mode only)
- Never commit keys; `.env` in gitignore
- Endpoints: `POST /integrations/razorpay/fetch-settlements` → transforms API response to `settlements.csv` equivalent → normal ingestion pipeline
- Webhook plan (Could): `POST /webhooks/razorpay` → verify signature → store raw JSONB → normalize
- Fallback: if keys missing or API error → UI message "Use synthetic CSV import instead"
- No live mode, no production keys, no real money

---

## 31. Synthetic-Data Generator and Ground-Truth Plan

### Generator (`scripts/seed_synthetic.py` + `generate_heldout.py`)

**Produces per cycle:**
- orders, payments, settlements, bank_credits CSVs
- `ground_truth.json`:
  - `intended_matches`: [{left_id, right_id, match_type}]
  - `intended_exceptions`: [{type, external_id, root_cause, is_genuine_missing_money}]
  - `policy_evaluation_labels`: which exceptions should be suppressed by T+3 policy safely

### Scenario Mix (WalletFlow demo)
- 70% on-time T+3 bank credits (merchant expects T+1 → false missing alerts)
- 20% batched bank credits (many-to-one)
- 10% genuine issues (amount mismatch, truly missing credit after T+5)

### Ground-Truth Rules
- Every exception in synthetic data has a known `root_cause`
- `is_genuine_missing_money: true` flagged explicitly for evaluation
- Held-out cycles (2 cycles) generated separately, never used during policy tuning

### Label Integrity
- Version ground truth with generator seed
- Commit ground truth JSON alongside synthetic CSVs in `data/synthetic/` and `data/heldout/`

---

## 32. Held-Out Evaluation Plan and Metrics

**Protocol:**
1. Split: 4 cycles train/demo, 2 cycles held-out (fixed seed).
2. Run reconciliation on held-out without policy → baseline exceptions.
3. Run with T+3 policy → post-policy exceptions.
4. Compare to `ground_truth.json`.

**Metrics (compute from your run—do not invent numbers):**

| Metric | Definition |
|--------|------------|
| Match precision | Correct matches / total system matches |
| Match recall | Correct matches / total intended matches |
| Exception precision | Correct exception types / total exceptions raised |
| False alert rate | False `MISSING_BANK_CREDIT` / total alerts |
| Unsafe suppression rate | Genuine missing money suppressed / total genuine |
| Policy alert reduction | (Alerts before - Alerts after) / Alerts before |
| Recurrence detection | Patterns found / patterns in ground truth |

**Output:** `/evaluation` page table + JSON export. Document seed and date of run in README.

---

## 33. Testing Plan

| Layer | What | Tool |
|-------|------|------|
| Engine unit tests | Deterministic matcher, conservation, policy replay | pytest |
| Service tests | Ingestion, exception creation | pytest + test DB |
| API tests | Critical endpoints, role gates | httpx + pytest |
| Golden-file tests | Synthetic cycle → expected match count | pytest |
| Frontend component tests | Money trail renders, amount format | Vitest + RTL |
| E2E smoke | Upload → reconcile → view exception | Playwright (1 flow, final week) |
| Policy safety tests | Unsafe suppression must block approval | pytest (mandatory) |
| Evaluation regression | Held-out metrics don't degrade | pytest script |

**Priority for MVP:** Engine unit tests + one golden-file test for WalletFlow scenario.

---

## 34. Privacy/Security/Financial-Safety Checklist

- [ ] No external LLM API keys in repo or runtime
- [ ] `.env` gitignored; example `.env.example` with placeholders only
- [ ] PostgreSQL not exposed beyond localhost
- [ ] CORS restricted to `localhost:3000` in dev
- [ ] Role checks on approve, activate, rollback, critical resolve
- [ ] Audit log append-only
- [ ] Source records immutable
- [ ] Fuzzy matches never auto-confirm
- [ ] Policy cannot approve with unsafe_suppressions > 0
- [ ] No silent exception dismissal
- [ ] All money as Decimal/NUMERIC
- [ ] Synthetic data only in repo
- [ ] Razorpay test keys backend-only if used
- [ ] Copilot cannot write financial state
- [ ] File upload size limits and CSV-only validation
- [ ] No stack traces to frontend in production build

---

## 35. 10-Day MVP Plan

| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1 | Docker Postgres, FastAPI skeleton, Alembic 001-005 | DB running, health endpoint |
| 2 | CSV ingestion + normalization | Upload orders/payments CSVs, view canonical rows |
| 3 | Deterministic matching Pass 1-3 | Match groups API, basic summary |
| 4 | Exception creation + evidence | Exception queue API |
| 5 | Next.js shell + dashboard + cycle pages | Upload UI works end-to-end |
| 6 | Exception investigation page + basic trail | Static trail SVG |
| 7 | Fuzzy candidates + conservation validation | Candidate review UI |
| 8 | Prevention policy model + replay (basic) | Simulate T+3 on 2 cycles |
| 9 | Manager approval + audit log | Approve flow works |
| 10 | WalletFlow demo polish + seed data + smoke test | Recordable demo path |

---

## 36. 5–6 Week Final Build Plan

| Week | Focus |
|------|-------|
| 1 | MVP complete (above) |
| 2 | Mapping studio, all file types, refunds, fee/GST validation |
| 3 | Exception DNA, cross-cycle memory, pattern detection |
| 4 | Full policy simulator guardrails, expiry, rollback, monitoring |
| 5 | Premium UI polish, Framer Motion, Ollama Copilot, narrative headlines |
| 6 | Held-out evaluation, E2E tests, optional Razorpay adapter, demo deploy, submission |

---

## 37. Exact Sequence of 25 Build Tasks

| # | Task | Goal | Dependencies | Acceptance Criteria | Do NOT Build Yet |
|---|------|------|--------------|---------------------|------------------|
| 1 | Docker Postgres + compose | Local DB | — | `psql` connects on 5432 | App code |
| 2 | FastAPI project skeleton | API foundation | 1 | `/health` returns 200 | Business logic |
| 3 | Alembic migrations 001-005 | Core tables | 1, 2 | migrate head succeeds | Matching |
| 4 | Merchant + cycle CRUD | Data containers | 3 | Create/list cycles via API | CSV |
| 5 | CSV upload endpoint | File intake | 4 | File stored, checksum saved | Matching |
| 6 | Polars parse + validation | Row validation | 5 | Validation report returned | UI |
| 7 | Normalization service | Canonical rows | 6 | Rows in `canonical_transactions` | Matching |
| 8 | Deterministic matcher P1-P2 | Order-payment-settlement | 7 | Match groups created | Fuzzy |
| 9 | Deterministic matcher P3 | Bank credit 1:1 | 8 | Bank matches by UTR | Many-to-one |
| 10 | Exception engine | Unmatched → exceptions | 8, 9 | Exceptions with evidence | UI |
| 11 | Next.js app + API client | Frontend shell | 2 | Dashboard renders | Trail |
| 12 | Cycle upload UI | Analyst upload flow | 5, 11 | Upload 4 files, see validation | Mapping studio |
| 13 | Reconcile button + summary | Trigger backend | 10, 12 | Summary counts display | Policy |
| 14 | Exception queue page | List exceptions | 10, 11 | Filterable table | Investigation |
| 15 | Investigation page v1 | View one exception | 14 | Headline + evidence chips | Motion |
| 16 | Money trail component v1 | Visual trail | 15 | 4 nodes, broken link styled | Interactivity |
| 17 | Fuzzy candidate generation | RapidFuzz candidates | 10 | Pending candidates API | Auto-confirm |
| 18 | Conservation validator | Fee/GST checks | 8 | AMOUNT_MISMATCH exceptions | Refunds |
| 19 | Synthetic data seed script | Demo data | 7 | WalletFlow 2 cycles seeded | Held-out |
| 20 | Policy model + replay engine | Simulate T+3 | 10, 19 | Simulation JSON with before/after | Approval UI |
| 21 | Approval workflow | Manager gate | 20, 3 | Approve/reject updates status | Activation |
| 22 | Policy activation + audit | Live policy | 21 | Active policy affects new reconcile | Rollback |
| 23 | Exception DNA + similar cases | Cross-cycle links | 10, 19 | Similar cases shown | Pattern auto-detect |
| 24 | Ollama Copilot OR template mode | Explanations | 15 | Explain exception without Ollama | External AI |
| 25 | Held-out evaluation endpoint | Metrics | 19, 20 | Metrics JSON from held-out run | Razorpay |

---

## 38. Git Commit Strategy

**Branch model:**
- `main` — stable, demo-ready
- `feat/<area>` — short-lived feature branches

**Commit message format:**
```
type(scope): short description

feat(ingestion): add CSV validation for settlements
fix(matcher): correct UTR normalization
test(policy): block approval on unsafe suppression
docs(blueprint): add prevention simulator section
```

**Rules:**
- One logical change per commit
- Migrations always in their own commit
- Never commit `.env`, secrets, or real data
- Tag `v0.1-mvp` after day 10, `v1.0-demo` before submission

---

## 39. Local Setup Checklist

- [ ] Install Docker Desktop
- [ ] Install Python 3.11+
- [ ] Install Node.js 20+
- [ ] Clone repo
- [ ] `docker compose up -d` (Postgres)
- [ ] `cd backend && pip install -e .` (or poetry)
- [ ] Copy `backend/.env.example` → `.env`
- [ ] `alembic upgrade head`
- [ ] `python scripts/seed_synthetic.py`
- [ ] `uvicorn app.main:app --reload`
- [ ] `cd frontend && npm install`
- [ ] Copy `frontend/.env.local.example` → `.env.local`
- [ ] `npm run dev`
- [ ] Open `http://localhost:3000`
- [ ] (Optional) Install Ollama, `ollama pull <model>`, verify `http://localhost:11434`

---

## 40. Final Demo Deployment Strategy

**Recommended:** Local demo on your laptop (buildathon judging often accepts screen recording).

**If remote demo needed:**
- Frontend: Vercel free tier (static + serverless) — **but** backend and Postgres must stay local OR use a single VPS you control
- Simpler approach: Record a 5-minute Loom/OBS demo; submit repo + recording
- Docker Compose bundle: `docker compose -f docker-compose.demo.yml` with Postgres + FastAPI; frontend static build served by FastAPI — one-command for judges

**Do not:** Deploy real financial data to cloud. Use synthetic only.

**Demo package:**
1. GitHub repo link
2. README with setup steps
3. Pre-seeded `docker compose up` script
4. 5-minute video walkthrough

---

## 41. README Outline

```markdown
# AstraLedger
> See where money broke. Prove why. Prevent it next time.

## What it does (3 sentences)
## Flagship demo scenario (WalletFlow T+3)
## Screenshots / GIF
## Quick start (Docker, backend, frontend)
## Synthetic data explanation
## Architecture overview (diagram link)
## AI Copilot (local Ollama, optional)
## Prevention Policy Simulator explanation
## Evaluation methodology (held-out, no fabricated metrics)
## Security & privacy
## Razorpay Sandbox (optional)
## Development roadmap
## License
## Buildathon track declaration
```

---

## 42. Five-Minute Pitch/Demo Script

| Time | Action | Say |
|------|--------|-----|
| 0:00 | Dashboard | "This is AstraLedger—settlement intelligence that doesn't just flag problems, it learns how to prevent them." |
| 0:30 | Show Cycle 2025-01 summary | "We imported orders, payments, settlements, and bank credits for WalletFlow Demo." |
| 1:00 | Exception queue | "14 exceptions—including repeated 'Missing Bank Credit' alerts." |
| 1:30 | Open one exception | "₹1,24,500 hasn't reached the bank—but look at the trail: order, payment, settlement are all matched. Only the bank link is broken." |
| 2:00 | Evidence + timeline | "The settlement happened on Jan 18. Merchant expected T+1. History shows 12 similar cases—all arrived on T+3." |
| 2:30 | Similar cases + pattern | "This isn't a one-off. It's a recurring WalletFlow delay pattern." |
| 3:00 | Policy wizard | "AstraLedger proposes an Expected Pending Credit policy: wait T+3 before alerting for WalletFlow." |
| 3:30 | Simulation results | "Replayed on 4 historical cycles: 34 false alerts drop to 8. Zero unsafe suppressions. Genuine missing-money cases still escalate." |
| 4:00 | Manager approval | "Finance manager reviews evidence, approves with 90-day expiry." |
| 4:20 | New cycle import | "Cycle 2025-02: fewer false alerts. Day-4 missing credit still fires correctly." |
| 4:40 | Audit + Copilot | "Every action is audited. Copilot explains the math—locally, no data leaves the machine." |
| 4:55 | Close | "AstraLedger: see where money broke, prove why, prevent it next time." |

---

## 43. Architecture Diagram Plan

Create one diagram (Excalidraw/draw.io) with 4 layers:

```
┌─────────────────────────────────────────────┐
│ PRESENTATION: Next.js, Trail, Copilot Drawer│
├─────────────────────────────────────────────┤
│ API: FastAPI routes, auth, audit middleware │
├─────────────────────────────────────────────┤
│ ENGINES: Matcher, Validator, Policy Replay  │
│          Pattern Detector, Fuzzy Candidates │
├─────────────────────────────────────────────┤
│ DATA: PostgreSQL (canonical + JSONB raw)    │
│       Synthetic CSVs + Ground Truth         │
└─────────────────────────────────────────────┘
        Optional sidecar: Ollama :11434
```

**Include arrows:**
- CSV → Ingestion → Canonical → Matcher → Exceptions
- Exceptions → DNA → Patterns → Policy → Simulation → Approval → Activation
- Copilot reads from API only (dashed line, read-only)

Save as `docs/architecture-diagram.png` in week 2.

---

## 44. Ten "What Crashed and How We Fixed It" Experiments

| # | Experiment | Likely Crash | Fix |
|---|------------|--------------|-----|
| 1 | Match with float amounts | 0.1 + 0.2 ≠ 0.3 | Decimal everywhere |
| 2 | Import same CSV twice | Duplicate chaos | SHA256 checksum reject |
| 3 | Fuzzy auto-confirm | Wrong matches | Candidates only, human approve |
| 4 | Policy suppresses real missing money | Unsafe approval | Ground-truth check in replay |
| 5 | Ollama not running | Copilot 500 error | Template fallback |
| 6 | Large CSV (10k rows) | Timeout | Polars lazy scan, batch insert |
| 7 | UTR case mismatch | No deterministic match | Normalize uppercase strip spaces |
| 8 | Batched bank credit | 1:1 matcher fails | Many-to-one pass |
| 9 | Alembic enum change | Migration fail | New enum value migration pattern |
| 10 | CORS in dev | Frontend can't fetch | FastAPI CORSMiddleware localhost |

Run each intentionally in dev; document in `docs/decision-log.md`.

---

## 45. Final Buildathon Submission Checklist

- [ ] GitHub repo public (or submission-accessible)
- [ ] README complete with setup steps
- [ ] Synthetic data included, no real PII
- [ ] Local setup works from clean clone (test on fresh machine or VM)
- [ ] WalletFlow T+3 scenario demonstrable in < 5 minutes
- [ ] Prevention policy simulator with approval flow shown
- [ ] Audit log visible
- [ ] AI Copilot works in template mode minimum
- [ ] Architecture diagram in docs
- [ ] Demo video recorded
- [ ] Track 04 (AI Finance Controller) stated in README
- [ ] Privacy policy aligned with `docs/privacy-and-data-policy.md`
- [ ] No external API keys required to run core demo
- [ ] Held-out evaluation script runnable (metrics from your run)
- [ ] License file present
- [ ] `.env.example` files provided

---

## A. My Immediate Next Action

**Today:** Save this document as `docs/master-blueprint.md`, then complete **Build Task #1 only**—create `docker-compose.yml` with PostgreSQL 16, verify you can connect with `psql` or a GUI, and add `backend/.env.example` with `DATABASE_URL`. Do not start FastAPI or Next.js until Postgres is confirmed healthy.

---

## B. Claude Handoff Prompt

Copy this into Claude as your daily teacher:

```
You are my AstraLedger build mentor. I am a student building this myself.

Read docs/master-blueprint.md as the single source of truth.
Also respect: docs/product-brief.md, docs/problem-and-differentiation.md,
docs/privacy-and-data-policy.md, docs/decision-log.md.

Rules for every session:
1. Teach one build task at a time from Section 37 (25 tasks).
2. Before code, explain the concept in simple language, then technical detail.
3. Never invent metrics, test results, or compliance claims.
4. Never use external LLM APIs—all AI is local Ollama or templates.
5. Never let fuzzy matching auto-confirm; never let policies suppress genuine missing-money risk.
6. All money uses Decimal/NUMERIC, never float.
7. Show me file paths, function names, and acceptance criteria—let me type the code.
8. Keep responses focused; ask which task number I'm on today.

Today I am on Task #__: [fill in].
My blocker is: [fill in].

Guide me step by step. Do not write the entire file for me unless I ask.
Review my code when I paste it.
```

---

## C. Cursor Usage-Saving Advice

1. **One task per Cursor session** — Start each session with "Task #N from master-blueprint" so the agent stays scoped.
2. **Paste blueprint section, not whole doc** — Reference "Section 20 deterministic matching" instead of re-uploading everything.
3. **Use Claude for teaching, Cursor for targeted edits** — Learn the concept in Claude; open Cursor only when you know the exact file to change.
4. **Ask for review, not generation** — "Review my `deterministic_matcher.py` against Section 20" uses fewer tokens than "build the matcher."
5. **Keep a `PROGRESS.md`** — 10 lines: task done, blockers, next. Agents won't re-explore the repo.
6. **Pin decision log updates** — Append to `docs/decision-log.md` yourself; don't re-debate settled choices in chat.
7. **Use `@file` references** — Point Cursor at one file, not the whole codebase.
8. **Disable Agent for planning** — Use Ask/plan mode for questions; Agent only for implementation.
9. **Batch small questions** — Collect 3 questions, one message, instead of 3 sessions.
10. **Pre-seed synthetic data early (Task 19)** — Unblocks UI work without waiting for full matching polish.

---

This blueprint aligns with your existing docs in `docs/product-brief.md`, `docs/problem-and-differentiation.md`, `docs/privacy-and-data-policy.md`, and `docs/decision-log.md`. Save it as `docs/master-blueprint.md` and start Task #1 when you're ready.