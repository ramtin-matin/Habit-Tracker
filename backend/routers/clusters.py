from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from database import get_session
from dependencies import ensure_user_exists, get_user_cluster_or_404, resolve_user_id
from models import Cluster, ClusterCreate, ClusterUpdate, Habit

router = APIRouter(prefix="/clusters", tags=["clusters"])

# create a cluster
@router.post("", response_model=Cluster)
async def create_cluster(
    new_cluster: ClusterCreate,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    ensure_user_exists(session, user_id)

    cluster = Cluster.model_validate(new_cluster, update={"user_id": user_id})
    session.add(cluster)
    session.commit()
    session.refresh(cluster)
    return cluster

# get all clusters for a User
@router.get("", response_model=List[Cluster])
async def get_all_clusters(
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    statement = select(Cluster).where(Cluster.user_id == user_id)
    return session.exec(statement).all()

# get cluster by id for a User
@router.get("/{cluster_id}", response_model=Cluster)
async def get_cluster(
    cluster_id: int,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    return get_user_cluster_or_404(session, cluster_id, user_id)

# get all habits for a specific cluster for a User
@router.get("/{cluster_id}/habits", response_model=List[Habit])
async def get_cluster_habits(
    cluster_id: int,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    get_user_cluster_or_404(session, cluster_id, user_id)

    statement = select(Habit).where(Habit.cluster_id == cluster_id, Habit.user_id == user_id)
    return session.exec(statement).all()

# delete a User's cluseter
@router.delete("/{cluster_id}", response_model=Cluster)
async def delete_cluster(
    cluster_id: int,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    cluster = get_user_cluster_or_404(session, cluster_id, user_id)
    session.delete(cluster)
    session.commit()
    return cluster

# update a User's cluster
@router.patch("/{cluster_id}", response_model=Cluster)
async def update_cluster(
    cluster_id: int,
    updated_cluster: ClusterUpdate,
    session: Session = Depends(get_session),
    user_id: str = Depends(resolve_user_id),
):
    cluster = get_user_cluster_or_404(session, cluster_id, user_id)

    update_data = updated_cluster.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(cluster, field, value)

    cluster.updated_at = datetime.utcnow()

    session.add(cluster)
    session.commit()
    session.refresh(cluster)
    return cluster
