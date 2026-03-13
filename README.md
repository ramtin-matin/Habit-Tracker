# HabitTracker

A full-stack habit tracking app with clusters, daily logs, and ungrouped habits.

Hosted on: https://habitset.vercel.app/

## Overview

- Frontend: React + Vite + Tailwind
- Backend: FastAPI + SQLModel
- Database: MySQL

## Core Features

- Create, edit, and delete habits
- Create, edit, and delete clusters
- Assign habits to clusters or ungrouped (`cluster_id = null`)
- Track and toggle daily completion logs

## Architecture

```mermaid
flowchart LR
  UI[React Frontend<br/>Vite] -->|HTTP + X-User-Id| API[FastAPI Backend]
  API --> DB[(MySQL)]
```

## File Architecture

```text
habittracker/
├── backend/
│   ├── main.py                # FastAPI app setup + CORS + router mounting
│   ├── config.py              # Environment-based DB/app configuration
│   ├── config.example.py      # Copy this to config.py for local setup
│   ├── database.py            # SQLModel engine + DB session provider
│   ├── dependencies.py        # Shared backend helpers (user/lookup dependencies)
│   ├── models.py              # SQLModel entities + create/update schemas
│   └── routers/
│       ├── habits.py          # Habit CRUD API endpoints
│       ├── habit_logs.py      # Habit log API endpoints
│       └── clusters.py        # Cluster CRUD + cluster-habit API endpoints
├── frontend/
│   ├── src/
│   │   ├── api.js             # Frontend API client wrappers
│   │   ├── App.jsx            # Root React app shell
│   │   └── components/
│   │       ├── HabitContext.jsx                # Shared state + action handlers
│   │       └── habit-page/
│   │           ├── Habits.jsx                 # Main habits page + modal wiring
│   │           ├── HabitCard.jsx              # Habit card UI + actions entry
│   │           ├── DayCell.jsx                # Single day cell in habit calendar grid
│   │           ├── GroupHeader.jsx            # Cluster/section heading row
│   │           ├── MonthNavigation.jsx        # Month switcher controls
│   │           ├── CreateHabitModal.jsx       # Cluster-scoped habit creation modal
│   │           ├── CreateGlobalHabitModal.jsx # Global habit creation modal
│   │           ├── EditHabitModal.jsx         # Habit edit/delete modal
│   │           ├── CreateClusterModal.jsx     # Cluster creation modal
│   │           ├── EditClusterModal.jsx       # Cluster edit/delete modal
│   │           ├── ColorPicker.jsx            # Reusable cluster color picker
│   │           ├── clusterColors.js           # Color options for clusters
│   │           └── themeGradients.js          # Shared gradient constants
│   └── package.json           # Frontend dependencies + npm scripts
├── requirements.txt           # Backend Python dependencies
└── README.md                  # Project docs
```

## Prerequisites

- Node.js 18+ (Download: https://nodejs.org/)
- Python 3.11+ (Download: https://www.python.org/downloads/)
- MySQL 8+ (Download: https://dev.mysql.com/downloads/mysql/)

## Quick Start

1. Clone and enter project:
```bash
git clone <your-repo-url>
cd habittracker
```

2. Install frontend packages:
```bash
cd frontend
npm install
cd ..
```

3. Create Python env and install backend packages:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

4. Create backend config file:
```bash
cp backend/config.example.py backend/config.py
```
Then edit `backend/config.py` with your MySQL values.

5. Run backend:
```bash
cd backend
uvicorn main:app --reload
```

6. In a second terminal, run frontend:
```bash
cd frontend
npm run dev
```

## Frontend Scripts

From `frontend/`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## API Routes

### Habits

- `GET /habits`
- `POST /habits`
- `GET /habits/{habit_id}`
- `PATCH /habits/{habit_id}`
- `DELETE /habits/{habit_id}`

### Habit Logs

- `GET /habitlogs`
- `POST /habitlogs/{habit_id}`
- `DELETE /habitlogs/{habit_id}?log_date=YYYY-MM-DD`

### Clusters

- `GET /clusters`
- `POST /clusters`
- `GET /clusters/{cluster_id}`
- `PATCH /clusters/{cluster_id}`
- `DELETE /clusters/{cluster_id}`
- `GET /clusters/{cluster_id}/habits`

## MySQL Schema

```sql
USE habit_tracker;

CREATE TABLE users (
	id CHAR(36) PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clusters (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#8E8E8E',

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE habits (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id CHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    cluster_id INT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cluster_id) REFERENCES clusters(id) ON DELETE SET NULL
);

CREATE TABLE habit_logs (
    log_date DATE NOT NULL,
    habit_id INT NOT NULL,

    PRIMARY KEY (habit_id, log_date),

    FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
);
```

## SQL Utility Queries

**To get all users:**

```sql
SELECT * FROM habit_tracker.users;
```

**To get all habits for a user:**

```sql
SELECT * FROM habit_tracker.habits WHERE habit_tracker.habits.user_id = 'USER-ID';
```

**To get all clusters for a user:**

```sql
SELECT * FROM habit_tracker.clusters WHERE habit_tracker.clusters.user_id = 'USER-ID';
```

**To get all habit logs for a user:**

```sql
SELECT * FROM habit_tracker.habit_logs JOIN habit_tracker.habits ON habit_tracker.habit_logs.habit_id = habit_tracker.habits.id WHERE habit_tracker.habits.user_id = 'USER-ID';
```

## Deployment Notes

- Set allowed frontend origins with `CORS_ALLOWED_ORIGINS` (comma-separated), for example:
  `CORS_ALLOWED_ORIGINS="https://your-app.com,https://www.your-app.com"`
- Use environment variables for secrets and DB credentials.

## Demo Security Note

- This project is intentionally deployed as a **portfolio/demo app**.
- User identity is scoped via `X-User-Id` request header for demo separation.
- `X-User-Id` is **not production authentication** and can be spoofed.
- Do not use real/sensitive data with this setup.
- For production-grade security, replace this with real auth (JWT/session provider) and server-verified identity.

## Rate Limiting Notes

- Write endpoints use per-key rate limits (create/update/delete routes).
- Limit key is `X-User-Id` when present, otherwise client IP.
- This setup works for local/dev and single-instance production.
- If multiple users share one IP and do not send unique `X-User-Id`, they can affect each other's limits.
- For multi-instance production, use shared limiter storage (for example Redis) so limits remain consistent across all app instances.
