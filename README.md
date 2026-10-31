# Store Rating Platform

A full-stack Store Rating Platform that allows users to rate stores, store owners to monitor ratings for their stores, and administrators to manage stores and users through a centralized dashboard.

## Tech Stack

### Frontend

* React.js (Vite)
* Bootstrap 5
* Font Awesome

### Backend

* Node.js
* Express.js
* MySQL
* Sequelize ORM

---

# Prerequisites

Before running the project, make sure the following software is installed on your system:

* Node.js (v18 or later recommended)
* npm
* MySQL Server
* Git

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd store-rating-app
```

Open **two separate terminals**: one for the backend and one for the frontend.

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install all backend dependencies:

```bash
npm install
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install all frontend dependencies:

```bash
npm install
```

---

# Running the Project

## Step 1: Start the Backend

In the backend terminal, execute the database seed command:

```bash
npm run seed
```

Once the database has been seeded successfully, start the backend server:

```bash
npm run dev
```

---

## Step 2: Start the Frontend

In the frontend terminal, start the React application:

```bash
npm run dev
```

---

# Application Access

After both servers are running successfully, open your browser and visit:

```text
http://localhost:5173
```

---

# Project Structure

```text
store-rating-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schema/
│   ├── seed/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# Database Configuration

Ensure that:

1. MySQL Server is running.
2. A database has been created in MySQL.
3. The database credentials in the backend `.env` file are configured correctly.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
```

---

# Important Notes

* Run `npm install` in both the `backend` and `frontend` directories before starting the application.
* Execute `npm run seed` before running the backend server for the first time.
* Ensure MySQL is running and properly configured.
* Verify that all environment variables are set correctly in the `.env` file.
* If new dependencies are added, rerun `npm install`.

---

# Author
Atharva Shete
