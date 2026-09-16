import { useSensorSim } from "./hooks/useSensorSim";
import Header from "./components/Header";
import BatchHero from "./components/BatchHero";
import TrayReading from "./components/TrayList";
import SolarStatus from "./components/SolarStatus";
import DryProgress from "./components/DryProgress";

export default function App() {
  const s = useSensorSim();

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #FFD873 0%, #FF9100 45%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <Header />
        <div className="mt-10 space-y-6">
          <BatchHero
            avgTemp={s.avgTemp}
            avgHum={s.avgHum}
            moisture={s.moisture}
            batchNumber={s.batchNumber}
            heaterOn={s.heaterOn}
            fanOn={s.fanOn}
            remainingMin={s.remainingMin}
          />
          <div className="grid gap-6 sm:grid-cols-3">
            <TrayReading trays={s.trays} targetTemp={s.targetTemp} targetHum={s.targetHum} />
            <SolarStatus solar={s.solar} />
            <DryProgress progress={s.progress} remainingMin={s.remainingMin} />
          </div>
        </div>
        <footer className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink/50">
          Prototype dashboard for demo purposes, SIH 2026 — ID 26022
        </footer>
      </div>
    </div>
  );
}