from typing import Optional

from sqlmodel import SQLModel, Field
from datetime import datetime, date, timezone

def utc_now():
    return datetime.now(timezone.utc)

# Table model for Habit
class Habit(SQLModel, table=True):
  # basic information about habit
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str = Field(min_length=1, max_length=100)
  # creation / update date
  created_at: datetime = Field(default_factory=utc_now)
  updated_at: datetime = Field(default_factory=utc_now)
  # when habit was first set active or deactivate (used for logging habit completion)
  active_from: Optional[date] = None
  active_to: Optional[date] = None

  # relation to Cluster table
  cluster_id: Optional[int] = Field(default=None, foreign_key="cluster.id")

# Request model for creating a habit
class HabitCreate(SQLModel):
  name: str
  cluster_id: Optional[int] = None

# Request model for updating a habit
class HabitUpdate(SQLModel):
  name: Optional[str] = None
  cluster_id: Optional[int] = None

# Table model for Habit Log (when habit is completed/incompleted)
class HabitLog(SQLModel, table=True):
  id: Optional[int] = Field(default=None, primary_key=True)
  log_date: date

  # Foreign key to Habit table
  habit_id: Optional[int] = Field(default=None, foreign_key="habit.id", sa_column_kwargs={"ondelete": "CASCADE"})

# Request model for creating a habit log
class HabitLogCreate(SQLModel):
  log_date: date

# Table model for Cluster
class Cluster(SQLModel, table=True):
  # basic information about cluster
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str = Field(min_length=1, max_length=100)
  # creation / update date
  created_at: datetime = Field(default_factory=utc_now)
  updated_at: datetime = Field(default_factory=utc_now)

# Request model for creating a cluster
class ClusterCreate(SQLModel):
  name: str

# Request model for updating a cluster
class ClusterUpdate(SQLModel):
  name: Optional[str] = None