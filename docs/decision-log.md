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
