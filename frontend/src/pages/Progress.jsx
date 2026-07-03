import { useEffect, useState } from "react";
import { Stamp } from "../components/UI.jsx";

const SUBJECTS = [
  { id: "gk", name: "General Knowledge", icon: "🏛️" },
  { id: "nepal", name: "Nepal Affairs", icon: "🇳🇵" },
  { id: "math", name: "Mental Ability", icon: "🧮" },
  { id: "constitution", name: "Constitution", icon: "📜" },
];

import api from "../api/client.js";

export default function Progress() {
  const [bySubject, setBySubject] = useState({});
  const [scoreTrend, setScoreTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/attempts/progress")
      .then((res) => {
        setBySubject(res.data.bySubject || {});
        setScoreTrend(res.data.scoreTrend || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const hasData = scoreTrend.length > 0;

  return (
    <div className="space-y-8">
      <div>
       
        <h1 className="mt-3 font-serif text-2xl font-semibold">Your progress</h1>
      </div>

      {loading ? (
        <p className="text-sm text-faint">Loading…</p>
      ) : !hasData ? (
        <div className="rounded-lg border border-dashed border-line p-10 text-center text-sm text-faint">
          Take a mock test to start tracking subject-wise progress.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {SUBJECTS.map((s) => {
              const stat = bySubject[s.id];
              const pct = stat ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[#C7C4BC]">{s.icon} {s.name}</span>
                    <span className="font-mono text-muted">{stat ? `${stat.correct}/${stat.total}` : "—"}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#221F1B] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-crimson to-gold"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold mb-3">Score trend</h2>
            <div className="flex items-end gap-2 h-32 rounded-lg border border-line bg-panel/40 p-4">
              {scoreTrend.map((pct, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                  <div
                    className="w-full rounded-t bg-gold/70"
                    style={{ height: `${Math.max(pct, 4)}%` }}
                    title={`${pct}%`}
                  />
                  <span className="text-[9px] text-faint font-mono">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
