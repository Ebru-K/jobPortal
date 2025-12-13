# Frontend (Vite + React)

## Setup
1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend API (Render) ending with `/api`.
2. Install and run:
```bash
npm install
npm run dev
```

## Build / Deploy (Netlify)
- Base directory: `frontend/`
- Build command: `npm run build`
- Publish directory: `dist`
- Env vars: `VITE_API_BASE_URL=https://<render-app>.onrender.com/api`
- SPA routing handled by `public/_redirects`.

## Testing & Linting
- Unit tests: `npm test`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
