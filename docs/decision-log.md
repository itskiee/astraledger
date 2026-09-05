# Decision Log

## Decision 001 — Track
Track 04: AI Finance Controller.

## Decision 002 — Product Name
AstraLedger.

## Decision 003 — Product Differentiation
Evidence-First Prevention Policy Simulator with Guarded Prevention.

## Decision 004 — Primary Scenario
Recurring late settlements from WalletFlow:
T+1 expectation versus recurring T+3 bank-credit arrival.

## Decision 005 — Data
Synthetic labeled data for core demo and held-out evaluation.

## Decision 006 — Privacy
Local-first architecture.
No external AI API keys.
No cloud LLM dependency.

## Decision 007 — AI
Use optional local AI through Ollama.
System must also work without Ollama.

## Decision 008 — Database
Local PostgreSQL through Docker.
Use NUMERIC/Decimal for money.
Use JSONB only for raw/variable source data and evidence snapshots.

## Decision 009 — Financial Safety
Deterministic backend rules are source of truth.
Fuzzy matching creates candidates only.
Human review is mandatory for high-risk cases.

## Decision 010 — Razorpay
Use synthetic Razorpay-compatible reports by default.
Optional Razorpay Test Mode/Sandbox integration later.

## Decision 011 — Master Blueprint is the primary specification

All table names, column definitions, enums, indexes, route names, matching design, and safety rules come from docs/master-blueprint.md.

## Decision 012 — Final Plan is a supplement, not a competitor

The Final Plan is used only where the blueprint is silent or thin. Specifically it contributes:

UI wording — "Where is today's money?", "Money Trails That Need Attention", story-card copy
Three named users — Aarav Mehta (analyst), Nisha Kapoor (finance manager), System Admin
Extra tables the blueprint lacks — import_jobs, column_mappings, exception_comments, review_tasks, policy_approvals, policy_observations
Extra exception types — fee_mismatch, gst_mismatch, partial_settlement, ambiguous_match, invalid_source_data, chargeback_deduction
The landing page — Step 9, which the blueprint has no equivalent of
The 5-minute demo script — Step 32
Optional public deployment — Step 31

Where they conflict on anything else, the blueprint wins.

## Decision 013 — Real authentication with role-based access control

Not a demo switcher. Requirements:

Passwords hashed with bcrypt or argon2. Plain text passwords never touch the database or a log.
Login endpoint issues a signed JWT access token, delivered in an HttpOnly, SameSite=Lax cookie so browser JavaScript cannot read it.
A user_sessions table so logout genuinely revokes, and so audit events can reference a session.
Every protected endpoint validates the token server-side. Role checks run on the server, never in the browser.
Roles from Blueprint Section 6: analyst, finance_manager. Add admin from Final Plan Step 12.
Frontend gets a /login page and a route guard.
Sessions expire. Default 8 hours.

Documented limit: no email verification, no password reset flow, no MFA, no OAuth. Those are out of scope, and the README says so plainly. Everything present is real; nothing pretends to be more than it is.

## Decision 014 — Route structure

The blueprint puts the dashboard at /. You need a landing page there instead, so the application moves under a prefix:

/                          landing page (public)
/login                     login page (public)
/workspace/overview        dashboard  (blueprint's "/")
/workspace/cycles          (blueprint's /cycles)
/workspace/cycles/[id]
/workspace/cycles/[id]/import
/workspace/sources         (Final Plan — blueprint lacks it)
/workspace/mapping
/workspace/exceptions
/workspace/exceptions/[id]
/workspace/exceptions/[id]/trail
/workspace/patterns
/workspace/policies
/workspace/policies/new
/workspace/policies/[id]
/workspace/policies/[id]/simulate
/workspace/approvals
/workspace/audit
/workspace/evaluation
/workspace/reports         (Final Plan)
/workspace/settings
Copilot                    global drawer, not a route

Everything under /workspace/ requires a valid session.

## Decision 015 — Exception types and root causes: union

Blueprint's 10 types, using blueprint's naming convention, plus the 6 the Final Plan adds. All 9 blueprint root-cause categories kept in full. Nothing dropped from either list.

## Decision 016 — Merchant expectations live in merchants.config

Blueprint Section 13 gives merchants a config JSONB column for "settlement expectations, gateway rules." That is where the T+1 expectation, fee rules, and auto-resolution thresholds go. The Final Plan's separate merchant_policies table is not needed — the capability is preserved, the structure follows the blueprint.

## Decision 017 — Fee and GST are real canonical rows

Blueprint Section 13's txn_type enum lists fee and gst. Section 22's one-to-many design needs them as rows. They are created as rows, and the original values also stay in the settlement's metadata so evidence remains complete.

## Decision 018 — All three match shapes are built

One-to-one (Section 20 Pass 3), many-to-one (batched bank credit, Section 22), one-to-many (settlement → fee + GST + net credit, Section 22). Built in that order. All three ship.

## Decision 019 — T+N means calendar days, timezone Asia/Kolkata

Neither document specifies this — it is a gap being filled, not a change. No weekend skipping, no bank holiday calendar. The synthetic generator and the matcher must both obey it.

## Decision 020 — Policy safety uses both mechanisms

(a) Hard gate: unsafe_suppressions must equal 0 or the approve endpoint returns an error — enforced in the backend, not by a disabled button.
(b) Design guarantee: a policy delays and never deletes; cases read "Expected Pending" and never "Resolved"; the alert always fires at window end; critical severity is never touched.
Both required. (b) is what makes the claim hold without an answer key; (a) proves it held on your test set.

## Decision 021 — Deployment

Local-first is primary (Blueprint Section 40). Optional public deployment with synthetic data only, clearly labelled (Final Plan Step 31). Both remain in scope.

## Decision 022 - POrt No for postgres

use 5433 9mstead of 5432 as it was already in use