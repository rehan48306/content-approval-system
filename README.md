# 📌 Content Approval System

A full-stack application implementing a multi-stage content approval workflow with role-based access and audit tracking.

---

## 🚀 Setup Instructions

### 🔧 Backend

```bash
cd backend
npm install
node src/server.js
```

Server runs on: **http://localhost:5000**

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on: **http://localhost:5173**

---

## 🏗️ Architecture Overview

This project follows a **feature-based full-stack architecture**:

### Frontend

* React (Vite)
* Tailwind CSS
* Component-based design
* Feature-driven structure (`features/content`)

### Backend

* Node.js + Express
* REST API
* Role-based logic handling

### Database

* SQLite (file-based, lightweight)

---

## 🔄 Workflow Design

The system implements a **multi-stage approval process**:

1. **Creator**

   * Creates content → `DRAFT`
   * Can edit & submit content

2. **Submission**

   * Moves to → `REVIEW_1`

3. **Reviewer 1**

   * Approves → moves to `REVIEW_2`
   * Rejects → back to `DRAFT` (comment required)

4. **Reviewer 2**

   * Approves → `APPROVED`
   * Rejects → back to `DRAFT` (comment required)

---

### 🔐 Role Rules

* Creator cannot approve content
* Reviewer 1 handles only `REVIEW_1`
* Reviewer 2 handles only `REVIEW_2`
* Rejection requires comment
* Approval comment is optional

---

## 🗄️ Database Schema

### Content Table

| Field       | Type         |
| ----------- | ------------ |
| id          | INTEGER (PK) |
| title       | TEXT         |
| description | TEXT         |
| status      | TEXT         |
| created_by  | TEXT         |
| updated_at  | TEXT         |

---

### Approvals Table

| Field       | Type         |
| ----------- | ------------ |
| id          | INTEGER (PK) |
| content_id  | INTEGER (FK) |
| stage       | TEXT         |
| reviewer_id | TEXT         |
| action      | TEXT         |
| comment     | TEXT         |
| created_at  | TEXT         |

---

### 🔗 Relationship

* One **content** can have multiple **approvals**
* (1 : many)

---

## 🎯 Key Features

* Role-based access control (RBAC)
* Multi-stage approval workflow
* Approval history tracking
* Comment-based rejection system
* Clean UI
* Modal-based actions (approve/reject)
* Table-based dashboard view

---

## ⚖️ Assumptions & Tradeoffs

### Assumptions

* No authentication system (roles are simulated)

### Tradeoffs

* SQLite used for simplicity instead of production DB
* No pagination (small dataset assumption)
* No real user management system

---

## 🚀 Future Improvements

* Add authentication (JWT / OAuth)
* Role-based login system
* Pagination & filtering
* Email/notification system
* Deployment (Vercel + Render)
* Advanced audit timeline UI
* API validation (Joi/Zod)
* Unit & integration tests

---

## 👨‍💻 Author

**Md Rehanuddin**
