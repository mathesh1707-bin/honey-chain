export default function DryProgress({ progress, remainingMin }) {
  const pct = Math.round(progress * 100);
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/40 p-7 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm text-ink/60">Drying progress</h2>
        <span className="font-mono text-xs text-ink/60">{remainingMin} min left</span>
      </div>
      <div className="relative mt-7 h-2 rounded-full bg-ink/15">
        <div className="absolute inset-y-0 left-0 rounded-full bg-orange" style={{ width: `${pct}%` }} />
        <div
          className="absolute -top-2 h-6 w-1.5 animate-ember rounded-full bg-red shadow-[0_0_10px_2px_rgba(223,48,28,0.6)]"
          style={{ left: `calc(${pct}% - 3px)` }}
        />
      </div>
      <div className="mt-4 font-display text-2xl text-ink">{pct}%</div>
    </div>
  );
}