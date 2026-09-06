import { useState } from "react";
import api from "../../services/api";

export default function ChainIntegrity() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const runCheck = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/batches/chain/verify");
      setReport(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Chain integrity</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Every batch's record links to the one before it. If any batch is altered after the fact, its hash — and every hash after it — breaks.
      </p>
      <button className="btn btn-gold" onClick={runCheck} disabled={loading}>
        {loading ? "Checking…" : "Run integrity check"}
      </button>

      {report && (
        <table className="record-table" style={{ marginTop: "1.5rem" }}>
          <thead><tr><th>Batch</th><th>QR code</th><th>Status</th></tr></thead>
          <tbody>
            {report.map((row) => (
              <tr key={row.batchId}>
                <td>#{row.batchId}</td>
                <td className="code">{row.qrCode}</td>
                <td style={{ color: row.valid ? "var(--gold-dark)" : "var(--rust)", fontWeight: 500 }}>
                  {row.valid ? "Valid" : "Tampered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}