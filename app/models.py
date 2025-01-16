from sqlalchemy import Column, Integer, String, Date, Enum
from app.database import Base
from enum import Enum as PyEnum

# Define the Enum for Habit Status


class HabitStatus(PyEnum):
    DONE = "Done"
    MISSED = "Missed"
    SKIPPED = "Skipped"

# Define the Habit model


class Habit(Base):
    __tablename__ = "habits"

    habit_id = Column(Integer, primary_key=True, index=True)
    habit_name = Column(String(255), index=True, unique=True, nullable=False)
    habit_status = Column(
        Enum(HabitStatus), default=HabitStatus.INCOMPLETE, nullable=False)
    habit_start_date = Column(Date, nullable=False)
    habit_description = Column(String, nullable=True)
