import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("honeychain_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("honeychain_user", JSON.stringify(user));
    else localStorage.removeItem("honeychain_user");
  }, [user]);

  const login = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    // response.data = { token, role, username }
    setUser(response.data);
    return response.data;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);