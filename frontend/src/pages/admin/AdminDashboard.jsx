import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [beekeepers, setBeekeepers] = useState([]);
  const [batchCounts, setBatchCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBeekeepers = async () => {
      try {
        const res = await api.get("/admin/beekeepers");
        setBeekeepers(res.data);

        // backend doesn't return batchCount directly yet, so fetch each beekeeper's
        // batch list and derive the count client-side for now
        const counts = {};
        await Promise.all(
          res.data.map(async (bk) => {
            const batchesRes = await api.get(`/admin/batches/beekeeper/${bk.id}`);
            counts[bk.id] = batchesRes.data.length;
          })
        );
        setBatchCounts(counts);
      } catch (err) {
        setError(err.response?.data || "Couldn't load beekeepers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeekeepers();
  }, []);

  const handleDelete = async (e, id, name) => {
    e.stopPropagation(); // don't trigger the row's navigate-to-detail click
    if (!window.confirm(`Delete ${name}? This also removes their batches and hive readings.`)) return;
    try {
      await api.delete(`/admin/beekeepers/${id}`);
      setBeekeepers((prev) => prev.filter((bk) => bk.id !== id));
    } catch (err) {
      alert(err.response?.data || "Couldn't delete.");
    }
  };

  if (loading) return <div className="container">Loading beekeepers…</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <div className="page-head">
        <div>
          <h1>Beekeepers</h1>
          <p>{beekeepers.length} registered across the outlet's network</p>
        </div>
        <button className="btn btn-gold" onClick={() => navigate("/admin/batches/new")}>Log a new batch</button>
      </div>

      {beekeepers.length === 0 ? (
        <p>No beekeepers registered yet. Register one to get started.</p>
      ) : (
        <div className="ledger">
          {beekeepers.map((bk) => (
            <div key={bk.id} className="ledger-row" onClick={() => navigate(`/admin/beekeepers/${bk.id}`)}>
              <div>
                <div className="name">{bk.fullName}</div>
                <div className="place">{bk.place}</div>
              </div>
              <div className="place">{bk.phone}</div>
              <div className="batch-count">
                {batchCounts[bk.id] ?? "–"}
                <span className="label">batches</span>
              </div>
              <button
                className="btn btn-outline"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
                onClick={(e) => handleDelete(e, bk.id, bk.fullName)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}