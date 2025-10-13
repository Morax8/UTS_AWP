import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Helper function untuk NavLink agar bisa menggabungkan class
const getNavLinkClass = ({ isActive }) => {
  const baseClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  if (isActive) {
    return `${baseClasses} bg-gray-900 text-white`;
  }
  return `${baseClasses} text-gray-500 hover:bg-gray-700 hover:text-white`;
};

function Navbar() {
  // --- SIMULASI STATUS LOGIN ---
  // Nantinya, state ini akan datang dari context atau state management.
  // Ubah ke `true` untuk melihat tampilan navbar admin.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Admin Zian" }); // Contoh data user

  const handleLogout = () => {
    // Logika untuk logout nanti akan ada di sini
    setIsLoggedIn(false);
    // Di aplikasi nyata, Anda akan redirect atau refresh
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bagian Kiri: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              KateringKu
            </Link>
          </div>

          {/* Bagian Tengah: Menu Navigasi */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isLoggedIn ? (
                /* --- TAMPILAN UNTUK ADMIN YANG SUDAH LOGIN --- */
                <>
                  <NavLink to="/admin/dashboard" className={getNavLinkClass}>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/admin/master-pesanan"
                    className={getNavLinkClass}
                  >
                    Master Pesanan
                  </NavLink>
                  <NavLink to="/admin/master-menu" className={getNavLinkClass}>
                    Master Menu
                  </NavLink>
                  <NavLink to="/admin/laporan" className={getNavLinkClass}>
                    Laporan
                  </NavLink>
                </>
              ) : (
                /* --- TAMPILAN UNTUK PENGUNJUNG BIASA --- */
                <>
                  <NavLink to="/menu" className={getNavLinkClass}>
                    Menu
                  </NavLink>
                  <NavLink to="/track" className={getNavLinkClass}>
                    Lacak Pesanan
                  </NavLink>
                  <NavLink to="/faq" className={getNavLinkClass}>
                    FAQ
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Bagian Kanan: Info User atau Tombol Login */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Halo, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Admin Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger Menu untuk Mobile (Belum fungsional, hanya tampilan) */}
          <div className="-mr-2 flex md:hidden">
            <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
