from datetime import datetime, date, UTC
from typing import Optional

from sqlmodel import Field, SQLModel

def utc_now() -> datetime:
    return datetime.now(UTC)

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: str = Field(primary_key=True, max_length=36)
    created_at: datetime = Field(default_factory=utc_now)

class Cluster(SQLModel, table=True):
    __tablename__ = "clusters"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id", max_length=36)
    name: str = Field(min_length=1, max_length=100)
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)

class ClusterCreate(SQLModel):
    name: str

class ClusterUpdate(SQLModel):
    name: Optional[str] = None

class Habit(SQLModel, table=True):
    __tablename__ = "habits"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id", max_length=36)
    name: str = Field(min_length=1, max_length=100)
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)
    cluster_id: Optional[int] = Field(default=None, foreign_key="clusters.id")

class HabitCreate(SQLModel):
    name: str
    cluster_id: Optional[int] = None

class HabitUpdate(SQLModel):
    name: Optional[str] = None
    cluster_id: Optional[int] = None

class HabitLog(SQLModel, table=True):
    __tablename__ = "habit_logs"

    log_date: date = Field(primary_key=True)
    habit_id: int = Field(primary_key=True, foreign_key="habits.id")

class HabitLogCreate(SQLModel):
    log_date: date