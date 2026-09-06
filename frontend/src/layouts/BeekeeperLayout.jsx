import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BeekeeperLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bk-shell">
      <header className="bk-topbar">
        <span className="brand">Honey Chain</span>
        <nav>
          <NavLink to="/beekeeper/hive-status" className={({ isActive }) => isActive ? "active" : ""}>Hive status</NavLink>
          <NavLink to="/beekeeper/batches" className={({ isActive }) => isActive ? "active" : ""}>My batches</NavLink>
        </nav>
        <button className="logout" onClick={() => { logout(); navigate("/login"); }}>Log out</button>
      </header>
      <Outlet />
    </div>
  );
}