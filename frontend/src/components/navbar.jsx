import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";


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
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300 hover:shadow-lg animate-scale-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-extrabold text-yellow-600 tracking-tight hover:text-yellow-500 transition-colors duration-300"
            >
              🍽️ KateringRassya
            </Link>
          </div>

          {/* 🔹 Tengah: Menu Navigasi */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">

              {/* 🔹 Kanan: Cart + Login / User Info */}
              {/* 🛒 Cart Icon */}
              <Link to="/cart" className="relative group">
                <FaShoppingCart className="text-2xl text-gray-600 group-hover:text-yellow-600 transition-colors duration-300" />

                {/* 🔸 (Opsional) Jumlah item di keranjang */}
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  2
                </span>
              </Link>

              {isLoggedIn ? (
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
                  <NavLink to="/contact-us" className={getNavLinkClass}>
                    Contact
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* 🔹 Kanan: Login / User Info */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium animate-fade-in">
                    👋 Halo,{" "}
                    <span className="font-semibold text-yellow-700">
                      {user.name}
                    </span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 hover:shadow-md transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-sm hover:bg-yellow-600 hover:shadow-md transition-all duration-300">
                    Admin Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* 🔹 Hamburger Menu untuk Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button className="bg-yellow-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300">
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
