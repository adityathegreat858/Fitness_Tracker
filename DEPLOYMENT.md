# Deployment Guide

## Recommended free deployment
- Frontend: **Vercel**
- Backend: **Render** or **Railway**

## What this repo now supports
- Frontend `client` uses `VITE_API_URL` to target the backend.
- Backend Strapi CORS is configured from `CORS_ORIGIN`.
- The app can now run in production without hardcoded `localhost:1337`.

## Frontend setup (Vercel)
1. Create a new Vercel project using the `client` folder as the root.
2. Set the build command to:
   ```bash
   npm run build
   ```
3. Set the output directory to:
   ```bash
   dist
   ```
4. Add an environment variable in Vercel:
   - `VITE_API_URL` = `https://YOUR_RENDER_BACKEND_URL/api`

## Backend setup (Render)
1. Create a new Render Web Service from the repository.
2. Use the root directory or the `server` folder as the working directory.
3. Set the build command to:
   ```bash
   cd server && npm install && npm run build
   ```
4. Set the start command to:
   ```bash
   cd server && npm start
   ```
5. Add required environment variables in the Render dashboard:
   - `HOST=0.0.0.0`
   - `PORT=1337`
   - `APP_KEYS` (comma-separated secret values)
   - `CORS_ORIGIN=https://YOUR_VERCEL_SITE_URL`
   - `API_TOKEN_SALT` (secret)
   - `ADMIN_JWT_SECRET` (secret)
   - `TRANSFER_TOKEN_SALT` (secret)
   - `JWT_SECRET` (secret)
   - `ENCRYPTION_KEY` (secret)
   - `GEMINI_API_KEY` (if you want AI image analysis)

## Local development
- `cd client && npm run dev`
- `cd server && npm run dev`
- Use `.env.example` files as a reference.

## Notes
- When deployed, you do not need to run `npm run dev`.
- Vercel will serve the frontend statically.
- Render will keep the backend running for you.
