import { useNavigate, useLocation } from "react-router-dom";
import { Logo, GhostButton } from "./UI.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavShell({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const items = [
    { id: "/app", label: "Dashboard" },
    { id: "/app/test", label: "Take Test" },
    { id: "/app/progress", label: "Progress" },
  ];

  const isActive = (id) => (id === "/app" ? pathname === "/app" : pathname.startsWith(id));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-ink text-offwhite">
      <header className="border-b border-line bg-panel/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <nav className="hidden sm:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => navigate(it.id)}
                className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(it.id) ? "bg-crimson/15 text-[#F0746B]" : "text-muted hover:text-offwhite"
                }`}
              >
                {it.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted">{user?.name}</span>
            <GhostButton onClick={handleLogout} className="px-3.5 py-1.5 text-xs">
              Log out
            </GhostButton>
          </div>
        </div>
        <nav className="flex sm:hidden gap-1 px-3 pb-2.5">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => navigate(it.id)}
              className={`flex-1 rounded-md py-2 text-xs font-medium transition-colors ${
                isActive(it.id) ? "bg-crimson/15 text-[#F0746B]" : "text-muted"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
