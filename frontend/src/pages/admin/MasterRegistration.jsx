import { useState } from "react";
import api from "../../services/api";

export default function MasterRegistration() {
  const [role, setRole] = useState("BEEKEEPER");
  const [form, setForm] = useState({ fullName: "", place: "", phone: "", username: "", password: "" });
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const captureLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Location isn't supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => setLocationError("Couldn't get location — check permissions and try again.")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/admin/register", {
        ...form,
        role,
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
      });
      setMessage(`${role === "BEEKEEPER" ? "Beekeeper" : "Admin"} registered.`);
      setForm({ fullName: "", place: "", phone: "", username: "", password: "" });
      setLocation(null);
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h1>Register a user</h1>
      <p style={{ marginBottom: "1.5rem" }}>Admin accounts and beekeeper accounts are both created here.</p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <button type="button" className={role === "BEEKEEPER" ? "btn btn-gold" : "btn btn-outline"} onClick={() => setRole("BEEKEEPER")}>Beekeeper</button>
        <button type="button" className={role === "ADMIN" ? "btn btn-gold" : "btn btn-outline"} onClick={() => setRole("ADMIN")}>Admin</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="field-label">Full name</label>
        <input className="field" name="fullName" value={form.fullName} onChange={handleChange} />

        {role === "BEEKEEPER" && (
          <>
            <label className="field-label">Apiary location (place name)</label>
            <input className="field" name="place" value={form.place} onChange={handleChange} />

            <label className="field-label">GPS coordinates</label>
            <button type="button" className="btn btn-outline btn-full" style={{ marginBottom: "0.9rem" }} onClick={captureLocation}>
              {location ? `Captured: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : "Use current location"}
            </button>
            {locationError && <p style={{ color: "var(--rust)", fontSize: "0.8rem", marginTop: "-0.6rem" }}>{locationError}</p>}
          </>
        )}

        <label className="field-label">Phone number</label>
        <input className="field" name="phone" value={form.phone} onChange={handleChange} />
        <label className="field-label">Username</label>
        <input className="field" name="username" value={form.username} onChange={handleChange} />
        <label className="field-label">Temporary password</label>
        <input className="field" type="password" name="password" value={form.password} onChange={handleChange} />
        {error && <p style={{ color: "var(--rust)", fontSize: "0.85rem" }}>{error}</p>}
        {message && <p style={{ color: "var(--gold-dark)", fontSize: "0.85rem" }}>{message}</p>}
        <button className="btn btn-gold btn-full">Register {role === "BEEKEEPER" ? "beekeeper" : "admin"}</button>
      </form>
    </div>
  );
}