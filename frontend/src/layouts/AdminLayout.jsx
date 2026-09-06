import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BeeLogo from "../components/Beelogo";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-lockup" style={{ marginBottom: "2.5rem" }}>
          <BeeLogo size={26} color="#C9922A" />
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", color: "#fff" }}>
            Honey Chain
          </span>
        </div>
        <nav>
          <Link to="/admin/dashboard">Beekeepers</Link>
          <Link to="/admin/batches/new">New batch</Link>
          <Link to="/admin/register">Register user</Link>
          <Link to="/admin/chain-integrity">Chain integrity</Link>
        </nav>
        <button className="logout" onClick={() => { logout(); navigate("/login"); }}>
          Log out
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}