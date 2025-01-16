from enum import Enum
from pydantic import BaseModel
from datetime import date
from typing import Optional

# Enum for habitStatus


class HabitStatus(str, Enum):
    INCOMPLETE = "Incomplete"
    DONE = "Done"
    MISSED = "Missed"
    SKIPPED = "Skipped"


# Pydantic schema


class Habit(BaseModel):
    habitId: int
    habitName: str
    habitStatus: HabitStatus = HabitStatus.INCOMPLETE  # Default status
    habitStartDate: date
    habitDescription: Optional[str] = None  # Optional description

    class Config:
        orm_mode = True


# (CREATE LATER)
# class for tracking habits
# class HabitLog(BaseModel):
