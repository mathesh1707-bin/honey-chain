import { useEffect, useState } from "react";
import api from "../../services/api";

export default function BatchRegistration() {
  const [beekeepers, setBeekeepers] = useState([]);
  const [beekeeperId, setBeekeeperId] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/beekeepers").then((res) => setBeekeepers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/admin/batches", {
        beekeeperId: Number(beekeeperId),
        quantityKg: Number(quantityKg),
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data || "Couldn't log the batch.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1>Log a new batch</h1>
      <p style={{ marginBottom: "1.5rem" }}>For a beekeeper dropping off honey at the outlet today.</p>

      <form onSubmit={handleSubmit}>
        <label className="field-label">Beekeeper</label>
        <select className="field" value={beekeeperId} onChange={(e) => setBeekeeperId(e.target.value)}>
          <option value="">Select beekeeper</option>
          {beekeepers.map((bk) => (
            <option key={bk.id} value={bk.id}>{bk.fullName} — {bk.place}</option>
          ))}
        </select>
        <label className="field-label">Quantity (kg)</label>
        <input className="field" type="number" value={quantityKg} onChange={(e) => setQuantityKg(e.target.value)} />
        <label className="field-label">Latitude (optional)</label>
        <input className="field" type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <label className="field-label">Longitude (optional)</label>
        <input className="field" type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        {error && <p style={{ color: "var(--rust)", fontSize: "0.85rem" }}>{error}</p>}
        <button className="btn btn-gold btn-full">Generate QR</button>
      </form>

      {result && (
        <div style={{ marginTop: "1.5rem", padding: "1.25rem", border: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>Batch logged</p>
          <p style={{ fontFamily: "monospace", fontSize: "1.1rem", marginBottom: "1rem" }}>{result.qrCode}</p>
          <img
            src={`data:image/png;base64,${result.qrImageBase64}`}
            alt="Batch QR code"
            style={{ width: 180, height: 180 }}
          />
        </div>
      )}
    </div>
  );
}