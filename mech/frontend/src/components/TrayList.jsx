function bandPosition(value, min, max) {
  return `${Math.round(((value - min) / (max - min)) * 100)}%`;
}

export default function TrayReading({ trays, targetTemp, targetHum }) {
  const tray = trays[0];
  const inBand = Math.abs(tray.temp - targetTemp) < 2 && Math.abs(tray.hum - targetHum) < 5;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white/40 p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-ink/60">Tray reading</h2>
        <span className={`text-xs ${inBand ? "text-leaf" : "text-red"}`}>
          ● {inBand ? "In range" : "Adjusting"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div
  className="rounded-lg bg-ink px-4 py-2 font-mono text-lg shadow-inner"
  style={{ color: "#4C9A3A" }}
>
  {tray.temp.toFixed(1)}°C&nbsp;&nbsp;{tray.hum.toFixed(0)}%RH
</div>
      </div>
      <div className="mt-5 h-1.5 rounded-full bg-ink/10">
        <div
          className={`h-1.5 rounded-full ${inBand ? "bg-leaf" : "bg-red"}`}
          style={{ width: bandPosition(tray.temp, targetTemp - 3.5, targetTemp + 3.5) }}
        />
      </div>
    </div>
  );
}