import { useNavigate } from "react-router-dom";
import { Logo, PrimaryButton, GhostButton, Stamp } from "../components/UI.jsx";


function BookField() {
  const row = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.07] select-none pointer-events-none">
      {Array.from({ length: 6 }).map((_, r) => (
        <div
          key={r}
          className="flex gap-10 whitespace-nowrap"
          style={{ transform: `translateX(${r % 2 === 0 ? "-40px" : "-90px"})`, marginTop: r === 0 ? "10px" : "48px" }}
        >
          {row.map((_, i) => (
            <span key={i} className="text-[64px] leading-none">📖</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-ink overflow-hidden flex flex-col">
      <BookField />
            <div className="absolute inset-0 bg-ink/90" />

      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 py-6 flex items-center justify-between">
        <Logo />
        <GhostButton onClick={() => navigate("/login")} className="px-4 py-2 text-xs">
          Log in
        </GhostButton>
      </header>

      <main className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="flex justify-center mb-5">
            <Stamp>Loksewa Aayog · Practice Engine</Stamp>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-offwhite leading-tight">
            Your mitra for the<br />Loksewa exam shelf.
          </h1>
          <p className="mt-5 text-[#C7C4BC] text-base max-w-md mx-auto">
            Mock Mitra turns the question bank into fresh, probable mock tests — sit them,
            see what you missed, and watch your subject-wise progress build over time.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <PrimaryButton onClick={() => navigate("/login")}>Log in to begin →</PrimaryButton>
            <GhostButton onClick={() => navigate("/login")}>Create an account</GhostButton>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 py-6 text-center text-xs text-faint">
        Built for serious Loksewa preparation. Practice today, sit confidently tomorrow.
      </footer>
    </div>
  );
}
