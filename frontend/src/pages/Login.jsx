import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(username, password);
      navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/beekeeper/hive-status");
    } catch (err) {
  setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-screen">
      <div className="login-hero">
        <h1>Every jar traces back to a hive.</h1>
        <p>Honey Chain records each batch from apiary to outlet, so a scan tells the real story behind it.</p>
      </div>
      <div className="login-form-side">
        <form className="login-form-box" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <label className="field-label">Username</label>
          <input className="field" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label className="field-label">Password</label>
          <input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-gold btn-full">Sign in</button>
        </form>
      </div>
    </div>
  );
}