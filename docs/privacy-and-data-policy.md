# Privacy and Data Policy

## Local-First Principle
AstraLedger’s primary demo runs locally on the developer’s computer.

- Frontend runs locally.
- Backend runs locally.
- PostgreSQL runs locally through Docker.
- Main data is synthetic.
- Local AI runs through Ollama.
- No external AI API key is required.

## No External AI
AstraLedger does not use OpenAI, Gemini, Anthropic, or another external LLM API.

## Local AI
The optional AI Copilot runs through a local model runtime such as Ollama.

The project must work in three modes:
1. Deterministic-only mode.
2. Rule/template explanation mode.
3. Local-AI explanation mode.

## Data Restrictions
Do not use:
- Real customer data.
- Real bank statements.
- Real card information.
- Real UPI identifiers.
- Real merchant settlement files without explicit permission and redaction.
- Production Razorpay credentials.
- Live money movement.

## Razorpay Sandbox
Razorpay Sandbox/Test Mode is optional. It is not required for the core demo.
The primary workflow must work with synthetic Razorpay-compatible CSV files.

## AI Safety
The local AI Copilot may explain verified backend results.
It cannot:
- make final financial matches;
- change money amounts;
- resolve high-risk cases;
- activate prevention policies;
- modify source data;
- alter audit logs;
- invent evidence.