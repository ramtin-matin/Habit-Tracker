from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, Habit, HabitStatus  # Import your models
from app.schemas import HabitCreate, HabitUpdate  # Import your Pydantic schemas
from datetime import date

# Create tables in the database
Base.metadata.create_all(engine)

app = FastAPI()


@app.get("/")
def get_habit()


@app.get("/")
def get_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).all()
    return items

    # returns task associated with inputted int


@app.get("/{id}")
def getItem(id: int):
    return db[id]

# adds a task inputted


@app.post("/")
def addItem(item: schemas.Item):
    newId = len(fakeDatabase.keys()) + 1
    fakeDatabase[newId] = {"task": item.task}
    return fakeDatabase

# updates a task in the list by inputting task # and string


@app.put("/{id}")
def updateItem(id: int, item: schemas.Item):
    fakeDatabase[id]['task'] = item.task
    return fakeDatabase

# deletes a task from the list


@app.delete("/{id}")
def deleteItem(id: int):
    del fakeDatabase[id]
    return fakeDatabase
