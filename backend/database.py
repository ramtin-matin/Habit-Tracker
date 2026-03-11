from sqlmodel import Session, create_engine

from backend.config import MYSQL_URL, SQL_ECHO

engine = create_engine(MYSQL_URL, echo=SQL_ECHO, pool_pre_ping=True)

def get_session():
    with Session(engine) as session:
        yield session
