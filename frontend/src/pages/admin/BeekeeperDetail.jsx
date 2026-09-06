import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function BeekeeperDetail() {
  const { id } = useParams();
  const [beekeeper, setBeekeeper] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bkRes, batchesRes] = await Promise.all([
          api.get(`/admin/beekeepers/${id}`),
          api.get(`/admin/batches/beekeeper/${id}`),
        ]);
        setBeekeeper(bkRes.data);
        setBatches(batchesRes.data);
      } catch (err) {
        setError(err.response?.data || "Beekeeper not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="container">Loading…</div>;
  if (error || !beekeeper) return <div className="container">{error || "Beekeeper not found."}</div>;

  return (
    <div className="container">
      <Link to="/admin/dashboard" style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>Back to beekeepers</Link>
      <div className="page-head" style={{ marginTop: "0.75rem" }}>
        <div>
          <h1>{beekeeper.fullName}</h1>
          <p>{beekeeper.place} · {beekeeper.phone}</p>
        </div>
      </div>

      {batches.length === 0 ? (
        <p>No batches logged for this beekeeper yet.</p>
      ) : (
        <table className="record-table">
          <thead>
            <tr><th>Date</th><th>Quantity</th><th>QR code</th></tr>
          </thead>
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