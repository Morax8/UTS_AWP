// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Anda berhasil Logout.");
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 bg-yellow-500 text-white flex flex-col p-6 shadow-2xl">
      <h1 className="text-2xl font-bold mb-8 text-center animate-pulse duration-1000">
        Katering Rassya
      </h1>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02]"
        >
          <FaHome /> Dashboard
        </Link>
        <Link
          to="/admin/master-menu"
          className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"
        >
          <FaUtensils /> Master Menu
        </Link>
        <Link
          to="/admin/master-pesanan"
          className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"
        >
          <FaClipboardList /> Master Pesanan
        </Link>
        <Link
          to="/admin/laporan"
          className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"
        >
          <FaUsers /> Laporan
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-red-600 w-full px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg transform hover:scale-[1.02] hover:shadow-red-800/50"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
