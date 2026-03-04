from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.clusters import router as clusters_router
from routers.habit_logs import router as habit_logs_router
from routers.habits import router as habits_router

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(habits_router)
app.include_router(habit_logs_router)
app.include_router(clusters_router)
