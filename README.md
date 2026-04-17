# Task Management Web Application

This repository contains a full-stack task manager built with React for the frontend and Node.js + Express for the backend.

## Features
- Add a new task
- View all tasks
- Update tasks (edit title and toggle completion)
- Delete tasks
- Data stored in a JSON file on the backend

## Setup

### Backend
1. Open terminal in `backend`
2. Run `npm install`
3. Run `npm run dev` or `npm start`
4. Backend server is available at `http://localhost:5000`

### Frontend
1. Open terminal in `frontend`
2. Run `npm install`
3. Run `npm run dev`
4. Open the displayed Vite URL (typically `http://localhost:5173`)

## API Endpoints
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

=======
# Task-Management-Web-App
`Full-stack Task Manager with React + Vite frontend and Express backend storing tasks in JSON`  A simple task management app with add, edit, complete, and delete support. The React frontend talks to an Express API, and tasks are persisted in tasks.json.
