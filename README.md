# Finance Dashboard Backend

## Overview

This project is a Finance Dashboard Backend that allows different users 
(Viewer, Analyst, Admin) to interact with financial records based on role-based access control.

The system supports:

- User and role management
- Financial records management
- Dashboard analytics
- Access control
- Validation and error handling

This backend is built using Node.js, Express, and MongoDB.

## Features

### User Management
- Create users
- Assign roles (Viewer, Analyst, Admin)
- Activate / deactivate users

### Financial Records
- Create transaction (Admin only)
- View transactions (Analyst, Admin)
- Filter transactions
- Delete / update transaction (Admin only)

### Dashboard Insights
- Total income
- Total expenses
- Net balance
- Category summary
- Monthly trends

### Access Control
- Viewer: Dashboard access only
- Analyst: Dashboard + records access
- Admin: Full access

## Tech Stack

- Node.js
- Express.js
- MongoDB

## Folder Structure
backend/  
├── controllers/  
├── models/  
├── routes/  
├── middlewares/  
├── validators/  
├── sample_data/  
└── index.js

## API Endpoints

### Base URL
`/api/v1`

---

## Auth Routes
These routes are used for user registration and login.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login a user |

---

## Admin Routes
These routes are for admin-level user management.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | Get all users |
| PATCH | `/admin/update/role/:id` | Update user role |
| PATCH | `/admin/update/status/:id` | Update user status (active/inactive) |

---

## Record Routes
These routes are used to manage financial records.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/records/add` | Add a new record |
| GET | `/records/view/:id` | View a single record |
| GET | `/records/viewall` | View all records |
| PATCH | `/records/update/:id` | Update a record |
| DELETE | `/records/delete/:id` | Delete a record |

---

## Dashboard Routes
These routes are used to get summary and analytical data.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/summary` | Get total income, total expense, and net balance |
| GET | `/dashboard/monthly-trends` | Get monthly summary/trends |
| GET | `/dashboard/category-breakdown` | Get category-wise breakdown |

---

## Dashboard Filter Routes
These routes are used to filter records for analysis.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/filter` | Filter records by date range |
| GET | `/dashboard/filter-by-category` | Filter records by category |
| GET | `/dashboard/filter-by-type` | Filter records by type |

---

## Access Control

| Role | Permissions |
|------|-------------|
| Viewer | Can view dashboard data |
| Analyst | Can view records and access insights |
| Admin | Can create, update, and manage records and users |

### Middleware Used
- `authenticate` → checks if user is logged in
- `isActive` → checks if user account is active
- `isAnalystOrAdmin` → allows analyst and admin only
- `isAdmin` → allows admin only

## Setup Instructions

### Prerequisites

Make sure you have installed:

- Node.js
- MongoDB (Local or Atlas)
- Postman (Optional for testing)

---

1. Clone Repository

```bash
git clone <repository-url>
```

2. Navigate to Backend Folder

```bash
cd <repository-folder>/backend
```

3. Install Dependencies

```bash
npm install
```

4. Setup Environment Variables

A `.env.sample` file is provided in the backend folder.  
Create a `.env` file from `.env.sample` and update the required environment variables.

5. Run the Server

```bash
npm start
```

## API Documentation

This project provides REST APIs for managing financial records with role-based access control.

Postman Collection is available in the file:

- finance-dashboard.postman_collection.json

Import these file into Postman to test all endpoints.

---
