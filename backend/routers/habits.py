from fastapi import APIRouter, HTTPException
from models import Habit, HabitCreate, HabitPublic, HabitUpdate
from uuid import uuid4, UUID
from sqlmodel import select
from database import db_dependency

router = APIRouter(
    prefix="/habits",
    tags=["habits"],
    responses={404: {"description": "Habit not found"}},
)
# get all habits
@router.get("/", response_model=list[HabitPublic])
async def fetch_habits(db: db_dependency):
    habits = db.exec(select(Habit)).all()
    return habits

# get specific habit by id
@router.get("/{habit_id}", response_model=HabitPublic)
async def fetch_a_habit(habit_id: UUID, db: db_dependency):
    habit = db.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit

# create a habit
@router.post("/", response_model=HabitPublic)
async def create_habit(habit: HabitCreate, db: db_dependency):
    new_habit = Habit.model_validate(habit) # creates a Habit object
    new_habit.id = uuid4() # assings a unique ID

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit


# delete a habit
@router.delete("/{habit_id}")
async def delete_habit(habit_id: UUID, db: db_dependency) -> Habit:
    habit = db.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    db.delete(habit)
    db.commit()
    return {"message" : "Habit deleted"}

# update a habit
@router.patch("/{habit_id}", response_model=HabitPublic)
def update_habit(habit_id: UUID, habit: HabitUpdate, db: db_dependency):
    habit_db = db.get(Habit, habit_id)
    if not habit_db:
        raise HTTPException(status_code=404, detail="Habit not found")
    habit_data = habit.model_dump(exclude_unset=True)
    habit_db.sqlmodel_update(habit_data)
    db.add(habit_db)
    db.commit()
    db.refresh(habit_db)
    return habit_db
