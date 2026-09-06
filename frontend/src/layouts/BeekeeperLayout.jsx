import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BeeLogo from "../components/Beelogo";

export default function BeekeeperLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bk-shell">
      <header className="bk-topbar">
        <div className="brand-lockup">
          <BeeLogo size={22} color="#A6402A" />
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem" }}>Honey Chain</span>
        </div>
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