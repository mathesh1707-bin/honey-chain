import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">Honey Chain</div>
        <nav>
          <Link to="/admin/dashboard">Beekeepers</Link>
          <Link to="/admin/batches/new">New batch</Link>
          <Link to="/admin/register">Register user</Link>
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