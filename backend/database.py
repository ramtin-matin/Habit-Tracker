from sqlmodel import SQLModel, create_engine, Session

# define path to SQLite database file
sqlite_file = "habits.db"
sqlite_url = f"sqlite:///{sqlite_file}"

# create database engine
engine = create_engine(sqlite_url, echo=True)

# start session function
def get_session():
  with Session(engine) as session:
    yield session

# create database tables function
def create_db_and_tables():
  SQLModel.metadata.create_all(engine)