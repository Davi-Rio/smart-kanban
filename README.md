# 🚀 Smart Kanban

A modern SaaS-inspired Kanban system built with React, TypeScript and a scalable component architecture.

Live Demo:  
👉 https://davi-rio.github.io/smart-kanban/

---

## ✨ Overview

Smart Kanban is a modern project management interface inspired by Jira and enterprise SaaS platforms.

The goal of this project is to demonstrate:

- Clean UI/UX decisions
- Scalable front-end architecture
- Reusable components
- Modern React patterns
- State management using hooks
- Local persistence (localStorage)
- Modular page structure

This is not just a board — it's a complete mini SaaS interface.

---

## 🧩 Pages Implemented

### 📊 Dashboards
- KPI Cards (Total Issues, Backlog, In Progress, Completed)
- Status chart (dynamic based on board data)
- Recent activity section
- Sprint progress indicator
- Area filtering (Frontend, Backend, QA, DevOps, UX, Product)
- Dynamic connection with Board data

---

### 📋 Board
- Drag and drop (Dnd Kit)
- Multiple columns (To Do, In Progress, Done)
- Task creation modal
- Task editing
- Task deletion with confirmation modal
- Area filtering
- Search filtering
- Sprint support
- Local storage persistence

---

### 👥 Teams
- Team member cards
- Area-based filtering
- Dynamic task count per member (based on Board)
- Add new member functionality
- SaaS-style UI layout

---

### 🔌 Apps
- Connected vs Available integrations
- Connect / Disconnect functionality
- SaaS integrations layout
- Modular architecture for future expansion

---

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules
- Dnd Kit (Drag & Drop)
- LocalStorage for persistence
- GitHub Pages for deployment

---

## 🎨 UI Philosophy

The UI is inspired by:

- Jira Cloud
- Linear
- Modern SaaS dashboards
- Minimal dark interface systems

Design decisions:
- Gradient dark background
- Soft hover animations
- Clean spacing
- Consistent card system
- Area-based visual grouping
- Reusable layout components

---

## 📦 Project Structure

src/
├── components/
│ ├── Board/
│ ├── Column/
│ ├── Card/
│ ├── Modal/
│
├── pages/
│ ├── DashboardsPage/
│ ├── BoardPage/
│ ├── TeamsPage/
│ ├── AppsPage/
│
├── types/
│ └── task.ts


Architecture is modular and scalable.

---

## 🧠 State Strategy

- Tasks stored in localStorage
- Centralized board state
- Derived data used by:
  - Dashboard KPIs
  - Teams task counts
  - Charts
  - Sprint progress

This simulates real SaaS cross-page state synchronization.

---

## 🚀 Deployment

Deployed via:

- Vite build
- GitHub Pages

npm run build
npm run deploy


---

## 🎯 Purpose

This project was created to demonstrate:

- Front-end architecture maturity
- UI/UX consistency
- Real SaaS design thinking
- Production-level structure for a portfolio

---

## 🔮 Future Improvements

- Backend integration (Node / NestJS)
- Authentication
- Multi-user system
- Database persistence
- Real-time updates
- API-driven dashboard
- WebSocket support
- Role-based permissions

---

## 👨‍💻 Author

Davi Rio  
Full Stack Developer  
Automation & Systems Engineering

---

## 📄 License

MIT
