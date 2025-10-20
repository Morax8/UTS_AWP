import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/authContext";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  // 3. Fungsi logout sekarang memanggil fungsi dari context
  const handleLogout = () => {
    // Menambahkan konfirmasi untuk user experience yang lebih baik
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      logout(); // Fungsi ini akan menghapus token dan redirect
    }
  };

  // Helper buat nentuin link mana yang aktif
  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-yellow-700 shadow-xl scale-[1.02]"
      : "hover:bg-yellow-600 hover:shadow-lg hover:scale-[1.02]";

  return (
    <aside className="w-64 bg-yellow-500 text-white flex flex-col p-6 shadow-2xl">
      <h1 className="text-2xl font-bold mb-8 text-center animate-pulse duration-1000">
        Katering Rassya
      </h1>

      <nav className="flex flex-col space-y-4">
        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${isActive(
            "/admin/dashboard"
          )}`}
        >
          <FaHome /> Dashboard
        </Link>
        <Link
          to="/admin/master-menu"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${isActive(
            "/admin/master-menu"
          )}`}
        >
          <FaUtensils /> Master Menu
        </Link>
        <Link
          to="/admin/master-pesanan"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${isActive(
            "/admin/master-pesanan"
          )}`}
        >
          <FaClipboardList /> Master Pesanan
        </Link>
        <Link
          to="/admin/laporan"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${isActive(
            "/admin/laporan"
          )}`}
        >
          <FaUsers /> Laporan
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout} // Menggunakan fungsi logout yang baru
          className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-red-600 w-full px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg transform hover:scale-[1.02] hover:shadow-red-800/50"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
