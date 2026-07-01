import { Navigate, useNavigate } from "react-router-dom";
import { Seal, GhostButton, PrimaryButton } from "../components/UI.jsx";

export default function Results({ attempt }) {
  const navigate = useNavigate();
  if (!attempt) return <Navigate to="/app" replace />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl border border-line bg-panel/60 p-8 text-center relative overflow-hidden">
        <div className="flex justify-center mb-4">
          <Seal size={56} />
        </div>
        <p className="text-xs uppercase tracking-wide text-muted">Mock test complete</p>
        <p className="mt-2 font-mono text-5xl font-bold text-gold">{attempt.scorePct}%</p>
        <p className="mt-2 text-sm text-muted">
          {attempt.correct} of {attempt.total} correct · {Math.floor(attempt.seconds / 60)}m {attempt.seconds % 60}s
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {attempt.questions.map((q, i) => (
          <div key={q.id} className="rounded-lg border border-line bg-panel/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-offwhite">{i + 1}. {q.text}</p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  q.isCorrect ? "bg-success/15 text-[#5FC98A]" : "bg-crimson/15 text-[#F0746B]"
                }`}
              >
                {q.isCorrect ? "Correct" : "Incorrect"}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Your answer:{" "}
              <span className="text-[#C7C4BC]">{q.picked != null ? q.options[q.picked] : "Skipped"}</span>
            </p>
            {!q.isCorrect && <p className="text-xs text-[#5FC98A]">Correct answer: {q.options[q.answer]}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <GhostButton onClick={() => navigate("/app")}>Back to dashboard</GhostButton>
        <PrimaryButton onClick={() => navigate("/app/test")}>Take another test</PrimaryButton>
      </div>
    </div>
  );
}
