# 🎧 Helpdesk UI

A modern, full-featured support ticket management interface inspired by tools like Linear and Zendesk. Built with React, TypeScript, and Tailwind CSS.

---

## ✨ Features

- **Ticket Management** — Create, update, delete, and prioritize tickets with a fluid 3-panel layout.
- **Real-time Status Updates** — Change ticket status and priority with instant UI feedback using React Query mutations.
- **Smart Filtering** — Filter tickets by view (My Tickets, High Priority, Unassigned, Past Due) and search by title or ID.
- **Reply Composer** — Public replies and private comments with a rich toolbar UI.
- **Analytics Dashboard** — Ticket volume trends, status/priority breakdown, resolution time distribution, and agent performance visualizations using Recharts.
- **Ticket Properties Panel** — Manage assignee, reporter, project, type, due date, tags, and linked tickets.
- **Delete with Confirmation** — AlertDialog-guarded destructive actions.

---

## 🛠 Tech Stack

| Layer | Technology |
|---------|---------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix UI) |
| State Management | TanStack React Query v5 |
| Charts | Recharts |
| Routing | React Router v6 |
| Backend | Express.js |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Frontend

```bash
cd helpdesk-ui
npm install
npm run dev
```

### Backend (Optional)

```bash
cd helpdesk-ui/server
npm install
node index.js
```
