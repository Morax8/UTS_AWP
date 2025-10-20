import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

// --- Komponen Ikon SVG ---
const UserCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

// Helper function untuk styling NavLink
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-yellow-600 font-semibold"
    : "text-gray-500 hover:text-yellow-600 font-medium transition-colors";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  // --- PERBAIKAN DI SINI ---
  // Memberikan fallback array kosong `[]` untuk mencegah error jika cart masih undefined
  const cartItemCount = (cart || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Menutup profile dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menutup menu mobile saat navigasi
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Anda yakin ingin keluar?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Kiri: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="font-black text-yellow-500">Katering</span>
              <span className="font-light text-gray-700">Ku</span>
            </Link>
          </div>

          {/* Tengah: Menu Navigasi Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <NavLink to="/" className={getNavLinkClass}>
                Beranda
              </NavLink>
              <NavLink to="/menu" className={getNavLinkClass}>
                Menu
              </NavLink>
              <NavLink to="/track" className={getNavLinkClass}>
                Lacak Pesanan
              </NavLink>
              <NavLink to="/about" className={getNavLinkClass}>
                Tentang
              </NavLink>
              <NavLink to="/contact-us" className={getNavLinkClass}>
                Kontak
              </NavLink>
            </div>
          </div>

          {/* Kanan: Cart, Login / User Info Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/cart" className="relative group">
              <FaShoppingCart className="text-2xl text-gray-600 group-hover:text-yellow-600 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {!user ? (
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-sm hover:bg-yellow-600 transition-all">
                  Login
                </button>
              </Link>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  <span className="font-medium">{user.name}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {user.role === "admin" && (
                      <NavLink
                        to="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Dashboard Admin
                      </NavLink>
                    )}
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <UserCircleIcon /> Profil Saya
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogoutIcon /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger Menu untuk Mobile */}
          <div className="flex md:hidden">
            <Link to="/cart" className="relative group mr-4">
              <FaShoppingCart className="text-2xl text-gray-600 group-hover:text-yellow-600 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={getNavLinkClass}>
              Beranda
            </NavLink>
            <NavLink to="/menu" className={getNavLinkClass}>
              Menu
            </NavLink>
            <NavLink to="/track" className={getNavLinkClass}>
              Lacak Pesanan
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              Tentang
            </NavLink>
            <NavLink to="/contact-us" className={getNavLinkClass}>
              Kontak
            </NavLink>

            <div className="border-t my-2"></div>

            {!user ? (
              <Link to="/login" className="block text-center mt-2">
                <button className="w-full px-5 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-sm hover:bg-yellow-600 transition-all">
                  Login
                </button>
              </Link>
            ) : (
              <>
                {user.role === "admin" && (
                  <NavLink to="/admin/dashboard" className={getNavLinkClass}>
                    Dashboard
                  </NavLink>
                )}
                <NavLink to="/profile" className={getNavLinkClass}>
                  Profil Saya
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
