import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;
