"""AstraLedger API entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import health
from app.config import get_settings

settings = get_settings()

app = FastAPI(
    title="AstraLedger API",
    description="Evidence-first settlement intelligence. Local-first, synthetic data only.",
    version="0.1.0",
)

# allow_credentials=True is needed from Step 5 onward so the browser
# will send the auth cookie. It only works with explicit origins —
# pairing it with allow_origins=["*"] is rejected by browsers.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1")