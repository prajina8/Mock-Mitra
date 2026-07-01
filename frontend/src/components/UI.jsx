export function Seal({ size = 40 }) {
  return (
    <div
      className="relative shrink-0 rounded-full border-2 border-gold flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-[3px] rounded-full border border-gold/50" />
      <span className="font-serif text-gold font-bold" style={{ fontSize: size * 0.42 }}>
        म
      </span>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <Seal size={34} />
      <div className="leading-tight">
        <p className="font-serif text-[17px] font-semibold text-offwhite tracking-tight">Mock Mitra</p>
        <p className="text-[10px] tracking-[0.18em] text-muted uppercase">Loksewa Prep</p>
      </div>
    </div>
  );
}

export function Stamp({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/40 bg-crimson/10 px-2.5 py-1 text-[11px] font-medium text-[#F0746B] tracking-wide">
      {children}
    </span>
  );
}

export function PrimaryButton({ children, onClick, type = "button", className = "", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md bg-crimson px-5 py-2.5 text-sm font-semibold text-[#FAF8F4] transition-colors hover:bg-crimsonDark disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border border-line px-5 py-2.5 text-sm font-medium text-[#C7C4BC] transition-colors hover:border-gold/60 hover:text-offwhite ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, type = "text", value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-[#1A1816] px-3.5 py-2.5 text-sm text-offwhite placeholder:text-faint outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40"
      />
    </label>
  );
}
