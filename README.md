# Taskora — Frontend

**Plan clearly. Work smarter.**

Taskora is a task manager where you organise tasks into boards, track what's pending, overdue and done, and share boards with teammates as view-only.

This repository contains the React web application. It communicates with the [Taskora backend](https://github.com/FenilKhatri/todo-backend) through a REST API.

## Features

- **Authentication:** Log in, sign up, and log out with an optional "Remember me" feature. Sessions use an HTTP-only cookie set by the backend.
- **Forgot password:** Enter your email, verify a 6-digit OTP, set a new password, and return to login.
- **Home dashboard:** View task statistics, an "Up next" list, a progress ring with a priority breakdown, and your boards.
- **Tasks:**
  - Switch between list view and board view (Pending, Overdue, and Completed).
  - Search, filter by board, priority, or due date, and sort tasks.
  - Mark tasks as complete.
  - Add and edit tasks with priority, status, due date, quick date picks, and board assignment.
- **Boards:**
  - Create, edit, and delete boards.
  - Switch boards using a searchable dropdown.
  - Add tasks directly to a board column.
- **Sharing:** Share boards as view-only. Search for users, manage access, and remove users who no longer need access.
- **Profile:**
  - Upload a profile photo stored on Cloudinary and edit your name.
  - Change your email or password using OTP verification.
- **OTP verification:** Six-digit input with per-digit validation, error indicators, resend cooldown, and expiry countdown.

> **Note:** Email delivery is not configured yet, so OTP codes are displayed on screen instead of being emailed.

## Tech Stack

| Purpose | Technology |
|---|---|
| UI | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router 7 with lazy-loaded pages |
| HTTP client | Axios with `withCredentials` for authentication cookies |
| Validation | Zod |
| Icons | react-icons (Lucide and Feather sets) |

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- The Taskora backend running locally

Refer to the [backend repository](https://github.com/FenilKhatri/todo-backend) for backend setup instructions.

### Installation

```bash
git clone https://github.com/FenilKhatri/todo-frontend.git
cd todo-frontend
npm install
```

Create your environment file by copying `.env.example` to `.env`, then configure `VITE_API_URL`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Start the development server:

```bash
npm run dev
```

The application runs at **http://localhost:5173**.

The backend accepts requests from `http://localhost:5173`, `http://localhost:5174`, and the URL configured in its `FRONTEND_URL` setting. Use one of these ports or configure the backend to allow your development URL.

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:3000/api` |

If `VITE_API_URL` is not configured, the app defaults to `http://localhost:3000/api`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

The application is organised by feature. Each feature groups related API calls, constants, hooks, components, and pages.

```text
src/
├── app/
│   ├── router.jsx
│   ├── ProtectedRoutes.jsx
│   ├── app.constants.js
│   └── layouts/
├── components/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── tasks/
│   ├── boards/
│   ├── profile/
│   └── otp/
├── shared/
│   ├── lib/axios.js
│   ├── hooks/useZodForm.js
│   ├── validation/
│   └── constants/
└── index.css
```

### File Conventions

- `*.api.js` — API requests
- `*.constants.js` — Fixed values and options
- `*.schemas.js` — Zod validation schemas
- `hooks/` — Reusable state and logic
- `components/` — Presentational UI components
- `pages/` — Route screens

## Reusable Building Blocks

| Component or Hook | Purpose |
|---|---|
| `useZodForm(initialValues)` | Manages form values, field updates, Zod validation, and server error mapping. |
| `useOtpChallenge({ resend, verify, onVerified })` | Handles six-digit OTP entry, validation, expiry countdown, and resend cooldown. |
| `OtpVerification` | Reusable OTP verification screen driven by `useOtpChallenge`. |
| `SuccessPanel` / `SuccessModal` | Displays a success screen with an auto-redirect countdown. |
| `ModalShell` | Reusable modal layout used by task and board forms. |

## Related

- [Taskora Backend API](https://github.com/FenilKhatri/todo-backend)
