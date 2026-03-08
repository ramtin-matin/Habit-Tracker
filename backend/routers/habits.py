from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Request
from sqlmodel import Session, select

from database import get_session
from dependencies import (
    ensure_user_exists,
    get_user_cluster_or_404,
    get_user_habit_or_404,
    resolve_user_id,
)
from models import Habit, HabitCreate, HabitUpdate
from rate_limit import limiter

router = APIRouter(prefix="/habits", tags=["habits"])

# create a habit for specific User
@router.post("", response_model=Habit)
@limiter.limit("60/minute")
async def create_habit(
    request: Request,
    new_habit: HabitCreate,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    ensure_user_exists(session, user_id)

    if new_habit.cluster_id is not None:
        get_user_cluster_or_404(session, new_habit.cluster_id, user_id)

    habit = Habit.model_validate(new_habit, update={"user_id": user_id})
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit

# get all habits for specific User
@router.get("", response_model=List[Habit])
async def get_all_habits(
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    statement = select(Habit).where(Habit.user_id == user_id)
    return session.exec(statement).all()

# get specific habit for specific User
@router.get("/{habit_id}", response_model=Habit)
async def get_habit(
    habit_id: int,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    return get_user_habit_or_404(session, habit_id, user_id)

# update a habit for specific User
@router.patch("/{habit_id}", response_model=Habit)
@limiter.limit("60/minute")
async def update_habit(
    request: Request,
    habit_id: int,
    updated_habit: HabitUpdate,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    habit = get_user_habit_or_404(session, habit_id, user_id)

    update_data = updated_habit.model_dump(exclude_unset=True)

    if "cluster_id" in update_data and update_data["cluster_id"] is not None:
        get_user_cluster_or_404(session, update_data["cluster_id"], user_id)

    for field, value in update_data.items():
        setattr(habit, field, value)

    habit.updated_at = datetime.utcnow()

    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit

# delete a habit for specific User
@router.delete("/{habit_id}", response_model=Habit)
@limiter.limit("30/minute")
async def delete_habit(
    request: Request,
    habit_id: int,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    habit = get_user_habit_or_404(session, habit_id, user_id)
    session.delete(habit)
    session.commit()
    return habit
