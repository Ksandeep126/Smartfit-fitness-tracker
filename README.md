# FlexiFit - AI-Powered Fitness & Health Tracker

FlexiFit is a full-stack fitness and health tracking application built with the MERN stack (MongoDB, Express, React, Node.js). It features an AI-powered coach using Meta Llama 3, comprehensive meal/workout/habit tracking, analytics dashboards, and personalized nutrition guidance.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation & Execution](#installation--execution)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Start MongoDB](#4-start-mongodb)
  - [5. Run the Backend Server](#5-run-the-backend-server)
  - [6. Run the Frontend Dev Server](#6-run-the-frontend-dev-server)
  - [7. (Optional) Run Local LLM Server](#7-optional-run-local-llm-server)
- [API Endpoints](#api-endpoints)
- [Features Overview](#features-overview)
- [Database Models](#database-models)
- [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Frontend   | React 18, React Router 6, Vite 7, Recharts 3 |
| Backend    | Node.js, Express 4                           |
| Database   | MongoDB, Mongoose 8                          |
| Auth       | JWT (jsonwebtoken), bcryptjs                 |
| AI         | Hugging Face Inference API (Meta Llama 3 8B) |
| HTTP       | Axios                                        |
| Local LLM  | Python, Flask, Transformers (optional)       |

---

## Project Structure

```
flexifit/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication
│   ├── models/
│   │   ├── User.js                # User profile schema
│   │   ├── Meal.js                # Meal/nutrition schema
│   │   ├── Workout.js             # Workout schema
│   │   ├── Habit.js               # Daily habits schema
│   │   ├── WaterIntake.js         # Water intake schema
│   │   └── WeightLog.js           # Weight tracking schema
│   ├── routes/
│   │   ├── authRoutes.js          # Register, login, reset password
│   │   ├── userRoutes.js          # User profile CRUD
│   │   ├── mealRoutes.js          # Meal tracking
│   │   ├── workoutRoutes.js       # Workout logging
│   │   ├── habitRoutes.js         # Habit tracking
│   │   ├── aiRoutes.js            # AI coach chat
│   │   ├── nutritionRoutes.js     # Food search & suggestions
│   │   └── analyticsRoutes.js     # Analytics & trends
│   ├── utils/
│   │   ├── aiClient.js            # Hugging Face API client
│   │   └── aiClient.local.js      # Local LLM client
│   ├── local_llm_server.py        # Optional local Llama server
│   ├── server.js                  # Express app entry point
│   ├── .env                       # Environment variables
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── images/                # Static images and logo
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosClient.js     # Axios instance with auth interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── Footer.jsx         # Footer
│   │   │   └── ProtectedRoute.jsx # Auth route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Login.jsx          # Login form
│   │   │   ├── Register.jsx       # Registration form
│   │   │   ├── ResetPassword.jsx  # Password reset
│   │   │   ├── Profile.jsx        # User profile setup
│   │   │   ├── Meals.jsx          # Meal tracking
│   │   │   ├── Workouts.jsx       # Workout logging
│   │   │   ├── Habits.jsx         # Habit tracking
│   │   │   ├── Chat.jsx           # AI Coach chat
│   │   │   ├── BMICalculator.jsx  # BMI/BMR/TDEE calculator
│   │   │   ├── Analytics.jsx      # Analytics dashboard
│   │   │   └── History.jsx        # History & export
│   │   ├── App.jsx                # Root component & routing
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── index.html
│   └── package.json
├── docs/                          # Architecture diagrams
├── LITERATURE_REVIEW.md           # Project research documentation
└── package.json                   # Root dependencies
```

---

## Prerequisites

Make sure the following are installed on your system:

- **Node.js** (v18 or later) - [https://nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **MongoDB** (v6 or later) - [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Python 3.8+** (only if using the local LLM server)
- **Git** (for cloning the repository)

---

## Environment Setup

The backend requires a `.env` file in the `backend/` directory with the following variables:

| Variable     | Description                              | Example                                                  |
| ------------ | ---------------------------------------- | -------------------------------------------------------- |
| `MONGO_URI`  | MongoDB connection string                | `mongodb://localhost:27017/flexifit`                      |
| `JWT_SECRET` | Secret key for JWT token signing         | `your_super_secret_key`                                  |
| `PORT`       | Backend server port                      | `5000`                                                   |
| `HF_TOKEN`   | Hugging Face API token                   | `hf_xxxxxxxxxxxx`                                        |
| `AI_MODEL`   | AI model identifier                      | `meta-llama/Meta-Llama-3-8B-Instruct`                    |
| `HF_API_URL` | Hugging Face API endpoint                | `https://router.huggingface.co/v1/chat/completions`      |

> Get your Hugging Face API token at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

---

## Installation & Execution

### 1. Clone the Repository

```bash
git clone <repository-url>
cd flexifit
```

### 2. Install Dependencies

Install dependencies for both backend and frontend:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### 3. Configure Environment Variables

Create or edit the `.env` file inside the `backend/` directory:

```bash
# backend/.env
MONGO_URI=mongodb://localhost:27017/flexifit
JWT_SECRET=your_super_secret_key
PORT=5000
HF_TOKEN=your_huggingface_api_token
AI_MODEL=meta-llama/Meta-Llama-3-8B-Instruct
HF_API_URL=https://router.huggingface.co/v1/chat/completions
```

### 4. Start MongoDB

Make sure MongoDB is running locally:

```bash
# On Windows (if installed as a service, it starts automatically)
# Otherwise, run:
mongod

# On macOS/Linux
sudo systemctl start mongod
# or
mongod --dbpath /path/to/data
```

### 5. Run the Backend Server

```bash
cd backend

# Production mode
npm start

# Development mode (auto-reload on file changes)
npm run dev
```

The backend server will start at **http://localhost:5000**.

You should see:

```
Server running on port 5000
MongoDB connected: localhost
```

### 6. Run the Frontend Dev Server

Open a **new terminal** and run:

```bash
cd frontend
npm run dev
```

The frontend dev server will start at **http://localhost:5173** (Vite default).

Open your browser and navigate to **http://localhost:5173**.

### 7. (Optional) Run Local LLM Server

If you want to run the AI coach locally instead of using the Hugging Face API:

```bash
cd backend

# Install Python dependencies
pip install flask transformers torch

# Start the local LLM server
python local_llm_server.py
```

The local LLM server runs at **http://localhost:5001**.

> Note: Update `backend/utils/aiClient.js` to use `aiClient.local.js` if switching to local inference.

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint          | Description            | Auth |
| ------ | ----------------- | ---------------------- | ---- |
| POST   | `/register`       | Register a new user    | No   |
| POST   | `/login`          | Login and get JWT      | No   |
| POST   | `/reset-password` | Reset user password    | No   |

### User Profile (`/api/users`)

| Method | Endpoint | Description          | Auth |
| ------ | -------- | -------------------- | ---- |
| GET    | `/me`    | Get current profile  | Yes  |
| PUT    | `/me`    | Update profile       | Yes  |

### Meals (`/api/meals`)

| Method | Endpoint        | Description                     | Auth |
| ------ | --------------- | ------------------------------- | ---- |
| POST   | `/`             | Add a meal                      | Yes  |
| GET    | `/`             | Get meals by date range         | Yes  |
| GET    | `/today`        | Get today's meals + totals      | Yes  |
| GET    | `/history/week` | Get last 7 days of meals        | Yes  |

### Workouts (`/api/workouts`)

| Method | Endpoint       | Description                     | Auth |
| ------ | -------------- | ------------------------------- | ---- |
| POST   | `/`            | Log a workout                   | Yes  |
| GET    | `/`            | Get workouts by date range      | Yes  |
| GET    | `/today`       | Get today's workouts + totals   | Yes  |
| GET    | `/history/all` | Get all workout history         | Yes  |

### Habits (`/api/habits`)

| Method | Endpoint | Description                     | Auth |
| ------ | -------- | ------------------------------- | ---- |
| POST   | `/`      | Add/update daily habit          | Yes  |
| GET    | `/`      | Get habits by date range        | Yes  |

### AI Coach (`/api/ai`)

| Method | Endpoint | Description                        | Auth |
| ------ | -------- | ---------------------------------- | ---- |
| POST   | `/chat`  | Chat with AI coach (rate limited)  | Yes  |

### Nutrition (`/api/nutrition`)

| Method | Endpoint       | Description                         | Auth |
| ------ | -------------- | ----------------------------------- | ---- |
| GET    | `/search`      | Search food database (100+ foods)   | Yes  |
| GET    | `/suggestions` | Get food suggestions by user goal   | Yes  |

### Analytics (`/api/analytics`)

| Method | Endpoint          | Description                          | Auth |
| ------ | ----------------- | ------------------------------------ | ---- |
| GET    | `/calories`       | 7-day calories consumed vs burned    | Yes  |
| GET    | `/water`          | 7-day water intake                   | Yes  |
| POST   | `/water`          | Add water intake                     | Yes  |
| GET    | `/water/today`    | Today's water total                  | Yes  |
| GET    | `/weight`         | 30-day weight trend                  | Yes  |
| POST   | `/weight`         | Log weight (one per day)             | Yes  |
| GET    | `/habits`         | Habit consistency analysis           | Yes  |
| GET    | `/compare-months` | This month vs last month comparison  | Yes  |

---

## Features Overview

1. **User Authentication** - Secure registration, login, and password reset with JWT tokens
2. **Profile Setup** - Age, gender, height, weight, fitness goal, dietary preferences with auto-calculated calorie targets (Mifflin-St Jeor equation)
3. **Meal Tracking** - Log meals with calorie and macro (protein, carbs, fats) breakdown; search from a built-in 100+ food nutrition database
4. **Workout Logging** - Track exercise type, duration, and calories burned with auto-estimation
5. **Habit Tracking** - Monitor daily sleep hours, water intake, and step count
6. **AI Coach** - Chat with a context-aware AI fitness coach powered by Meta Llama 3 that knows your profile, goals, and recent activity
7. **BMI/BMR Calculator** - Calculate BMI, BMR, TDEE, daily macros, and get a sample meal plan; export results to TXT/CSV
8. **Analytics Dashboard** - Visualize calories, water, weight, and habit trends with interactive Recharts graphs
9. **History & Export** - View meal and workout history with CSV export; compare month-over-month progress
10. **Personalized Suggestions** - Get food recommendations tailored to your fitness goal

---

## Database Models

| Model       | Key Fields                                               |
| ----------- | -------------------------------------------------------- |
| User        | name, email, password, age, gender, heightCm, weightKg, goal, dietaryPrefs, dailyCalorieTarget |
| Meal        | user, name, calories, protein, carbs, fats, date         |
| Workout     | user, type, durationMin, caloriesBurned, date            |
| Habit       | user, date, sleepHours, waterLiters, steps               |
| WaterIntake | user, amount (ml), date                                  |
| WeightLog   | user, weight (kg), date                                  |

---

## Troubleshooting

| Issue                        | Solution                                                                 |
| ---------------------------- | ------------------------------------------------------------------------ |
| MongoDB connection failed    | Ensure `mongod` is running and `MONGO_URI` in `.env` is correct          |
| Backend won't start          | Check if port 5000 is available; verify all `.env` variables are set     |
| Frontend can't reach backend | Ensure backend is running on port 5000; check CORS configuration         |
| AI chat not responding       | Verify `HF_TOKEN` is valid; check Hugging Face API status                |
| `npm install` fails          | Delete `node_modules` and `package-lock.json`, then retry                |
| Port already in use          | Kill the process using the port or change `PORT` in `.env`               |
