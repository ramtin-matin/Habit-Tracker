from typing import Optional

from sqlmodel import SQLModel, Field
from datetime import datetime, date

# Table model for Habit
class Habit(SQLModel, table=True):
  # basic information about habit
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str = Field(min_length=1, max_length=100)
  description: Optional[str] = None
  # creation / update date
  created_at: datetime = Field(default_factory=datetime.utcnow)
  updated_at: datetime = Field(default_factory=datetime.utcnow)
  # which day was it completed on and completion day streak
  last_completed: Optional[date] = None
  completed_day_streak: int = 0

  # relation to Cluster table
  cluster_id: Optional[int] = Field(default=None, foreign_key="cluster.id")

# Request model for creating a habit
class HabitCreate(SQLModel):
  name: str
  description: Optional[str] = None
  cluster_id: Optional[int] = None

# Request model for updating a habit
class HabitUpdate(SQLModel):
  name: Optional[str] = None
  description: Optional[str] = None
  cluster_id: Optional[int] = None

# Table model for Cluster
class Cluster(SQLModel, table=True):
  # basic information about cluster
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str = Field(min_length=1, max_length=100)
  description: Optional[str] = None
  # creation / update date
  created_at: datetime = Field(default_factory=datetime.utcnow)
  updated_at: datetime = Field(default_factory=datetime.utcnow)

# Request model for creating a cluster
class ClusterCreate(SQLModel):
  name: str
  description: Optional[str] = None

# Request model for updating a cluster
class ClusterUpdate(SQLModel):
  name: Optional[str] = None
  description: Optional[str] = None