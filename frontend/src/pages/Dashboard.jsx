import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stamp, PrimaryButton } from "../components/UI.jsx";
import api from "../api/client.js";

const SUBJECTS = [
  { id: "gk", name: "General Knowledge", icon: "🏛️" },
  { id: "nepal", name: "Nepal Affairs", icon: "🇳🇵" },
  { id: "math", name: "Mental Ability", icon: "🧮" },
  { id: "constitution", name: "Constitution", icon: "📜" },
];

function StatCard({ label, value, suffix, accent }) {
  return (
    <div className="rounded-xl border border-line bg-panel/60 p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-2 font-mono text-3xl font-bold ${accent || "text-offwhite"}`}>
        {value}
        {suffix && <span className="text-base font-medium text-muted">{suffix}</span>}
      </p>
    </div>
  );
}

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/attempts")
      .then((res) => setAttempts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const avg = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.scorePct, 0) / attempts.length)
    : 0;
  const best = attempts.length ? Math.max(...attempts.map((a) => a.scorePct)) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <Stamp>Loksewa Aayog · Probable Set</Stamp>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-offwhite">Namaste, {user.name}.</h1>
          <p className="mt-1 text-sm text-muted max-w-md">
            Fresh probable questions are pulled from the question bank each time you sit a mock test.
          </p>
        </div>
        <PrimaryButton onClick={() => navigate("/app/test")}>Start a mock test →</PrimaryButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Tests taken" value={attempts.length} />
        <StatCard label="Average score" value={avg} suffix="%" accent="text-gold" />
        <StatCard label="Best score" value={best} suffix="%" accent="text-success" />
        <StatCard label="Subjects" value={SUBJECTS.length} />
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold mb-3">Subjects in rotation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUBJECTS.map((s) => (
            <div key={s.id} className="rounded-lg border border-line bg-panel/40 p-4 flex items-center gap-3">
              <span className="text-xl">{s.icon}</span>
              <span className="text-sm text-[#C7C4BC]">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold mb-3">Recent attempts</h2>
        {loading ? (
          <p className="text-sm text-faint">Loading…</p>
        ) : attempts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-faint">
            No attempts yet — take your first mock test to see results here.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead className="bg-panel text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5">Questions</th>
                  <th className="px-4 py-2.5">Correct</th>
                  <th className="px-4 py-2.5">Score</th>
                </tr>
              </thead>
              <tbody>
                {[...attempts].reverse().map((a) => (
                  <tr key={a._id} className="border-t border-line">
                    <td className="px-4 py-2.5 text-[#C7C4BC]">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2.5 text-[#C7C4BC]">{a.total}</td>
                    <td className="px-4 py-2.5 text-[#C7C4BC]">{a.correct}</td>
                    <td className="px-4 py-2.5 font-mono font-semibold text-gold">{a.scorePct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
