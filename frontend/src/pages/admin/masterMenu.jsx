import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaFacebookF, 
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function MasterMenu() {
  const navigate = useNavigate();

  // Fungsi untuk Logout
  const handleLogout = () => {
    alert("Anda berhasil Logout.");
    navigate("/auth/login"); 
  };

  // Data dummy untuk tabel Master Menu
  const menuData = [
    { id: 1, nama: "Nasi Box Ayam Bakar", harga: "Rp 25.000", kategori: "Nasi Box", status: "Tersedia" },
    { id: 2, nama: "Nasi Tumpeng Mini", harga: "Rp 150.000", kategori: "Tumpeng", status: "Pre-order" },
    { id: 3, nama: "Paket Prasmanan B", harga: "Rp 45.000/Pax", kategori: "Prasmanan", status: "Tersedia" },
    { id: 4, nama: "Snack Box Kue Tradisional", harga: "Rp 18.000", kategori: "Snack Box", status: "Habis" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* === Wrapper utama === */}
      <div className="flex flex-1">
        {/* === Sidebar === */}
        <aside className="w-64 bg-yellow-500 text-white flex flex-col p-6 shadow-2xl">
          <h1 className="text-2xl font-bold mb-8 text-center animate-pulse duration-1000">Katering Rassya</h1>

          <nav className="flex flex-col space-y-4">
            {/* LINK KE DASHBOARD - Ditambahkan efek hover interaktif */}
            <Link
              to="/admin/dashboard" 
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaHome /> Dashboard
            </Link>
            
            {/* LINK KE MASTER MENU (Active) - Ditambahkan efek shadow */}
            <Link
              to="/admin/master-menu"
              className="flex items-center gap-3 bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-xl" // Active Style
            >
              <FaUtensils /> Master Menu
            </Link>
            
            {/* LINK LAINNYA - Ditambahkan efek hover interaktif */}
            <Link
              to="/admin/master-pesanan" 
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaClipboardList /> Master Pesanan
            </Link>
            <Link
              to="/admin/laporan"
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaUsers /> Laporan
            </Link>
          </nav>

          <div className="mt-auto">
            {/* Tombol Logout - Ditambahkan efek hover dan shadow */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-red-600 w-full px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg transform hover:scale-[1.02] hover:shadow-red-800/50"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* === Main Content: Master Menu === */}
        <main className="flex-1 p-10">
          {/* Header - Ditambahkan animasi slide-in-down */}
          <header className="flex justify-between items-center mb-8 animate-slide-in-down" style={{ animationDelay: '100ms' }}>
            <h2 className="text-3xl font-bold text-yellow-700">Master Menu</h2>
            <div className="text-right">
              <p className="font-semibold text-gray-700">Kelola Menu Makanan</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </header>

          {/* Konten Utama - Ditambahkan animasi fade-in */}
          <div className="bg-white rounded-xl shadow-2xl p-6 border-t-4 border-yellow-500 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-700">Daftar Menu Katering</h3>
              {/* Tombol Tambah Menu - Ditambahkan efek hover interaktif */}
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-[1.05]">
                <FaPlus /> Tambah Menu Baru
              </button>
            </div>

            {/* Tabel Master Menu */}
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-700 bg-gray-100 border-b border-gray-300 sticky top-0 shadow-md">
                    <th className="p-4">ID</th>
                    <th className="p-4">Nama Menu</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Harga</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Efek hover pada baris tabel */}
                  {menuData.map((menu) => (
                    <tr key={menu.id} className="border-b border-gray-100 transition-all duration-200 hover:bg-yellow-50/50">
                      <td className="py-3 px-4 font-medium text-gray-600">{menu.id}</td>
                      <td className="py-3 px-4 font-semibold">{menu.nama}</td>
                      <td className="py-3 px-4">{menu.kategori}</td>
                      <td className="py-3 px-4 text-green-600">{menu.harga}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          menu.status === 'Tersedia' ? 'bg-green-100 text-green-700' :
                          menu.status === 'Pre-order' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        } transition-colors duration-300`}>
                          {menu.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        {/* Tombol Aksi dengan efek hover */}
                        <button 
                          title="Edit"
                          className="text-blue-500 hover:text-blue-700 transition-transform duration-200 transform hover:scale-125"
                        >
                          <FaEdit />
                        </button>
                        <button
                          title="Hapus"
                          className="text-red-500 hover:text-red-700 transition-transform duration-200 transform hover:scale-125"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* === Footer === (Tetap dengan animasi kustom) */}
      <footer className="bg-white text-gray-800 border-t border-gray-300 mt-10 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-8 md:space-y-0 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div className="text-3xl font-extrabold text-yellow-600 tracking-wider">
              KATERING RASSYA
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
                Tentang Kami
              </a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
                Layanan
              </a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
                Menu
              </a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
                Kontak
              </a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
                FAQ
              </a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
                Testimoni
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-start md:justify-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '800ms' }}>
            {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-125 shadow-md"
              >
                <Icon />
              </a>
            ))}
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* Bottom Links */}
          <div className="text-center text-sm text-gray-600 space-x-4 animate-slide-up" style={{ animationDelay: '1000ms' }}>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
              Price Disclaimer
            </a>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
              Responsible Disclosure
            </a>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}