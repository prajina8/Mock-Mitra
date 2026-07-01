# Mock Mitra — Loksewa Mock Test Frontend

A React + Tailwind CSS frontend for a Loksewa exam-prep app, with mock/sample
data standing in for the real question-bank API.

## Flow

1. **Landing page** (`/`) — dark hero with a faint repeating book pattern as
   an "opaque" background texture. Click **Log in** to continue.
2. **Login page** (`/login`) — login/signup toggle (demo mode, no real
   backend yet). Submitting takes you into the app.
3. **App pages** (`/app`, `/app/test`, `/app/results`, `/app/progress`) —
   protected by a simple `RequireAuth` wrapper; redirects to `/login` if not
   signed in.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    UI.jsx          shared atoms: Logo, Seal, Stamp, buttons, Field
    NavShell.jsx     authenticated app's top navigation
  data/
    questionBank.js  sample question bank + generateProbableSet()
  pages/
    Landing.jsx      public hero page (books background)
    Login.jsx        login/signup
    Dashboard.jsx     stats, subjects, recent attempts
    TestRunner.jsx   the mock test itself
    Results.jsx      score + answer review after submitting
    Progress.jsx     subject-wise accuracy + score trend
  App.jsx            route definitions
  main.jsx           React + Router entry point
```

## Connecting a real API

Replace `generateProbableSet()` in `src/data/questionBank.js` with a fetch
to your real "probable questions" endpoint, and replace the `onAuth` handler
in `Login.jsx` with a real authentication call. Everything downstream
(dashboard, test runner, results, progress) already consumes plain
JS objects, so no other component needs to change shape-wise as long as you
keep the same `{ id, subject, text, options, answer }` question schema.
