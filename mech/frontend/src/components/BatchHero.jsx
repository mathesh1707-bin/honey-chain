import ChamberGlyph from "./ChamberGlyph";

function Stat({ label, value, unit }) {
  return (
    <div>
      <div className="font-display text-5xl text-ink tabular-nums">
        {value}
        <span className="text-xl text-ink/50">{unit}</span>
      </div>
      <div className="mt-1 text-sm text-ink/60">{label}</div>
    </div>
  );
}

export default function BatchHero({ avgTemp, avgHum, moisture, batchNumber, heaterOn, fanOn, remainingMin }) {
  return (
    <section className="flex flex-col gap-8 rounded-2xl border border-ink/10 bg-white/40 p-7 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-6">
        <ChamberGlyph heaterOn={heaterOn} fanOn={fanOn} />
        <div>
          <div className="font-display text-xl text-ink">Batch {batchNumber}</div>
          <div className="mt-1.5 text-sm text-red">
            {heaterOn ? "Heater on, drying in progress" : "Holding, target temperature reached"}
          </div>
          <div className="mt-1 text-sm text-ink/60">About {remainingMin} min left in this batch</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <Stat label="Temperature" value={avgTemp.toFixed(1)} unit="°C" />
        <Stat label="Humidity" value={avgHum.toFixed(0)} unit="%" />
        <Stat label="Moisture remaining" value={moisture.toFixed(1)} unit="%" />
      </div>
    </section>
  );
}