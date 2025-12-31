from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy import event

# define path to SQLite database file
sqlite_file = "habits.db"
sqlite_url = f"sqlite:///{sqlite_file}"

# create database engine
engine = create_engine(sqlite_url, echo=True)

@event.listens_for(engine, "connect")
def enable_sqlite_foreign_keys(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

# start session function
def get_session():
  with Session(engine) as session:
    yield session

# create database tables function
def create_db_and_tables():
  SQLModel.metadata.create_all(engine)