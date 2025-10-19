import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaSearch, 
  FaEye, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaTimesCircle, 
  FaFacebookF, 
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function MasterPesanan() {
  const navigate = useNavigate();

  // Fungsi untuk Logout
  const handleLogout = () => {
    alert("Anda berhasil Logout.");
    navigate("/auth/login");
  };

  // Data dummy untuk tabel Master Pesanan
  const pesananData = [
    { id: 101, pelanggan: "Andi Wijaya", menu: "Nasi Box Ayam Bakar", total: "Rp 750.000", tanggal: "20 Okt 2025", status: "Selesai" },
    { id: 102, pelanggan: "Siti Rahmawati", menu: "Nasi Tumpeng Mini", total: "Rp 300.000", tanggal: "21 Okt 2025", status: "Proses" },
    { id: 103, pelanggan: "Budi Santoso", menu: "Paket Prasmanan B", total: "Rp 2.250.000", tanggal: "22 Okt 2025", status: "Dibatalkan" },
    { id: 104, pelanggan: "Diana Putri", menu: "Snack Box", total: "Rp 400.000", tanggal: "23 Okt 2025", status: "Proses" },
  ];

  // Fungsi untuk mendapatkan style status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-700';
      case 'Proses':
        return 'bg-yellow-100 text-yellow-700';
      case 'Dibatalkan':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* === Wrapper utama === */}
      <div className="flex flex-1">
        {/* === Sidebar === */}
        <aside className="w-64 bg-yellow-500 text-white flex flex-col p-6 shadow-2xl">
          <h1 className="text-2xl font-bold mb-8 text-center animate-pulse duration-1000">Katering Rassya</h1>

          <nav className="flex flex-col space-y-4">
            {/* LINK KE DASHBOARD - Efek hover */}
            <Link
              to="/admin/dashboard" 
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaHome /> Dashboard
            </Link>
            
            {/* LINK KE MASTER MENU - Efek hover */}
            <Link
              to="/admin/master-menu"
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaUtensils /> Master Menu
            </Link>
            
            {/* LINK KE MASTER PESANAN (Active) - Efek shadow */}
            <Link
              to="/admin/master-pesanan" 
              className="flex items-center gap-3 bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-xl" // Active Style
            >
              <FaClipboardList /> Master Pesanan
            </Link>
            
            {/* LINK KE LAPORAN - Efek hover */}
            <Link
              to="/admin/laporan"
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaUsers /> Laporan
            </Link>
          </nav>

          <div className="mt-auto">
            {/* Tombol Logout - Efek hover dan shadow */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-red-600 w-full px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg transform hover:scale-[1.02] hover:shadow-red-800/50"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* === Main Content: Master Pesanan === */}
        <main className="flex-1 p-10">
          {/* Header - Ditambahkan animasi slide-in-down */}
          <header className="flex justify-between items-center mb-8 animate-slide-in-down" style={{ animationDelay: '100ms' }}>
            <h2 className="text-3xl font-bold text-yellow-700">Master Pesanan</h2>
            <div className="text-right">
              <p className="font-semibold text-gray-700">Kelola Semua Transaksi Pesanan</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </header>

          {/* Konten Utama - Ditambahkan animasi fade-in */}
          <div className="bg-white rounded-xl shadow-2xl p-6 border-t-4 border-yellow-500 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-700 mb-4 md:mb-0">Daftar Pesanan Terbaru</h3>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                {/* Input Pencarian - Transisi focus */}
                <div className="relative w-full">
                    <input 
                        type="text" 
                        placeholder="Cari Pesanan atau Pelanggan..."
                        className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg w-full focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 focus:shadow-md"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {/* Filter Status (Dummy) - Transisi focus */}
                <select className="py-2 px-3 border border-gray-300 rounded-lg bg-white focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200">
                    <option value="">Semua Status</option>
                    <option value="Proses">Proses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>
            </div>

            {/* Tabel Master Pesanan */}
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-700 bg-gray-100 border-b border-gray-300 sticky top-0 shadow-sm">
                    <th className="p-4">ID Pesanan</th>
                    <th className="p-4">Pelanggan</th>
                    <th className="p-4">Menu Dipesan</th>
                    <th className="p-4">Total Harga</th>
                    <th className="p-4">Tgl. Kirim</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Efek hover pada baris tabel */}
                  {pesananData.map((pesanan, index) => (
                    <tr key={pesanan.id} className="border-b border-gray-100 transition-all duration-200 hover:bg-yellow-50/50" style={{ animationDelay: `${500 + index * 100}ms` }}>
                      <td className="py-3 px-4 font-medium text-gray-600">#{pesanan.id}</td>
                      <td className="py-3 px-4 font-semibold">{pesanan.pelanggan}</td>
                      <td className="py-3 px-4">{pesanan.menu}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">{pesanan.total}</td>
                      <td className="py-3 px-4 text-gray-500">{pesanan.tanggal}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300 ${getStatusStyle(pesanan.status)}`}>
                          {pesanan.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-3">
                        {/* Tombol Aksi dengan efek hover transform */}
                        <button 
                          title="Lihat Detail"
                          className="text-blue-500 hover:text-blue-700 transition-transform duration-200 transform hover:scale-125"
                        >
                          <FaEye />
                        </button>
                        {pesanan.status === 'Proses' && (
                            <button
                                title="Tandai Selesai"
                                className="text-green-500 hover:text-green-700 transition-transform duration-200 transform hover:scale-125"
                            >
                                <FaCheckCircle />
                            </button>
                        )}
                          {pesanan.status !== 'Dibatalkan' && (
                            <button
                                title="Batalkan Pesanan"
                                className="text-red-500 hover:text-red-700 transition-transform duration-200 transform hover:scale-125"
                            >
                                <FaTimesCircle />
                            </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* === Footer === - Ditambahkan animasi slide-up dan delay */}
      <footer className="bg-white text-gray-800 border-t border-gray-300 mt-10 animate-fade-in" style={{ animationDelay: '600ms' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-8 md:space-y-0 animate-slide-up" style={{ animationDelay: '700ms' }}>
            <div className="text-3xl font-extrabold text-yellow-600 tracking-wider">
              KATERING RASSYA
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Tentang Kami</a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Layanan</a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Menu</a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Kontak</a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">FAQ</a>
              <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Testimoni</a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-start md:justify-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '900ms' }}>
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
          <div className="text-center text-sm text-gray-600 space-x-4 animate-slide-up" style={{ animationDelay: '1100ms' }}>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Price Disclaimer</a>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Responsible Disclosure</a>
            <a href="#" className="hover:text-yellow-600 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}