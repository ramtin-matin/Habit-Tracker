from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend.models import Base, HabitSchema, HabitStatus  # Import your models
from backend.schemas import CreateHabit, HabitStatus  # Import your Pydantic schemas
from datetime import date

# Create tables in the database
Base.metadata.create_all(engine)

app = FastAPI()


# return a message at the root


@app.get("/")
def read_root():
    return {"message": "Welcome to the Habit Tracker API!"}


# Dependency function to manage the lifecycle of a database session.
# Creates a new session, provides it to the route, and ensures it is closed


def get_db():
    db = SessionLocal()  # Create a new database session
    try:
        yield db  # Provide the session to the route
    finally:
        db.close()  # Ensure the session is closed after the request


def get_db():
    db = SessionLocal()  # Create a new database session
    try:
        yield db  # Provide the session to the route
    finally:
        db.close()  # Ensure the session is closed after the request

# CREATE HABIT


@app.post("/habits/", response_model=CreateHabit)
def create_habit(habit: CreateHabit, db: Session = Depends(get_db)):
    existing_habit = db.query(HabitSchema).filter(
        HabitSchema.habit_name == habit.habit_name).first()
    if existing_habit:
        raise HTTPException(status_code=400, detail="Habit already exists")

    new_habit = HabitSchema(
        habit_name=habit.habit_name,
        habit_status=HabitStatus.INCOMPLETE,
        habit_start_date=habit.habit_start_date,
        habit_description=habit.habit_description
    )
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit


# GET ALL HABITS


@app.get("/habits/", response_model=list[CreateHabit])
def get_habits(db: Session = Depends(get_db)):
    return db.query(HabitSchema).all()

# GET HABIT BY ID


@app.get("/habits/{habit_id}", response_model=CreateHabit)
def get_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(HabitSchema).filter(
        HabitSchema.habit_id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit

# UPDATE HABIT


@app.put("/habits/{habit_id}", response_model=CreateHabit)
def update_habit_status(habit_id: int, habit_status: HabitStatus, db: Session = Depends(get_db)):
    habit = db.query(HabitSchema).filter(
        HabitSchema.habit_id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    habit.habit_status = habit_status
    db.commit()
    db.refresh(habit)
    return habit

# DELETE HABIT


@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(HabitSchema).filter(
        HabitSchema.habit_id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(habit)
    db.commit()
    return {"detail": "Habit deleted successfully"}
