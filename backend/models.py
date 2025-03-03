from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field
from enum import Enum
from typing import Optional

# Define Enum
class Status(str, Enum):
    completed = "completed"
    incompleted = "incompleted"

class HabitBase(SQLModel):
  name: str = Field(default="UNNAMED HABIT")
  status: Status = Field(default=Status.incompleted)

# Habit Model
class Habit(HabitBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)

class HabitPublic(HabitBase):
  id: UUID 

class HabitCreate(HabitBase):
  name: str = Field(default="UNNAMED HABIT")

class HabitUpdate(SQLModel):
  name: Optional[str] = Field(default=None, description="UNNAMED HABIT")
  status: Optional[Status] = Field(default=None, description=Status.incompleted)
