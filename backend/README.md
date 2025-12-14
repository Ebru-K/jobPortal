# Backend (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and set `MONGODB_URI`, `JWT_SECRET`, `PORT`, and `CLIENT_URL` (comma-separated origins, include your Netlify URL).
2. Install and run:
```bash
npm install
npm start
```
Health check: `GET /api/health`

## Deployment (Render)
- Root directory: `backend/`
- Build command: `npm install`
- Start command: `npm start`
- Env vars: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`
- Ensure MongoDB Atlas allows Render outbound IPs.

## Notes
- CORS uses `CLIENT_URL` to whitelist origins.
- JWT expiry is configured via `JWT_EXPIRE` (default `30d`).
- Static uploads are served from `backend/uploads` (create if needed).
