import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function VerifyBatch() {
  const { batchCode } = useParams();
  const [batch, setBatch] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/public/verify/${batchCode}`)
      .then((res) => setBatch(res.data))
      .catch(() => setNotFound(true));
  }, [batchCode]);

  if (notFound) {
    return (
      <div className="verify-screen">
        <div className="seal-card"><div className="seal-body">This code doesn't match any recorded batch.</div></div>
      </div>
    );
  }

  if (!batch) return null; // brief loading flash, avoids a layout jump

  const mapEmbedUrl = `https://www.google.com/maps?q=${batch.latitude},${batch.longitude}&output=embed`;

  return (
    <div className="verify-screen">
      <div className="seal-card">
        <div className="seal-top">
          <div className="seal-mark">✓</div>
          <div>Verified batch</div>
        </div>
        <div className="seal-body">
          <div className="seal-row"><span className="k">Beekeeper</span><span>{batch.beekeeperName}</span></div>
          <div className="seal-row"><span className="k">Place</span><span>{batch.place}</span></div>
          <div className="seal-row"><span className="k">Quantity</span><span>{batch.quantityKg} kg</span></div>
          <div className="seal-row"><span className="k">Date</span><span>{batch.dateCreated}</span></div>
        </div>
        {batch.latitude && batch.longitude && (
          <iframe title="source-location" src={mapEmbedUrl} className="map-frame" loading="lazy" />
        )}
      </div>
    </div>
  );
}