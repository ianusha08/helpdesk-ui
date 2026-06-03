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
Create a `.env` file inside the project root:

```env
VITE_API_URL=http://localhost:3001/api/tickets
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── helpdesk/      # Domain components
│   └── ui/            # Reusable UI components
│
├── data/
│   └── mockData.ts    # Mock ticket & analytics data
│
├── lib/
│   └── api.ts         # API client
│
└── pages/
    ├── Index.tsx      # Main tickets view
    └── Analytics.tsx  # Analytics dashboard
```

---

## 📌 About

Built to explore React architecture patterns, component composition, and data-driven UI design.

This project demonstrates:

- React Query state management
- Component composition patterns
- Type-safe development with TypeScript
- Scalable UI architecture
- Data visualization using Recharts
- Consistent design systems using Tailwind CSS

---

## 💡 Why I Built This

This project was built to understand how modern support desk platforms manage tickets, communication workflows, and analytics at scale.

The primary goals were:

- Practice React architecture and component composition
- Improve TypeScript proficiency
- Build reusable UI systems
- Work with complex state management
- Create data-rich dashboards
- Simulate real-world SaaS product interfaces

Inspired by products such as:

- Linear
- Zendesk
- Jira Service Management

---

## 🚧 Future Improvements

- User Authentication & Authorization
- Role-Based Access Control
- Ticket Assignment Automation
- Email Notifications
- File Attachments
- Dark / Light Theme Toggle
- Database Integration
- Real-time Updates with WebSockets
- Team Management Features
- Activity Logs & Audit Trail

---
