# Store Rating Platform

Full-stack coding challenge submission — a web app where users rate stores (1-5), with three roles: System Administrator, Normal User, Store Owner.

**Stack:** Express.js + PostgreSQL (Sequelize) backend, React (Vite) frontend, Bootstrap 5 + Font Awesome for styling.

## Project Structure

```
store-rating-app/
├── backend/
│   ├── app.js                 # entry point
│   ├── config/db.js           # sequelize/postgres connection
│   ├── models/                # User, Store, Rating + associations
│   ├── controllers/           # auth, admin, store, storeOwner
│   ├── routes/                # auth, admin, store, storeOwner
│   ├── middleware/            # JWT auth, role guard, joi validation, error handler
│   ├── schema/                # joi validation schemas (name/email/address/password rules)
│   └── seed/seed.js           # creates the default admin account
└── frontend/
    ├── src/
    │   ├── pages/admin         # Dashboard, Stores, Users, Add Store, Add User, User Details
    │   ├── pages/user          # Stores list (search + submit/modify rating)
    │   ├── pages/storeOwner    # Dashboard (raters + avg rating)
    │   ├── context/AuthContext.jsx
    │   └── components/         # Navbar, PrivateRoute, StarRating, etc.
    └── index.html               # bootstrap + fontawesome via CDN
```

## Setup

### 1. Database
Create a PostgreSQL database:
```sql
CREATE DATABASE store_rating_db;
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env with your postgres credentials
npm run seed     # creates default admin + syncs tables
npm run dev       # starts on http://localhost:8080
```

Default admin login (created by the seed script):
- Email: `admin@storerating.com`
- Password: `Admin@1234`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173, proxies /api to :8080
```

Open http://localhost:5173

## How each role's requirements are covered

**System Administrator** (login as seeded admin, or any user you create with role=admin)
- `/admin/dashboard` — total users, stores, ratings
- `/admin/users/add` — add normal users or admin users (Name, Email, Password, Address)
- `/admin/stores/add` — add a store, which also creates its Store Owner login in one step
- `/admin/stores` — list with Name/Email/Address/Rating, filterable, sortable (click column headers)
- `/admin/users` — list with Name/Email/Address/Role, filterable (incl. by role), sortable
- `/admin/users/:id` — full details; shows Rating if the user is a Store Owner
- Logout via navbar

**Normal User**
- `/signup` — Name, Email, Address, Password
- `/update-password` — change password after login
- `/stores` — all stores, searchable by Name/Address, shows Store Name/Address/Overall Rating/Your Rating, click stars to submit or modify a rating (1-5)

**Store Owner** (account created by admin when a store is added)
- `/store-owner/dashboard` — list of users who rated their store + average rating
- `/update-password`

**Validations** (enforced both client-side via HTML attributes and server-side via Joi):
- Name: 20-60 characters
- Address: max 400 characters
- Password: 8-16 characters, min 1 uppercase + 1 special character
- Email: standard format

## Notes
- Auth is JWT-based (stored in localStorage), attached via an axios interceptor.
- Passwords are hashed with bcrypt.
- Sorting/filtering on listings is done server-side via query params (`sortBy`, `sortOrder`, `name`, `email`, `address`, `role`).
- The UI intentionally stays simple/utilitarian (Bootstrap tables & cards, Font Awesome icons) per the "keep it simple" requirement — no custom design system.
