Readme · MD
Copy

# 🎧 Helpdesk UI
 
A modern, full-featured support ticket management interface — inspired by tools like Linear and Zendesk. Built with React, TypeScript, and Tailwind CSS.
 
## ✨ Features
 
- **Ticket Management** — Create, update, delete, and prioritize tickets with a fluid 3-panel layout
- **Real-time Status Updates** — Change ticket status and priority with instant UI feedback via React Query mutations
- **Smart Filtering** — Filter tickets by view (My Tickets, High Priority, Unassigned, Past Due) and search by title or ID
- **Reply Composer** — Public replies and private comments with a rich toolbar UI
- **Analytics Dashboard** — Ticket volume trends, status/priority breakdown, resolution time distribution, and agent performance — all built with Recharts
- **Ticket Properties Panel** — Assignee, reporter, project, type, due date, tags, and linked tickets
- **Delete with Confirmation** — AlertDialog-guarded destructive actions
 
## 🛠 Tech Stack
 
| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + CSS custom properties |
| Components | shadcn/ui (Radix UI primitives) |
| Data fetching | TanStack React Query v5 |
| Charts | Recharts |
| Routing | React Router v6 |
| Backend | Express.js (Node) |
| Icons | Lucide React |
 
## 🚀 Getting Started
 
```bash
# Frontend
cd helpdesk-ui
npm install
npm run dev
```
 
```bash
# Backend (optional — app falls back to mock data without it)
cd helpdesk-ui/server
npm install
node index.js
```
 
Set your API URL in `helpdesk-ui/.env`:
 
```
VITE_API_URL=http://localhost:3001/api/tickets
```
 
## 📁 Project Structure
 
```
src/
├── components/
│   ├── helpdesk/       # Domain components (TicketList, TicketDetail, etc.)
│   └── ui/             # shadcn/ui base components
├── data/
│   └── mockData.ts     # Ticket data, types, analytics data
├── lib/
│   └── api.ts          # Axios API client
└── pages/
    ├── Index.tsx        # Main tickets view
    └── Analytics.tsx    # Analytics dashboard
```
 
## 📌 About
 
Built to explore React architecture patterns, component composition, and data-driven UI design. The project demonstrates state management with React Query, compound component patterns, and building consistent design systems with Tailwind CSS custom tokens.
