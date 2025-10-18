import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Helper function untuk styling NavLink di desktop
const getNavLinkClass = ({ isActive }) => {
  const baseClasses =
    "text-gray-500 hover:text-yellow-600 font-medium px-3 py-2 rounded-md text-sm transition-colors";
  return isActive ? `${baseClasses} text-yellow-600` : baseClasses;
};

// Helper function untuk styling NavLink di mobile
const getMobileNavLinkClass = ({ isActive }) => {
  const baseClasses =
    "block px-3 py-2 rounded-md text-base font-medium transition-colors";
  return isActive
    ? `${baseClasses} bg-yellow-100 text-yellow-700`
    : `${baseClasses} text-gray-600 hover:bg-gray-100 hover:text-gray-900`;
};

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Admin Zian" });
  const [isOpen, setIsOpen] = useState(false); // State untuk hamburger menu

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false); // Tutup menu mobile saat logout
  };

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
                  <NavLink to="/about" className={getNavLinkClass}>
                    Tentang Kami
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
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    Halo,{" "}
                    <span className="font-semibold text-yellow-700">
                      {user.name}
                    </span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-sm hover:bg-yellow-600 transition-all">
                    Admin Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger Menu untuk Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-yellow-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              <span className="sr-only">Buka menu</span>
              {isOpen ? (
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
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/master-pesanan"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Master Pesanan
                </NavLink>
                <NavLink
                  to="/admin/master-menu"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Master Menu
                </NavLink>
                <NavLink
                  to="/admin/laporan"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Laporan
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/menu"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/track"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Lacak Pesanan
                </NavLink>
                <NavLink
                  to="/about"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Tentang Kami
                </NavLink>
                <NavLink
                  to="/faq"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </NavLink>
                <NavLink
                  to="/contact-us"
                  className={getMobileNavLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Kontak
                </NavLink>
              </>
            )}
            <div className="border-t border-gray-200 mt-3 pt-3">
              {isLoggedIn ? (
                <div className="px-2 space-y-2">
                  <p className="text-gray-500 font-medium">Halo, {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 text-base font-medium text-white bg-red-600 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-base font-semibold text-white bg-yellow-500 rounded-lg shadow-sm hover:bg-yellow-600"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
