# External Design Document (EDD v1)
## JobFlow Portal - Job Marketplace Application

**Version:** 1.0  
**Date:** December 3, 2025  
**Project:** JobFlow Portal - MERN Stack Job Marketplace

---

## 1. Introduction

### 1.1 Purpose
JobFlow Portal is a full-stack web application that connects employers and job seekers. Employers can post job openings and review applicants, while job seekers can browse, apply, and track their applications.

### 1.2 Scope
- User authentication with role-based access (Employer, Job Seeker)
- RESTful API for job postings, applications, and user management
- Modern React UI with protected routes and responsive design
- MongoDB database for persistent data storage

---

## 2. System Overview

### 2.1 Architecture
**MERN Stack (MongoDB, Express, React, Node.js)**
- **Frontend:** React 18 + TypeScript, Vite build tool, Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)

### 2.2 Key Components

| Component | Purpose |
|-----------|---------|
| **Frontend (React)** | User interface, routing, form handling |
| **Backend (Express)** | API endpoints, business logic, authentication |
| **Database (MongoDB)** | Data persistence for users, jobs, applications |
| **Authentication** | JWT-based secure access control |

---

## 3. User Roles & Workflows

### 3.1 Job Seeker
1. Register/Login
2. Browse available jobs with filters
3. View job details
4. Submit applications
5. Track application status
6. View profile

### 3.2 Employer
1. Register/Login
2. Post new job openings
3. Manage posted jobs
4. Review applicants and their profiles
5. Update application status
6. View profile

---

## 4. Core Features

### 4.1 Authentication & Authorization
- User registration with email and password
- Login with JWT token generation
- Role-based access control (jobseeker/employer)
- Protected routes on frontend
- Middleware authentication on backend

### 4.2 Job Management
- Create, read, update, delete job postings
- Job search and filtering (location, salary, category)
- Pagination support
- Job details page with full information

### 4.3 Application Management
- Apply to jobs (job seekers only)
- View applications received (employers only)
- Track application status (pending, accepted, rejected)
- View applicant profiles and resumes

### 4.4 User Profile Management
- Update personal information
- Manage resume/CV
- View application history
- View job postings (employers)

---

## 5. Database Schema

### 5.1 Collections

**User**
```
- _id (ObjectId)
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: "jobseeker" | "employer")
- phone (String)
- location (String)
- bio (String)
- createdAt (Date)
- updatedAt (Date)
```

**JobPosting**
```
- _id (ObjectId)
- employer (ObjectId, ref: User)
- title (String)
- description (String)
- requirements (String)
- salary (Number)
- location (String)
- jobType (String: "Full-time" | "Part-time" | "Contract")
- category (String)
- status (String: "active" | "closed")
- createdAt (Date)
- updatedAt (Date)
```

**Application**
```
- _id (ObjectId)
- jobPosting (ObjectId, ref: JobPosting)
- applicant (ObjectId, ref: User)
- status (String: "pending" | "accepted" | "rejected")
- resume (String)
- coverLetter (String)
- appliedDate (Date)
- updatedAt (Date)
```

**Resume**
```
- _id (ObjectId)
- user (ObjectId, ref: User)
- title (String)
- experience (String)
- skills (Array)
- education (String)
- createdAt (Date)
- updatedAt (Date)
```

---

## 6. API Endpoints

### 6.1 Authentication Routes
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/profile        - Get logged-in user profile
```

### 6.2 Job Routes
```
GET    /api/jobs                - List all jobs (with filters & pagination)
GET    /api/jobs/:id            - Get job details
POST   /api/jobs                - Create job (employer only)
PUT    /api/jobs/:id            - Update job (owner only)
DELETE /api/jobs/:id            - Delete job (owner only)
```

### 6.3 Application Routes
```
GET    /api/applications        - Get user's applications
POST   /api/applications        - Submit application
GET    /api/applications/:id    - Get application details
PUT    /api/applications/:id    - Update application status (employer only)
DELETE /api/applications/:id    - Delete application
```

### 6.4 User Routes
```
GET    /api/users/:id           - Get user profile
PUT    /api/users/:id           - Update user profile
GET    /api/users/:id/resume    - Get user resume
```

---

## 7. Frontend Pages & Components

### 7.1 Pages
| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Jobs | `/jobs` | Public |
| Job Details | `/jobs/:id` | Public |
| Dashboard | `/dashboard` | Protected (both) |
| Profile | `/profile` | Protected (both) |
| Manage Jobs | `/employer/jobs` | Protected (employer) |
| My Applications | `/applications` | Protected (jobseeker) |
| Employer Applications | `/employer/applications` | Protected (employer) |

### 7.2 Reusable Components
- **Navbar:** Navigation and user menu
- **Footer:** Footer section
- **JobCard:** Job listing card
- **ProtectedRoute:** Route access control
- **LoadingSpinner:** Loading indicator
- **Chatbot:** Customer support chatbot

---

## 8. Technology Stack Details

### 8.1 Frontend Dependencies
- `react@18.3.1` - UI library
- `react-router-dom@6.30.0` - Client-side routing
- `typescript@5.5.3` - Type safety
- `tailwindcss@3.4.1` - Styling
- `axios@1.7.9` - HTTP client
- `lucide-react@0.344.0` - Icons
- `supabase@2.57.4` - File storage/auth

### 8.2 Backend Dependencies
- `express@4.21.2` - Web framework
- `mongoose@8.8.4` - MongoDB ODM
- `bcryptjs@2.4.3` - Password hashing
- `jsonwebtoken@9.0.2` - JWT tokens
- `cors@2.8.5` - Cross-origin requests
- `dotenv@16.4.7` - Environment variables
- `multer@1.4.5` - File uploads

### 8.3 Build & Dev Tools
- `vite@5.4.2` - Build tool
- `eslint@9.9.1` - Code linting
- `concurrently@9.1.0` - Run multiple commands

---

## 9. Security & Validation

### 9.1 Authentication
- Passwords hashed with bcryptjs
- JWT tokens for session management
- Protected API endpoints with middleware
- Protected frontend routes with ProtectedRoute component

### 9.2 Authorization
- Role-based access checks (jobseeker vs employer)
- Owner-only access to resources (jobs, applications)
- Middleware validation on backend routes

### 9.3 Input Validation
- Email format validation
- Required field validation
- Data type checking
- CORS enabled for allowed origins

---

## 10. Getting Started

### 10.1 Installation
```bash
npm install
```

### 10.2 Environment Setup
Create `.env` file with:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 10.3 Running the Application
```bash
npm run dev          # Run frontend + backend
npm run server       # Backend only
npm run client       # Frontend only
npm run build        # Production build
npm run seed         # Seed database with sample data
```

---

## 11. Error Handling & Validation

### 11.1 Backend Error Codes
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error

### 11.2 Frontend Error Handling
- Toast/alert notifications
- Form field validation with error messages
- Graceful fallbacks for API failures
- Loading states to prevent duplicate submissions

---

## 12. Future Enhancements

- [ ] OAuth/Social login integration
- [ ] Email notifications for application updates
- [ ] Advanced filtering and saved job preferences
- [ ] Company profiles with logos
- [ ] Interview scheduling system
- [ ] Analytics dashboard for employers
- [ ] Application status tracking notifications
- [ ] Resume file upload & parsing

---

## 13. Deployment

### 13.1 Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or Firebase Hosting
- Environment: Production build from Vite

### 13.2 Backend
- Deploy to: Heroku, Railway, or AWS
- MongoDB Atlas for cloud database
- Environment variables configured on hosting platform

---

## 14. Support & Contact

For questions or issues:
- Review API documentation: `docs/postman/Job-Portal-API.postman_collection.json`
- Check README for setup instructions
- Run tests: `npm test` (when available)

---

**End of External Design Document (EDD v1)**
