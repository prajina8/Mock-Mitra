# Mock Mitra — MERN Stack

Full-stack Loksewa mock-test prep app: MongoDB, Express, React, Node.

```
mock-mitra-mern/
  backend/     Express API + MongoDB models + JWT auth
  frontend/    React + Vite + Tailwind, talks to the API via axios
```

## 1. Backend setup

```bash
cd backend
cp .env.example .env     # then edit MONGO_URI / JWT_SECRET if needed
npm install
npm run seed              # populates the question bank with sample questions
npm run dev                # starts the API on http://localhost:5000
```

Requires a running MongoDB instance — either local (`mongodb://127.0.0.1:27017`)
or a connection string from MongoDB Atlas in `MONGO_URI`.

### API endpoints

| Method | Route                     | Auth | Description                              |
|--------|----------------------------|------|-------------------------------------------|
| POST   | `/api/auth/signup`         | —    | Create account, returns JWT               |
| POST   | `/api/auth/login`          | —    | Log in, returns JWT                       |
| GET    | `/api/auth/me`             | ✓    | Current user profile                      |
| GET    | `/api/questions/subjects`  | ✓    | List of exam subjects                     |
| GET    | `/api/questions/probable`  | ✓    | Random "probable" question set (no answers leaked) |
| GET    | `/api/questions`           | ✓    | Full question bank (admin/debug)          |
| POST   | `/api/questions`           | ✓    | Add a question to the bank                |
| POST   | `/api/attempts`            | ✓    | Submit answers, returns graded results    |
| GET    | `/api/attempts`            | ✓    | This user's attempt history                |
| GET    | `/api/attempts/progress`   | ✓    | Subject-wise accuracy + score trend       |

Protected routes expect `Authorization: Bearer <token>`.

## 2. Frontend setup

```bash
cd frontend
cp .env.example .env     # VITE_API_URL points at the backend
npm install
npm run dev                # opens on http://localhost:5173
```

## Flow

1. **Landing (`/`)** — book-textured hero, "Log in" button.
2. **Login (`/login`)** — real signup/login against the backend; JWT is
   stored in `localStorage` and attached to every API call automatically.
3. **App (`/app...`)** — Dashboard, Take Test, Results, Progress — each
   fetches live data from MongoDB through the Express API. Visiting any of
   these without a valid session redirects back to `/login`.

## Notes on grading

The frontend never receives correct answers before submission — the
`/api/questions/probable` route strips the `answer` field, and grading
happens server-side in `/api/attempts`, which re-checks every submitted
answer against the database. This keeps mock tests honest even if someone
inspects the frontend network traffic.

## Extending it

- Swap the random `$sample` query in `questionRoutes.js` for a smarter
  "probable questions" model (e.g. weighted by past performance, syllabus
  coverage, or difficulty progression).
- Add an admin UI for managing the question bank instead of POSTing
  directly to `/api/questions`.
- Add password reset / email verification to `authRoutes.js`.
