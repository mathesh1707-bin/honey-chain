import SunMark from "./SunMark";
export default function Header() {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.jpeg" alt="Solaris" className="h-12 w-12 rounded-full object-cover" />

        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-3xl text-ink tracking-tight">Solaris</h1>
          <span className="text-sm text-ink/60">Solar-powered drying cabinet</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-ink/70">
        <span className="rounded-full border border-ink/20 px-3 py-1 text-xs">SIH 26022</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
          </span>
          Live
        </span>
        <span className="font-mono text-ink/80">{time}</span>
      </div>
    </header>
  );
}