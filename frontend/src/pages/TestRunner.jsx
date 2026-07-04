import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stamp, Seal, PrimaryButton, GhostButton } from "../components/UI.jsx";
import api from "../api/client.js";

const SUBJECTS = [
  { id: "gk", name: "General Knowledge", icon: "🏛️" },
  { id: "nepal", name: "Nepal Affairs", icon: "🇳🇵" },
  { id: "math", name: "Mental Ability", icon: "🧮" },
  { id: "constitution", name: "Constitution", icon: "📜" },
];

export default function TestRunner({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState({});
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
     
  .get("/questions/probable", { params: { count: 6 } })
  .then((res) => {
    console.log("Questions:", res.data);
    setQuestions(res.data);
  })
  .catch(() => setError("Could not load questions. Is the backend running and seeded?"))
    .finally(() => setLoading(false));
}, []);
  

  useEffect(() => {
    if (loading || error) return;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [loading, error]);

  if (loading) {
    return <p className="text-center text-sm text-faint py-20">Preparing your probable question set…</p>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <p className="text-sm text-[#F0746B] mb-4">{error}</p>
        <GhostButton onClick={() => navigate("/app")}>Back to dashboard</GhostButton>
      </div>
    );
  }

 if (questions.length === 0) {
  return (
    <div className="text-center py-20">
      <h2>No questions found.</h2>
    </div>
  );
}
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const choose = (optionIdx) => setPicked((p) => ({ ...p, [q._id]: optionIdx }));

  const finish = async () => {
    clearInterval(timerRef.current);
    setSubmitting(true);
    try {
      const answers = questions.map((qq) => ({
        questionId: qq._id,
        picked: picked[qq._id] ?? null,
      }));
      console.log("Submitting answers:", answers);
      const res = await api.post("/attempts", { answers, seconds });
      console.log("Submitting:", answers);
      onFinish(res.data);
      navigate("/app/results");
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit your test. Please try again.");
      setSubmitting(false);
    }
  };
  const q = questions[idx];

  const subj = SUBJECTS.find((s) => s.id === q.subject);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <Stamp>{subj?.icon} {subj?.name}</Stamp>
        <span className="font-mono text-sm text-gold">{mm}:{ss}</span>
      </div>

      <div className="mb-2 flex gap-1">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i === idx ? "bg-crimson" : i < idx ? "bg-[#3A3733]" : "bg-[#221F1B]"
            }`}
          />
        ))}
      </div>
      <p className="mb-6 text-xs text-muted">Question {idx + 1} of {questions.length}</p>

      <div className="rounded-xl border border-line bg-panel/60 p-6 relative overflow-hidden">
        <div className="absolute top-3 right-3 opacity-20">
          <Seal size={36} />
        </div>
        <h2 className="font-serif text-xl text-offwhite leading-snug pr-8">{q.text}</h2>

        <div className="mt-6 space-y-2.5">
          {q.options.map((opt, i) => {
            const selected = picked[q._id] === i;
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`w-full text-left rounded-md border px-4 py-3 text-sm transition-colors ${
                  selected
                    ? "border-gold bg-gold/10 text-offwhite"
                    : "border-line text-[#C7C4BC] hover:border-faint"
                }`}
              >
                <span className="font-mono text-xs text-muted mr-2.5">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="mt-4 text-center text-xs text-[#F0746B]">{error}</p>}

      <div className="mt-6 flex items-center justify-between">
        <GhostButton
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          className={idx === 0 ? "opacity-0 pointer-events-none" : ""}
        >
          ← Previous
        </GhostButton>

        {idx < questions.length - 1 ? (
          <PrimaryButton onClick={() => setIdx((i) => i + 1)}>Next →</PrimaryButton>
        ) : (
          <PrimaryButton onClick={finish} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit test"}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
