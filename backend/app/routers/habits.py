from typing import List
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from ..database import get_session
from ..models import Habit, HabitCreate, HabitRead, HabitUpdate

router = APIRouter(prefix="/habits", tags=["habits"])


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


@router.post("/", response_model=HabitRead, status_code=status.HTTP_201_CREATED)
def create_habit(payload: HabitCreate, session: Session = Depends(get_session)) -> Habit:
    # Support both Pydantic v1 and v2 payloads without relying on from_orm
    data = payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()
    habit = Habit(**data)
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


@router.get("/", response_model=List[HabitRead])
def list_habits(session: Session = Depends(get_session)) -> List[Habit]:
    results = session.exec(select(Habit).order_by(Habit.created_at.desc())).all()
    return results


@router.get("/{habit_id}", response_model=HabitRead)
def get_habit(habit_id: int, session: Session = Depends(get_session)) -> Habit:
    habit = session.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Habit not found")
    return habit


@router.patch("/{habit_id}", response_model=HabitRead)
def update_habit(habit_id: int, payload: HabitUpdate, session: Session = Depends(get_session)) -> Habit:
    habit = session.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Habit not found")

    updated = False
    if payload.name is not None:
        habit.name = payload.name
        updated = True
    if payload.description is not None:
        habit.description = payload.description
        updated = True
    if payload.is_completed is not None:
        habit.is_completed = payload.is_completed
        updated = True

    if updated:
        habit.updated_at = _utcnow()
        session.add(habit)
        session.commit()
        session.refresh(habit)

    return habit


@router.delete("/{habit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_habit(habit_id: int, session: Session = Depends(get_session)) -> None:
    habit = session.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Habit not found")
    session.delete(habit)
    session.commit()
    return None
