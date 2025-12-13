# JobFlow Portal

Full-stack job marketplace with a React/Vite frontend and Express/MongoDB backend.

## Repository Layout
```
root/
├─ backend/      # Express API (Render)
├─ frontend/     # Vite React app (Netlify)
├─ docs/         # Postman collection & docs
└─ .gitignore
```

## Prerequisites
- Node 18+ recommended
- MongoDB Atlas connection string
- Render account (backend) + Netlify account (frontend)

## Environment Variables
- Backend: copy `backend/.env.example` to `backend/.env` and fill `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`.
- Frontend: copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_BASE_URL` to your deployed API (e.g., `https://<render-app>.onrender.com/api`).
- Never commit `.env` files.

## Local Development
Backend:
```bash
cd backend
npm install
npm start    # starts API on PORT (default 5000)
```
Health check: `GET /api/health`

Frontend:
```bash
cd frontend
npm install
npm run dev  # starts Vite on http://localhost:5173
```

## Deployment
### Backend (Render)
1) Connect the repo and set the root directory to `backend/`.
2) Build/Start commands: `npm install` / `npm start`.
3) Environment variables: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (include Netlify URL, comma-separated if multiple).
4) Verify health: `https://<render-app>.onrender.com/api/health`.

### Frontend (Netlify)
1) Set base directory to `frontend/`, build command `npm run build`, publish directory `dist`.
2) Add env: `VITE_API_BASE_URL=https://<render-app>.onrender.com/api`.
3) SPA routing is handled via `public/_redirects`.

## Notes
- API base URLs and secrets are environment-driven; no localhost URLs are hard-coded for production.
- CORS allows the URL(s) specified in `CLIENT_URL` (comma-separated). Update it with your Netlify domain for production.
- MongoDB Atlas must allow Render outbound IPs or 0.0.0.0/0 during testing.
