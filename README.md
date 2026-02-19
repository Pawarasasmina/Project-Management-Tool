# Project Manager (MERN + TypeScript)

Milestone 1 scaffold for a ClickUp-like internal project management app.

## Monorepo
- `server`: Express + TypeScript + Mongoose + JWT auth + RBAC middleware
- `client`: React + Vite + Tailwind + route/layout skeleton + animation wrappers

## Local setup
1. Copy env files:
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env`
2. Start MongoDB:
   - `docker compose up -d`
3. Install dependencies:
   - `npm install`
4. Run dev:
   - `npm run dev`

## Seed users
Run:
- `npm run seed`

Demo accounts:
- `admin@test.com / Password123!`
- `leader@test.com / Password123!`
- `member@test.com / Password123!`
