import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, PrimaryButton, Field } from "../components/UI.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 27px, #C9A227 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, #C9A227 28px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        <button onClick={() => navigate("/")} className="mb-8 flex justify-center w-full">
          <Logo />
        </button>

        <div className="rounded-xl border border-line bg-panel/60 p-7 shadow-2xl shadow-black/40">
          <div className="mb-6 flex justify-center gap-1 rounded-md bg-[#1A1816] p-1">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`flex-1 rounded py-2 text-sm font-medium transition-colors ${
                  mode === m ? "bg-crimson text-white" : "text-muted hover:text-[#C7C4BC]"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sita Rai" />
            )}
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <p className="rounded-md border border-crimson/40 bg-crimson/10 px-3 py-2 text-xs text-[#F0746B]">
                {error}
              </p>
            )}

            <PrimaryButton type="submit" className="w-full mt-2" disabled={submitting}>
              {submitting ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
            </PrimaryButton>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-faint">
          Your account is stored in MongoDB — passwords are hashed, sessions use JWT.
        </p>
      </div>
    </div>
  );
}
