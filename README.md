# AICERTS Audit Trail Generator

Micro Full-stack application for tracking text changes with word-level diff analysis.

## Overview

Audit Trail Generator captures text modifications, identifies added and removed words, and maintains version history using SQLite.

## Features

- Word-level diff detection (added/removed words)
- Duplicate content prevention
- Responsive React interface
- Real-time version history display
- RESTful API endpoints

## Tech Stack

| Frontend           | Backend      | Database | Tools                  |
| ------------------ | ------------ | -------- | ---------------------- |
| React 19           | Express 5    | SQLite3  | Vite 7 + TailwindCSS 4 |
| react-router-dom 7 | sqlite 5.1.1 |          | Nodemon                |

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Backend Setup

```
cd backend
npm install
npm run dev
```

Server running at http://localhost:5000

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

Application running at http://localhost:5173

## API Endpoints

```
Save text version (auto-generates diff)
POST http://localhost:5000/save-version
Content-Type: application/json
{
  "text": "Node Js is runtime environment for javascript"
}

Retrieve version history
GET http://localhost:5000/versions
```

Sample Response:

```
[
  {
    "id": "uuid",
    "timestamp": "2025-11-30 14:35",
    "addedWords": ["Node", "runtime"],
    "removedWords": ["React"],
    "oldLength": 4,
    "newLength": 6,
    text: 'Node Js is runtime environment for javascript'
  }
]
```

## Project Structure

```
AICERTS-Audit-Trail/
├── backend/
│   ├── package.json
│   ├── audit.db
│   ├── app.http
│   └── src/
│       ├── controllers/auditController.js
│       ├── db/connectDB.js
│       ├── db/init.js
│       ├── routes/auditRoutes.js
│       ├── server.js
│       └── utils/formatData.js
├── frontend/
│   ├── package.json
│   └── src/
│       ├── pages/Home.jsx
│       ├── components/
│       │   ├── InputForm.jsx
│       │   ├── AuditLogs.jsx
│       │   ├── LogItem.jsx
│       │   ├── WordItems.jsx
│       │   ├── Button.jsx
│       │   └── Loader.jsx
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── README.md
```

## Environment Configuration

frontend/.env:

```
VITE_BASE_API_URL=http://localhost:5000
```

backend/.env:

```
PORT=5000
CLIENT_URL=http://localhost:5173
```

## Architecture Flow

```
InputForm → POST /save-version → auditController → SQLite
                      ↓
            formatData.js (diff logic)

AuditLogs ← GET /versions ← auditController
```

## Testing

- Use app.http file for testing api using a REST Client

## Deployment

- Frontend: Netlify (npm run build)
- Backend: Render (npm start)
