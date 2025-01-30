from sqlalchemy import Column, Integer, String, Date, Enum
from backend.database import Base
from enum import Enum as PyEnum


class HabitStatus(PyEnum):
    INCOMPLETE = "INCOMPLETE"
    DONE = "DONE"
    MISSED = "MISSED"
    SKIPPED = "SKIPPED"


# Define the Habit model


class HabitSchema(Base):
    __tablename__ = "habits"

    habit_id = Column(Integer, primary_key=True, index=True)
    habit_name = Column(String(255), index=True, unique=True, nullable=False)
    habit_status = Column(
        Enum(HabitStatus), default=HabitStatus.INCOMPLETE, nullable=False)
    habit_start_date = Column(Date, nullable=False)
    habit_description = Column(String, nullable=True)
