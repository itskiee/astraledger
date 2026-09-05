"""Application settings, loaded once from backend/.env."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "development"

    # Required. The app refuses to start without these two, which is
    # deliberate — a missing secret should fail loudly at boot, not
    # silently at the first login attempt.
    database_url: str
    jwt_secret_key: str

    cors_origins: str = "http://localhost:3000"

    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 480

    local_ai_enabled: bool = True
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = ""

    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""
    razorpay_webhook_secret: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        """CORS_ORIGINS is a comma-separated string; FastAPI wants a list."""
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    """Cached so the .env file is read once, not on every request."""
    return Settings()