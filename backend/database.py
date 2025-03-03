from sqlmodel import create_engine, SQLModel, Session
from config import DATABASE_URL
from typing import Annotated
from fastapi import Depends

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
  
def get_session():
  with Session(engine) as session:
    yield session


def create_tables():
      SQLModel.metadata.create_all(engine)

db_dependency = Annotated[Session, Depends(get_session)]