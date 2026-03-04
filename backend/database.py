from sqlmodel import Session, create_engine

from config import DATABASE_URL, SQL_ECHO

engine = create_engine(DATABASE_URL, echo=SQL_ECHO, pool_pre_ping=True)

def get_session():
    with Session(engine) as session:
        yield session
