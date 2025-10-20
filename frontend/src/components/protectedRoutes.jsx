import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

// Komponen ini melindungi rute yang hanya bisa diakses oleh admin
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Tampilkan loading jika status auth belum selesai dicek
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Memverifikasi sesi...</p>
      </div>
    );
  }

  // 2. Jika sudah tidak loading dan tidak ada user (atau bukan admin), redirect
  if (!user || user.role !== "admin") {
    // Simpan lokasi terakhir user, agar setelah login bisa kembali
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Jika user adalah admin, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;
