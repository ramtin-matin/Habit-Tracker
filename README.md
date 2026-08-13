# HabitTracker

A full-stack habit tracker for creating habits, grouping them into clusters, and tracking daily completions.

Hosted app: https://habitset.vercel.app/

## Demo

![HabitTracker demo](frontend/src/assets/habit-tracker-demo.gif)

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, SQLModel, SlowAPI
- Database: MySQL
- Deployment: Vercel frontend, Railway backend/database

## Prerequisites

Install these before running the project:

- Node.js 18+
- Python 3.11+
- MySQL 8+

## Environment Setup

### Backend

Create `backend/config.py` from the example file:

```bash
cp backend/config.example.py backend/config.py
```

Set these backend environment variables:

```bash
MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
CORS_ALLOWED_ORIGINS=http://localhost:5173
SQL_ECHO=false
```

For production, set `CORS_ALLOWED_ORIGINS` to your frontend URL:

```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Frontend

Create `frontend/.env`:

```bash
VITE_API_URL=http://localhost:8000
```

For production, set `VITE_API_URL` to your deployed backend URL.

## Local Setup

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

Create a Python virtual environment and install backend dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

Run the backend:

```bash
cd backend
uvicorn main:app --reload
```

Run the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Database

The backend creates tables on startup with SQLModel:

```py
SQLModel.metadata.create_all(engine)
```

For habit deletes to work cleanly at the database level, `habit_logs.habit_id` should cascade when a habit is deleted:

```sql
ALTER TABLE habit_logs DROP FOREIGN KEY habit_logs_ibfk_1;

ALTER TABLE habit_logs
ADD CONSTRAINT habit_logs_ibfk_1
FOREIGN KEY (habit_id)
REFERENCES habits(id)
ON DELETE CASCADE;
```

## Notes

- The app uses `X-User-Id` in request headers to separate demo users.
- `X-User-Id` is not production authentication.
- Do not store sensitive data in this demo app.
