# 🎧 Helpdesk UI

A modern helpdesk and support ticket management interface inspired by platforms like Linear and Zendesk. Built with React, TypeScript, and Tailwind CSS to provide a clean and responsive ticket management experience.

## ✨ Features

- 🎫 **Ticket Management** – View and manage support tickets.
- 🔄 **Status & Priority Updates** – Update ticket statuses and priorities.
- 🔍 **Search & Filtering** – Find tickets efficiently.
- 💬 **Conversation Management** – Support public replies and private comments.
- 📊 **Analytics Dashboard** – Visualise ticket-related insights.
- 🏷️ **Ticket Properties** – Manage ticket attributes.
- 🗑️ **Delete Confirmation** – Confirmation dialogs for destructive actions.
- 📱 **Responsive Interface** – Adaptable UI across screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Development and build tool |
| shadcn/ui | UI components |
| React Query | Server-state management |
| Recharts | Data visualisation |
| React Router | Client-side routing |
| Express.js | Backend |

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/ianusha08/helpdesk-ui.git
cd helpdesk-ui
```

### 2. Start the frontend

```bash
npm install
npm run dev
```

### 3. Start the backend

Open another terminal:

```bash
cd server
npm install
node index.js
```


### 4. Environment Configuration

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:3001/api/tickets
```

Ensure the backend is running on the configured API URL.

## 🗺️ Future Improvements

- Authentication and role-based access control
- Database integration
- File attachments
- Email notifications
- Real-time ticket updates





