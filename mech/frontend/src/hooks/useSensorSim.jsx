import { useEffect, useRef, useState } from "react";

const TRAY_COUNT = 1;
const TARGET_TEMP = 45; // °C
const TARGET_HUM = 36; // %RH
const BATCH_MS = 8 * 60 * 1000; // compressed demo batch length

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function walk(value, step, min, max) {
  return clamp(value + (Math.random() - 0.5) * step, min, max);
}

function makeTray(id) {
  return {
    id,
    temp: TARGET_TEMP + (Math.random() - 0.5) * 2,
    hum: TARGET_HUM + (Math.random() - 0.5) * 4,
  };
}

export function useSensorSim() {
  const [trays, setTrays] = useState(() =>
    Array.from({ length: TRAY_COUNT }, (_, i) => makeTray(i + 1))
  );
  const [batchNumber, setBatchNumber] = useState(14);
  const [batchStart, setBatchStart] = useState(() => Date.now());
  const [moistureStart, setMoistureStart] = useState(() => 58 + Math.random() * 4);
  const [solar, setSolar] = useState({ battery: 72, irradiance: 61 });
  const heaterOnRef = useRef(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTrays((prev) =>
        prev.map((t) => ({
          ...t,
          temp: walk(t.temp, 0.6, TARGET_TEMP - 3.5, TARGET_TEMP + 3.5),
          hum: walk(t.hum, 1.1, TARGET_HUM - 7, TARGET_HUM + 7),
        }))
      );

      setSolar((prev) => {
        const irradiance = walk(prev.irradiance, 6, 5, 95);
        const charging = irradiance > 30;
        const battery = clamp(
          prev.battery + (charging ? 0.15 : -0.08) + (Math.random() - 0.5) * 0.3,
          8,
          100
        );
        return { battery, irradiance, charging };
      });

      const elapsed = Date.now() - batchStart;
      if (elapsed >= BATCH_MS) {
        setBatchNumber((n) => n + 1);
        setBatchStart(Date.now());
        setMoistureStart(58 + Math.random() * 4);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [batchStart]);

  const elapsed = clamp(Date.now() - batchStart, 0, BATCH_MS);
  const progress = elapsed / BATCH_MS;
  const moisture = clamp(moistureStart - progress * (moistureStart - 8.5), 8.5, moistureStart);

  const avgTemp = trays.reduce((s, t) => s + t.temp, 0) / trays.length;
  const avgHum = trays.reduce((s, t) => s + t.hum, 0) / trays.length;
  const heaterOn = avgTemp < TARGET_TEMP + (heaterOnRef.current ? 1 : -1);
  heaterOnRef.current = heaterOn;

  const remainingMs = BATCH_MS - elapsed;
  const remainingMin = Math.max(0, Math.round(remainingMs / 60000));

  return {
    trays,
    avgTemp,
    avgHum,
    moisture,
    progress,
    batchNumber,
    heaterOn,
    fanOn: heaterOn,
    remainingMin,
    solar,
    targetTemp: TARGET_TEMP,
    targetHum: TARGET_HUM,
  };
}