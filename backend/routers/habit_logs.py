from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session, select

from database import get_session
from dependencies import get_user_habit_or_404, resolve_user_id
from models import Habit, HabitLog, HabitLogCreate
from rate_limit import limiter

router = APIRouter(prefix="/habitlogs", tags=["habit-logs"])

# get all habit logs each of User's habits
@router.get("", response_model=List[HabitLog])
async def get_habit_logs(
    from_date: date | None = None,
    to_date: date | None = None,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    
    statement = select(HabitLog).join(Habit).where(
        Habit.user_id == user_id
    )

    if from_date and to_date:
        statement = statement.where(
        HabitLog.log_date.between(from_date, to_date),
    )
    return session.exec(statement).all()

# create a habit log for given Habit
@router.post("/{habit_id}", response_model=HabitLog)
@limiter.limit("180/minute")
async def create_habit_log(
    request: Request,
    habit_id: int,
    new_habit_log: HabitLogCreate,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    get_user_habit_or_404(session, habit_id, user_id)

    statement = select(HabitLog).where(
        HabitLog.habit_id == habit_id,
        HabitLog.log_date == new_habit_log.log_date,
    )
    if session.exec(statement).first():
        raise HTTPException(status_code=409, detail="Habit log already exists")

    habit_log = HabitLog(habit_id=habit_id, log_date=new_habit_log.log_date)
    session.add(habit_log)
    session.commit()
    session.refresh(habit_log)
    return habit_log

# delete a habit log for given Habit
@router.delete("/{habit_id}", response_model=HabitLog)
@limiter.limit("180/minute")
async def delete_habit_log(
    request: Request,
    habit_id: int,
    log_date: date,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    get_user_habit_or_404(session, habit_id, user_id)

    statement = select(HabitLog).where(
        HabitLog.habit_id == habit_id,
        HabitLog.log_date == log_date,
    )
    habit_log = session.exec(statement).first()

    if not habit_log:
        raise HTTPException(status_code=404, detail="Habit log not found")

    session.delete(habit_log)
    session.commit()
    return habit_log
