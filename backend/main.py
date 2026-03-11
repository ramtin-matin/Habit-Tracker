from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from config import (
    CORS_ALLOWED_ORIGINS,
    CORS_ALLOW_ORIGIN_REGEX,
    CORS_ALLOW_METHODS,
    CORS_ALLOW_HEADERS
)

from routers.clusters import router as clusters_router
from routers.habit_logs import router as habit_logs_router
from routers.habits import router as habits_router
from rate_limit import limiter

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)


app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_origin_regex=CORS_ALLOW_ORIGIN_REGEX,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(habits_router)
app.include_router(habit_logs_router)
app.include_router(clusters_router)
