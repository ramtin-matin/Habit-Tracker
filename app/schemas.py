from enum import Enum
from pydantic import BaseModel
from datetime import date
from typing import Optional

# Enum for habitStatus


class HabitStatus(str, Enum):
    INCOMPLETE = "INCOMPLETE"
    DONE = "DONE"
    MISSED = "MISSED"
    SKIPPED = "SKIPPED"


# Pydantic schema

class CreateHabit(BaseModel):
    habit_name: str
    habit_status: HabitStatus = HabitStatus.INCOMPLETE  # Default status
    habit_start_date: date
    habit_description: Optional[str] = None  # Optional description

    class Config:
        orm_mode = True


# (CREATE LATER)
# class for tracking habits
# class HabitLog(BaseModel):
