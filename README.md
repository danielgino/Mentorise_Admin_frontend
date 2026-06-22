# Mentorise Admin Panel

Mentorise Admin Panel is the internal web management system for the Mentorise platform.
It provides administrators with the tools required to manage users, academic content, tutor applications, notifications, and platform activity from a single secured interface.

The admin panel is part of the Mentorise ecosystem, which connects students with peer tutors based on academic programs, courses, and learning needs. While the mobile app is used by students and tutors, this web application is used by authorized administrators to operate and control the platform.

## Main Features

### Admin Authentication

* Secure admin login using email and password
* JWT-based authentication
* Token validation on application startup
* Forgot password and reset password flows
* Protected admin routes
* Automatic redirect to login when authentication is missing or invalid

### Statistics Dashboard

The dashboard provides a high-level overview of platform activity, including:

* Total registered users
* Number of active tutors
* Completed lessons
* Total collected revenue
* Most requested tutoring course
* Leading tutor major
* Monthly user and session growth
* Course demand charts
* Major-based tutor distribution

The dashboard uses animated statistic cards, charts, progress indicators, and summary sections to make platform activity easy to review.

### User Management

Administrators can manage platform users through a dedicated user management page.

Supported actions include:

* View users in a paginated table
* Search and filter users
* Filter by role, alumni status, and join date
* Edit user details
* Delete users with confirmation
* Revoke tutor permissions
* Add new admin accounts
* Validate fields before submission
* Detect duplicate values such as existing email addresses

The user table supports both desktop and mobile layouts.

### Courses and Majors Management

The admin panel includes management tools for the academic catalog.

Administrators can:

* View and manage academic majors
* Add and edit majors
* View courses in a paginated table
* Add and edit courses
* Filter courses by major, year, and semester
* Search and sort course data
* Validate course forms before submission
* Handle duplicate course code conflicts

This section allows the platform to remain aligned with the institution's academic structure.

### Tutor Application Review

The tutor application workflow allows administrators to review students who apply to become tutors.

Administrators can:

* View tutor applications by status
* Search applications by national ID
* Open a detailed application drawer
* Review applicant details
* Review requested teaching scope
* View transcript links
* Review application text and update requests
* Approve applications with optional admin notes
* Reject applications with a required rejection reason

This process ensures that only approved tutors become available in the platform.

### Notifications

The admin panel supports sending push notifications to users of the mobile application.

Notification options include:

* Send to all users
* Send only to students
* Send only to tutors
* Title and message validation
* Character counters
* Success and failure feedback

This feature allows administrators to communicate important updates directly to the user base.

## Tech Stack

| Category             | Technology    |
| -------------------- | ------------- |
| Framework            | React         |
| Language             | TypeScript    |
| Build Tool           | Vite          |
| Routing              | React Router  |
| Styling              | Tailwind CSS  |
| HTTP Client          | Axios         |
| Charts               | Recharts      |
| Animation            | Motion / GSAP |
| Toasts               | Sonner        |
| Confirmation Dialogs | SweetAlert2   |
| Icons                | Lucide React  |

## Architecture

The project follows a modular frontend structure with separated API access, page components, shared UI assets, hooks, types, and utilities.

```txt
src/
├── api/                 # API modules and shared Axios client
├── assets/              # Reusable UI elements, inputs, buttons, loaders, skeletons
├── components/
│   ├── pages/           # Main page modules
│   ├── Navbar.tsx       # Main navigation
│   └── ProtectedRoute.tsx
├── hooks/               # User context and authentication hook
├── types/               # TypeScript DTOs and shared interfaces
└── utils/               # Validation, constants, formatting helpers
```

### API Layer

All server communication is handled through a single Axios client located in:

```txt
src/api/ApiClient.tsx
```

The API base URL is loaded from an environment variable:

```env
VITE_API_BASE_URL=http://localhost:8080
```

A request interceptor attaches the JWT token to outgoing requests:

```txt
Authorization: Bearer <token>
```

This keeps API authentication centralized and avoids duplicated request configuration across the application.

### API Modules

The API layer is divided by domain:

```txt
src/api/
├── ApiClient.tsx
├── AuthApi.tsx
├── MeApi.tsx
├── UsersManagementApi.tsx
├── CoursesApi.tsx
├── MajorsApi.tsx
├── TutorApplicationApi.tsx
├── NotificationsApi.tsx
├── AdminDashboardApi.tsx
└── NormalizeUser.tsx
```

Each module is responsible for a specific area of the admin system.

### Authentication State

Authentication state is managed through a React context.

```txt
src/hooks/
├── UserContext.ts
├── UserProvider.tsx
└── useUser.ts
```

The provider verifies the stored token on startup by requesting the current admin profile from the backend. Until this check is complete, the application displays a loading screen.

### Protected Routes

Authenticated pages are wrapped with `ProtectedRoute`.

Public routes:

```txt
/
admin/forgot-password
admin/reset-password
```

Protected routes include:

```txt
/statistics
/users
/courses
/requests
/notifications
```

If the user is not authenticated, the route redirects to the login page.

## UI and UX

The interface is designed for Hebrew-speaking administrators and uses right-to-left layout throughout the application.

Key UI details include:

* Full RTL support
* Hebrew labels and validation messages
* Responsive navigation
* Desktop tables and mobile-friendly card layouts
* Skeleton loaders while data is loading
* Debounced search fields
* Filter dropdowns
* Form validation with field-level errors
* Modal dialogs and slide-in drawers
* Confirmation dialogs for destructive actions
* Toast feedback for successful and failed operations
* Charts and animated dashboard cards

The design uses a consistent visual language across all pages, including gradients, soft shadows, glass-style surfaces, and animated transitions.

## Environment Variables

Create a local environment file based on the example file:

```bash
cp .env.example .env.local
```

Required variable:

```env
VITE_API_BASE_URL=http://localhost:8080
```

For local development, this should point to the Mentorise backend server.

No secrets should be committed to the repository.

## Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The application will be available through the Vite development server.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Code Quality

Run ESLint:

```bash
npm run lint
```

Current status:

* TypeScript build passes
* Production build passes
* ESLint has no errors
* A small number of React hook dependency warnings may remain where data fetching is intentionally controlled by specific state changes

## Deployment Notes

This application is intended to be used as an internal admin panel.

For production deployment:

* Serve the app over HTTPS
* Configure the correct backend API URL
* Restrict access to authorized administrators
* Keep environment files out of Git
* Apply security headers at the hosting, reverse proxy, or backend level
* Run dependency updates before production releases

## Related Mentorise Components

This repository contains only the Admin Web application.

The full Mentorise system also includes:

* Spring Boot backend API
* React Native mobile application
* MySQL database
* WebSocket-based chat infrastructure
* Push notification integration
* Cloud-based media handling

## Summary

Mentorise Admin Panel provides the operational tools required to manage the Mentorise platform. It centralizes user administration, academic catalog management, tutor approval workflows, notifications, and platform statistics in a secured web interface built with React and TypeScript.
