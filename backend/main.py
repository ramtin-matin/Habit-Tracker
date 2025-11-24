from fastapi import FastAPI, HTTPException, Depends
from models import Habit, HabitUpdate, HabitCreate
from models import Cluster, ClusterCreate, ClusterUpdate
from database import create_db_and_tables, get_session
from sqlmodel import Session, select, or_
from typing import List
from datetime import datetime, date, timedelta

app = FastAPI()

# create database / tables on startup
@app.on_event("startup")
def on_startup():
  create_db_and_tables()



### HABIT ENDPOINTS ###

# Function to create a new habit
@app.post("/habits", response_model=Habit)
async def create_habit(new_habit: HabitCreate, session: Session = Depends(get_session)):
  habit = Habit.from_orm(new_habit)
  session.add(habit)
  session.commit()
  session.refresh(habit) # fetches auto generated id for the habit in db
  return habit

# Function to get all habits in DB
@app.get("/habits", response_model=List[Habit])
async def get_all_habits(completed_today: bool | None = None, session: Session = Depends(get_session)):
  statement = select(Habit)
  today = date.today()

  if completed_today is True:
    statement = statement.where(Habit.last_completed == today)
  elif completed_today is False:
    statement = statement.where(or_(Habit.last_completed < today, Habit.last_completed.is_(None)))
    
  results = session.exec(statement)
  habits = results.all()
  return habits

# Function to get a habit by ID 
@app.get("/habits/{habit_id}", response_model=Habit)
async def get_habit(habit_id: int, session: Session = Depends(get_session)):
  habit = session.get(Habit, habit_id)
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")
  return habit

# Function to update a habit's name and description
@app.put("/habits/{habit_id}", response_model=Habit)
async def update_habit(habit_id: int, updated_habit: HabitUpdate, session: Session = Depends(get_session)):
  habit = session.get(Habit, habit_id)
  
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")
  
  if updated_habit.name is not None:
    habit.name = updated_habit.name
  if updated_habit.description is not None:
    habit.description = updated_habit.description
  
  habit.updated_at = datetime.utcnow()

  session.add(habit)
  session.commit()
  session.refresh(habit)
  return habit
  
# Function to delete habit  
@app.delete("/habits/{habit_id}", response_model=Habit)
async def delete_habit(habit_id: int, session: Session = Depends(get_session)):
  habit = session.get(Habit, habit_id)
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")
  
  session.delete(habit)
  session.commit()
  return habit 

# Logic to check when habit was completed last and update completion streak accordingly
@app.post("/habits/{habit_id}/completion", response_model=Habit)
async def complete_habit(habit_id: int, session: Session = Depends(get_session)):
  habit = session.get(Habit, habit_id)
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")

  today = date.today()
  yesterday = today - timedelta(days=1)

  last_completed_date = habit.last_completed

  if last_completed_date is None:
    habit.completed_day_streak = 1

  elif last_completed_date == yesterday:
    habit.completed_day_streak += 1

  elif last_completed_date == today:
    return habit

  elif last_completed_date < yesterday:
    habit.completed_day_streak = 1
  
  habit.last_completed = today
  habit.updated_at = datetime.utcnow()

  session.add(habit)
  session.commit()
  session.refresh(habit)

  return habit



### CLUSTER ENDPOINTS ###

# creating a cluster function
@app.post("/clusters", response_model=Cluster)
async def create_cluster(new_cluster: ClusterCreate, session: Session = Depends(get_session)):
  cluster = Cluster.from_orm(new_cluster)
  session.add(cluster)
  session.commit()
  session.refresh(cluster) # fetches auto generated id for the cluster in db
  return cluster

# getting all clusters
@app.get("/clusters", response_model=List[Cluster])
async def get_all_clusters(session: Session = Depends(get_session)):
  statement = select(Cluster)
  results = session.exec(statement)
  clusters = results.all()

  return clusters

# getting specific cluster
@app.get("/clusters/{cluster_id}", response_model=Cluster)
async def get_cluster(cluster_id: int, session: Session = Depends(get_session)):
  cluster = session.get(Cluster, cluster_id)
  if not cluster:
    raise HTTPException(status_code=404, detail="Cluster not found")
  
  return cluster

# getting all habits in a cluster
@app.get("/clusters/{cluster_id}/habits", response_model=List[Habit])
async def get_cluster_habits(cluster_id: int, session: Session = Depends(get_session)):
  cluster = session.get(Cluster, cluster_id)
  if not cluster:
    raise HTTPException(status_code=404, detail="Cluster not found")

  statement = select(Habit)

  statement = statement.where(Habit.cluster_id == cluster_id)
  habits = session.exec(statement).all()

  return habits

# delete cluster and reassign its habits to NULL cluster
@app.delete("/clusters/{cluster_id}", response_model=Cluster)
async def delete_cluster(cluster_id: int, session: Session = Depends(get_session)):
  cluster = session.get(Cluster, cluster_id)
  if not cluster:
    raise HTTPException(status_code=404, detail="Cluster not found")
  
  statement = select(Habit).where(Habit.cluster_id == cluster_id)
  habits = session.exec(statement).all()
  for habit in habits:
    habit.cluster_id = None
    habit.updated_at = datetime.utcnow()

  session.delete(cluster)
  session.commit()

  return cluster

# update a cluster's name / description
@app.put("/clusters/{cluster_id}", response_model=Cluster)
async def update_cluster(cluster_id: int, updated_cluster: ClusterUpdate, session: Session = Depends(get_session)):
  cluster = session.get(Cluster, cluster_id)

  if not cluster:
    raise HTTPException(status_code=404, detail="Cluster not found")
  
  if updated_cluster.name is not None:
    cluster.name = updated_cluster.name
  if updated_cluster.description is not None:
    cluster.description = updated_cluster.description

  cluster.updated_at = datetime.utcnow()

  session.add(cluster)
  session.commit()
  session.refresh(cluster)

  return cluster
  


