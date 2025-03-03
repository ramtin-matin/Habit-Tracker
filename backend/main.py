from fastapi import FastAPI
from database import create_tables
from routers import habits

app = FastAPI()

@app.on_event("startup")
def startup():
    print("FastAPI is starting...")
    create_tables()

@app.get("/")
async def root():
    return {"message" : "Welcome to HabitSet"}

app.include_router(habits.router)


