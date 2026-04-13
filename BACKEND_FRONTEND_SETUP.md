# Backend to Frontend Connection - Setup Guide

## ✅ Completed Steps

### 1. API Client Created
- **File**: [client/src/assets/apiClient.ts](client/src/assets/apiClient.ts)
- A TypeScript API client class that wraps all Strapi backend API calls
- Handles authentication with JWT tokens from localStorage
- Methods for:
  - `auth.login()` - Login with identifier and password
  - `auth.register()` - Register a new user
  - `user.me()` - Get current authenticated user
  - `user.update()` - Update user profile
  - `foodLogs.*` - CRUD operations for food logs
  - `activityLogs.*` - CRUD operations for activity logs

### 2. Backend Configuration
- **CORS**: Already enabled in [server/config/middlewares.ts](server/config/middlewares.ts) via `'strapi::cors'`
- **Database**: SQLite configured at `.tmp/data.db`
- **Authentication**: Uses Strapi's built-in users-permissions plugin
- **Fixed typo**: Changed `colories` → `calories` in [food-log schema](server/src/api/food-log/content-types/food-log/schema.json)

### 3. Frontend Updates
- **AppContext**: Updated [client/src/context/AppContext.tsx](client/src/context/AppContext.tsx) to use `apiClient` instead of mock API
- **Credential Mapping**: Login uses `identifier` field, register maps `email` to `identifier` when needed
- **API Base URL**: `http://localhost:1337/api` (configured in apiClient.ts)

### 4. Servers Running
- ✅ Backend: `http://localhost:1337` (Strapi development server running)
- ✅ Frontend: `http://localhost:5173` (Vite development server running)

## 🚀 How to Use

### Frontend Development
```bash
cd client
npm run dev
# Opens at http://localhost:5173
```

### Backend Development
```bash
cd server
npm run develop
# Opens at http://localhost:1337
# Admin panel: http://localhost:1337/admin
```

## 📝 API Endpoints Available

All endpoints require Bearer token in Authorization header (except auth endpoints).

### Authentication
- `POST /api/auth/local` - Login
- `POST /api/auth/local/register` - Register

### User
- `GET /api/users/me` - Get current user
- `PUT /api/users/{id}` - Update user

### Food Logs
- `GET /api/food-logs?populate=*` - List all food logs
- `POST /api/food-logs` - Create food log
- `PUT /api/food-logs/{id}` - Update food log
- `DELETE /api/food-logs/{id}` - Delete food log

### Activity Logs
- `GET /api/activity-logs?populate=*` - List all activity logs
- `POST /api/activity-logs` - Create activity log
- `PUT /api/activity-logs/{id}` - Update activity log
- `DELETE /api/activity-logs/{id}` - Delete activity log

## 🔧 Key Configuration Files

- **Frontend API Config**: [client/src/assets/apiClient.ts](client/src/assets/apiClient.ts)
- **Backend CORS**: [server/config/middlewares.ts](server/config/middlewares.ts)
- **Backend Server Port**: [server/config/server.ts](server/config/server.ts) (default: 1337)
- **Food Log Schema**: [server/src/api/food-log/content-types/food-log/schema.json](server/src/api/food-log/content-types/food-log/schema.json)
- **Activity Log Schema**: [server/src/api/activity-log/content-types/activity-log/schema.json](server/src/api/activity-log/content-types/activity-log/schema.json)
- **User Schema**: [server/src/extensions/users-permissions/content-types/user/schema.json](server/src/extensions/users-permissions/content-types/user/schema.json)

## 🐛 Environment Variables

Currently using defaults. To customize:

**Backend (.env in server/)**:
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
```

**Frontend (.env in client/)**:
```
VITE_API_URL=http://localhost:1337/api
```

## 📋 Next Steps

1. Test user registration via frontend login page
2. Create sample food and activity logs
3. Verify data persists in Strapi SQLite database
4. Set up image analysis feature with Gemini API
5. Deploy to production (update API_BASE_URL in apiClient.ts)

## ⚠️ Notes

- All API responses follow Strapi's standard format with `data` wrapper
- Tokens are stored in localStorage under key `'token'`
- CORS is enabled - frontend can call backend from different port
- SQLite database: `.tmp/data.db` (reset if needed for fresh data)
