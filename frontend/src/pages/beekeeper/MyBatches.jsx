import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/beekeeper/batches")
      .then((res) => setBatches(res.data))
      .catch((err) => setError(err.response?.data || "Couldn't load your batches."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading…</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h1>My batches</h1>
      <p style={{ marginBottom: "1.5rem" }}>Logged whenever you drop off honey at the outlet.</p>
      {batches.length === 0 ? (
        <p>No batches logged yet.</p>
      ) : (
        <table className="record-table">
          <thead><tr><th>Date</th><th>Quantity</th><th>QR code</th></tr></thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id}>
                <td>{b.dateCreated}</td>
                <td>{b.quantityKg} kg</td>
                <td className="code">{b.qrCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}