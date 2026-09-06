import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import BeekeeperLayout from "./layouts/BeekeeperLayout";

import Login from "./pages/Login";
import VerifyBatch from "./pages/public/VerifyBatch";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BeekeeperDetail from "./pages/admin/BeekeeperDetail";
import BatchRegistration from "./pages/admin/BatchRegistration";
import MasterRegistration from "./pages/admin/MasterRegistration";
import HiveStatus from "./pages/beekeeper/HiveStatus";
import MyBatches from "./pages/beekeeper/MyBatches";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:batchCode" element={<VerifyBatch />} />
          <Route path="/unauthorized" element={<div className="container">You don't have access to this page.</div>} />

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/beekeepers/:id" element={<BeekeeperDetail />} />
            <Route path="/admin/batches/new" element={<BatchRegistration />} />
            <Route path="/admin/register" element={<MasterRegistration />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["BEEKEEPER"]}><BeekeeperLayout /></ProtectedRoute>}>
            <Route path="/beekeeper/hive-status" element={<HiveStatus />} />
            <Route path="/beekeeper/batches" element={<MyBatches />} />
          </Route>

          <Route path="*" element={<div className="container">Page not found.</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}