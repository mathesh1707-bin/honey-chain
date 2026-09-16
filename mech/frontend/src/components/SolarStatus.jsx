export default function SolarStatus({ solar }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/40 p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-ink/60">Solar power</h2>
        <span className="text-xs text-leaf">● {solar.charging ? "Charging" : "On battery"}</span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="font-display text-4xl text-ink tabular-nums">
          {solar.battery.toFixed(0)}
          <span className="text-lg text-ink/50">%</span>
        </div>
        <div className="text-right text-xs text-ink/60">
          <div>Irradiance {solar.irradiance.toFixed(0)}%</div>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-ink/10">
        <div className="h-2 rounded-full bg-orange" style={{ width: `${solar.battery}%` }} />
      </div>
    </div>
  );
}