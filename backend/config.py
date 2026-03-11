import os

SQL_ECHO = os.getenv("SQL_ECHO", "false").lower() in {"1", "true", "yes", "on"}

DATABASE_URL = os.getenv("DATABASE_URL")

# Comma-separated list. Example:
# CORS_ALLOWED_ORIGINS="http://localhost:5173,https://app.example.com"
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

CORS_ALLOW_METHODS = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
CORS_ALLOW_HEADERS = ["Content-Type", "X-User-Id", "Authorization"]