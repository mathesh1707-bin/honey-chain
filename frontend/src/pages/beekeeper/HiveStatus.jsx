import { useEffect, useState } from "react";
import api from "../../services/api";

export default function HiveStatus() {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ temperature: "", humidity: "", weightKg: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStatus = () => {
    api.get("/beekeeper/hive-status")
      .then((res) => setStatus(res.data))
      .catch((err) => setError(err.response?.data || "Couldn't load hive status."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStatus(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/beekeeper/hive-status", {
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        weightKg: Number(form.weightKg),
      });
      setForm({ temperature: "", humidity: "", weightKg: "" });
      fetchStatus(); // refresh the display with the new reading
    } catch (err) {
      setError(err.response?.data || "Couldn't save the reading.");
    }
  };

  if (loading) return <div className="container">Loading…</div>;

  return (
    <div className="container">
      <h1>Hive status</h1>

      {!status?.connected ? (
        <div className="offline-panel">
          <p>No readings recorded yet.</p>
          <p>Check the LCD display at the hive, or log a reading below.</p>
        </div>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat-block"><div className="value">{status.temperature}°</div><div className="label">Temperature (C)</div></div>
            <div className="stat-block"><div className="value">{status.humidity}%</div><div className="label">Humidity</div></div>
            <div className="stat-block"><div className="value">{status.weightKg}</div><div className="label">Hive weight (kg)</div></div>
          </div>
          <p className="sync-note">Last synced {new Date(status.lastSeen).toLocaleString()}</p>
        </>
      )}

      <h2 style={{ marginTop: "2.5rem", fontSize: "1.15rem" }}>Log a reading</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 320, marginTop: "1rem" }}>
        <label className="field-label">Temperature (°C)</label>
        <input className="field" name="temperature" type="number" step="any" value={form.temperature} onChange={handleChange} />
        <label className="field-label">Humidity (%)</label>
        <input className="field" name="humidity" type="number" step="any" value={form.humidity} onChange={handleChange} />
        <label className="field-label">Hive weight (kg)</label>
        <input className="field" name="weightKg" type="number" step="any" value={form.weightKg} onChange={handleChange} />
        {error && <p style={{ color: "var(--rust)", fontSize: "0.85rem" }}>{error}</p>}
        <button className="btn btn-gold btn-full">Save reading</button>
      </form>
    </div>
  );
}