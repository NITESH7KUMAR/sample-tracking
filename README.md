# Sample Tracking API – Backend Service (Node.js + TypeScript + MongoDB)

## 🚀 Project Overview

This project aims to build a backend API to streamline **biological sample logistics** between hospitals and labs. The backend handles scheduling, tracking, and managing the lifecycle of samples collected by field agents. The system is built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**.

The primary motivation behind this project is to provide a **robust, RESTful backend** that works even in **low-connectivity** environments, ensuring reliable sample tracking and minimal failure points.

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime environment
- **Express.js** – Web framework for building API endpoints
- **TypeScript** – For type safety and clean, maintainable code
- **MongoDB** – NoSQL database for storing users and sample details
- **Mongoose** – ODM for modeling MongoDB schema
- **JWT** – For authentication and session management
- **dotenv** – To manage environment variables

---

## ✅ Features Implemented in 2 Hours

Due to time constraints, the focus was on building **core, working modules** instead of a fully featured system. Below are the features implemented:

### 1. **User Authentication System**
- `POST /api/users/register`: Register a new user (hospital/lab/agent).
- `POST /api/users/login`: Login and receive JWT.
- JWT Token middleware to protect private routes.

> **Reason**: A secure login system is a foundation for any role-based application and helps protect critical endpoints.

---

### 2. **Sample Tracking Module**
- `POST /api/samples`: Add a new sample (requires JWT token).
- `GET /api/samples`: Retrieve all samples.
- Each sample has:
  - `sampleId`
  - `patientName`
  - `status` (Pending, Collected, In Transit, Delivered)
  - `location` (from → to)
  - `timestamp` of creation and update

> **Reason**: Sample tracking is the **core feature** of the app. Implementing this module demonstrates the main purpose of the system.

---

### 3. **Token-Based Access Control**
- Middleware protects sample endpoints.
- Ensures only authenticated users can access or manipulate sample data.

> **Reason**: Enabling secure access via JWT ensures the system is **scalable and production-ready**.

---

### 4. **Environment Configuration**
- Using `.env` for port, DB URL, and JWT secret.
- Keeps sensitive data secure and configurable.

---

## 📌 Why These Features Were Prioritized

In a 2-hour sprint, **building a working MVP (Minimum Viable Product)** was the key goal. Here's why only these modules were built:

| Feature | Reason |
|--------|--------|
| ✅ User Auth | Needed to secure access and test protected APIs |
| ✅ Sample APIs | Central to the tracking system |
| ⛔ Agent Offline Sync | Out of scope for MVP; requires queue-based/event-driven architecture |
| ⛔ Role-Based Access | Partially integrated; full RBAC implementation is time-consuming |
| ⛔ Real-time Notifications | Requires WebSocket integration or push mechanisms |
| ⛔ Unit Tests | Skipped due to time; would add in future sprints |

---

## 🧪 How to Test

### 1. Start Backend
```bash
npm install
npm run dev
