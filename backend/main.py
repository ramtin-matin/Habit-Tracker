from fastapi import FastAPI, HTTPException, Depends
from models import Habit, HabitUpdate, HabitCreate
from models import HabitLog, HabitLogCreate
from models import Cluster, ClusterCreate, ClusterUpdate
from database import create_db_and_tables, get_session
from sqlmodel import Session, select, or_, and_
from typing import List
from datetime import datetime, date, timedelta, timezone
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

### Communicate with frontned (React Vite)
origins = [
  "http://localhost:5173", # Vite
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
###

# create database / tables on startup
@app.on_event("startup")
def on_startup():
  create_db_and_tables()

### START OF HABIT ENDPOINTS ###

# Function to create a new habit
@app.post("/habits", response_model=Habit)
async def create_habit(new_habit: HabitCreate, session: Session = Depends(get_session)):
  # check if inputted cluster exists, if not, raise error
  if new_habit.cluster_id is not None:
    cluster = session.get(Cluster, new_habit.cluster_id)
    if not cluster:
      raise HTTPException(status_code=404, detail="Cluster not found")
  habit = Habit.model_validate(new_habit)
  session.add(habit)
  session.commit()
  session.refresh(habit) # fetches auto generated id for the habit in db
  return habit

# Function to get all habits in DB
@app.get("/habits", response_model=List[Habit])
async def get_all_habits(session: Session = Depends(get_session)):
  statement = select(Habit)
    
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

# Function to update a habit's fields
@app.patch("/habits/{habit_id}", response_model=Habit)
async def update_habit(habit_id: int, updated_habit: HabitUpdate, session: Session = Depends(get_session)):
  habit = session.get(Habit, habit_id)
  
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")

  update_data = updated_habit.model_dump(exclude_unset=True)

  if "cluster_id" in update_data and update_data["cluster_id"] is not None:
    cluster = session.get(Cluster, update_data["cluster_id"])
    if not cluster:
      raise HTTPException(status_code=404, detail="Cluser not found")
    
  for field, value in update_data.items():
    setattr(habit, field, value)
  
  habit.updated_at = datetime.now(timezone.utc)

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
  
  statement = select(HabitLog).where(HabitLog.habit_id == habit.id)
  logs = session.exec(statement).all()
  
  for log in logs:
    session.delete(log)
    
  session.delete(habit)
  session.commit()
  return habit 

### END OF HABIT ENDPOINTS ###

### START OF HABIT LOG ENDPOINTS ###

# get all habit logs from and to a habit's designated date
@app.get("/habitlogs/{habit_id}", response_model=List[HabitLog])
async def getHabitLogs(habit_id: int, from_date: date, to_date: date, session: Session = Depends(get_session)):
  habit = session.get(Habit, habit_id)
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")

  # makes sure habit id matches, and is in between the designated range
  statement = select(HabitLog).where(
    and_(
        HabitLog.habit_id == habit_id,
        HabitLog.log_date >= from_date,
        HabitLog.log_date <= to_date
    )
  )

  results = session.exec(statement).all()

  return results

@app.post("/habitlogs/{habit_id}", response_model=HabitLog)
async def createHabitLog(habit_id: int, new_habit_log: HabitLogCreate, session: Session = Depends(get_session)):
  # check if inputted habit exists, if not, raise error
  habit = session.get(Habit, habit_id)
  if not habit:
    raise HTTPException(status_code=404, detail="Habit not found")
  
  # check if habit log for this date already exists, if not, raise error
  statement = select(HabitLog).where(
    and_(
      HabitLog.habit_id == habit_id,
      HabitLog.log_date == new_habit_log.log_date
    )
  )

  log_exists = session.exec(statement).first()

  if log_exists:
    raise HTTPException(status_code=409, detail="Habit log already exists")
  
  # create a new habit log
  habit_log = HabitLog(habit_id=habit_id, log_date=new_habit_log.log_date)
  
  session.add(habit_log)
  session.commit()
  session.refresh(habit_log) # fetches auto generated id for the habit log in db
  return habit_log

# delete a habit log by specific habit and date
@app.delete("/habitLogs/{habit_id}", response_model=HabitLog)
async def deleteHabitLog(habit_id: int, log_date: date, session: Session = Depends(get_session)):
  statement = select(HabitLog).where(and_(HabitLog.habit_id == habit_id, HabitLog.log_date == log_date))

  habit_log = session.exec(statement).first()

  if not habit_log:
    raise HTTPException(status_code=404, detail="Habit log not found")

  session.delete(habit_log)
  session.commit()

  return habit_log
  


### END OF HABIT LOG ENDPOINTS ###

### START OF CLUSTER ENDPOINTS ###

# creating a cluster
@app.post("/clusters", response_model=Cluster)
async def create_cluster(new_cluster: ClusterCreate, session: Session = Depends(get_session)):
  cluster = Cluster.model_validate(new_cluster)
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
    habit.updated_at = datetime.now(timezone.utc)

  session.delete(cluster)
  session.commit()

  return cluster

# update a cluster's name
@app.patch("/clusters/{cluster_id}", response_model=Cluster)
async def update_cluster(cluster_id: int, updated_cluster: ClusterUpdate, session: Session = Depends(get_session)):
  cluster = session.get(Cluster, cluster_id)

  if not cluster:
    raise HTTPException(status_code=404, detail="Cluster not found")
  
  update_data = updated_cluster.model_dump(exclude_unset=True)
  
  for field, value in update_data.items():
    setattr(cluster, field, value)

  cluster.updated_at = datetime.now(timezone.utc)

  session.add(cluster)
  session.commit()
  session.refresh(cluster)

  return cluster
  
### END OF CLUSTER ENDPOINTS ###
