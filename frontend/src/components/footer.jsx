import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) return null; // jangan render footer kalau di admin

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-8 md:space-y-0">
          <div className="text-3xl font-extrabold text-yellow-500 tracking-wider">
            KATERINGKU
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <Link
              to="/menu"
              className="hover:text-yellow-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/track-order"
              className="hover:text-yellow-600 transition-colors"
            >
              Lacak Pesanan
            </Link>
            <Link to="/faq" className="hover:text-yellow-600 transition-colors">
              FAQ
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-yellow-600 transition-colors"
            >
              Kontak
            </Link>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} KateringKu. Dibuat dengan ❤️ untuk UTS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
