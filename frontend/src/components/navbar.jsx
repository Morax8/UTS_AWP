import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext"; // <-- 1. IMPORT KEMBALI useCart
import { FaShoppingCart } from "react-icons/fa";


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
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// Helper function untuk styling NavLink
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-yellow-600 font-medium px-3 py-2"
    : "text-gray-500 hover:text-yellow-600 font-medium px-3 py-2";
const getMobileNavLinkClass = ({ isActive }) =>
  isActive
    ? "bg-yellow-100 text-yellow-700 block px-3 py-2 rounded-md text-base font-medium"
    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart(); // <-- 2. PANGGIL KEMBALI useCart
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Kiri: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="font-black text-yellow-500">Katering</span>
              <span className="font-light text-gray-700">Ku</span>
            </Link>
          </div>

          {/* Tengah: Menu Navigasi Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {currentUser?.role === "admin" ? (

            <div className="ml-10 flex items-center space-x-6">
              {/* 🔹 Kanan: Cart + Login / User Info */}
              {/* 🛒 Cart Icon */}
              <Link to="/cart" className="relative group">
                <FaShoppingCart className="text-2xl text-gray-600 group-hover:text-yellow-600 transition-colors duration-300" />

                {/* 🔸 (Opsional) Jumlah item di keranjang */}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                    {totalItems}
                  </span>
                )}

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
                </>
              ) : (
                <>
                  <NavLink to="/menu" className={getNavLinkClass}>
                    Menu
                  </NavLink>
                  <NavLink to="/track-order" className={getNavLinkClass}>
                    Lacak Pesanan
                  </NavLink>
                  <NavLink to="/about" className={getNavLinkClass}>
                    Tentang
                  </NavLink>
                  <NavLink to="/faq" className={getNavLinkClass}>
                    FAQ
                  </NavLink>
                  <NavLink to="/contact-us" className={getNavLinkClass}>
                    Kontak
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Kanan: Login / User Info Desktop */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-5">
              {/* --- 3. TAMBAHKAN KEMBALI IKON KERANJANG DI SINI --- */}
              {(!currentUser || currentUser.role === "customer") && (
                <Link to="/cart" className="relative group">
                  <CartIcon className="text-gray-600 group-hover:text-yellow-600 transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {!currentUser ? (
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-sm hover:bg-yellow-600 transition-all">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
                  >
                    <span className="font-medium">{currentUser.name}</span>
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
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
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
          </div>

          {/* Hamburger Menu untuk Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-yellow-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* ... Logika menu mobile bisa kamu sesuaikan seperti menu desktop ... */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
