from fastapi import Header, HTTPException
from sqlmodel import Session, select

from models import Cluster, Habit, User

# get user id from request headers
def resolve_user_id(x_user_id: str = Header(..., alias="X-User-Id")) -> str:
    return x_user_id

def ensure_user_exists(session: Session, user_id: str) -> User:
    user = session.get(User, user_id)
    if user:
        return user

    user = User(id=user_id)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_habit_or_404(session: Session, habit_id: int, user_id: str) -> Habit:
    statement = select(Habit).where(Habit.id == habit_id, Habit.user_id == user_id)
    habit = session.exec(statement).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit

def get_user_cluster_or_404(session: Session, cluster_id: int, user_id: str) -> Cluster:
    statement = select(Cluster).where(Cluster.id == cluster_id, Cluster.user_id == user_id)
    cluster = session.exec(statement).first()
    if not cluster:
        raise HTTPException(status_code=404, detail="Cluster not found")
    return cluster
