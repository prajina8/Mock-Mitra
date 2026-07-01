import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TestRunner from "./pages/TestRunner.jsx";
import Results from "./pages/Results.jsx";
import Progress from "./pages/Progress.jsx";
import NavShell from "./components/NavShell.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-center text-sm text-faint py-20">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();
  const [lastAttempt, setLastAttempt] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <NavShell>
              <Dashboard user={user} />
            </NavShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/test"
        element={
          <RequireAuth>
            <NavShell>
              <TestRunner onFinish={setLastAttempt} />
            </NavShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/results"
        element={
          <RequireAuth>
            <NavShell>
              <Results attempt={lastAttempt} />
            </NavShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/progress"
        element={
          <RequireAuth>
            <NavShell>
              <Progress />
            </NavShell>
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
