import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  // Ikon Laporan
  FaFilter,
  FaFileExport,
  FaListAlt,
  // Ikon Footer
  FaFacebookF, 
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

// Data dummy untuk Report Table
const reportData = [
    { id: 'R001', date: '2025-10-15', menu: 'Nasi Box Ayam Bakar', quantity: 150, price: 25000, total: 3750000, status: 'Lunas' },
    { id: 'R002', date: '2025-10-15', menu: 'Paket Prasmanan A', quantity: 80, price: 50000, total: 4000000, status: 'Lunas' },
    { id: 'R003', date: '2025-10-16', menu: 'Nasi Tumpeng Mini', quantity: 10, price: 150000, total: 1500000, status: 'Belum Lunas' },
    { id: 'R004', date: '2025-10-17', menu: 'Snack Box Standard', quantity: 200, price: 5000, total: 1000000, status: 'Lunas' },
    { id: 'R005', date: '2025-10-17', menu: 'Nasi Goreng Spesial', quantity: 50, price: 20000, total: 1000000, status: 'Lunas' },
];

export default function Laporan() {
  const navigate = useNavigate();
  const [filterMonth, setFilterMonth] = useState('10');
  const [filterYear, setFilterYear] = useState('2025');

  const handleLogout = () => {
    alert("Anda berhasil Logout.");
    navigate("/auth/login"); 
  };
  
  // Fungsi format mata uang
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };
  
  // Hitung total dari data dummy
  const totalIncome = reportData.reduce((sum, item) => item.status === 'Lunas' ? sum + item.total : sum, 0); // Hanya hitung Lunas
  const totalOrders = reportData.length;
  const totalLunas = reportData.filter(item => item.status === 'Lunas').length;

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
            
            {/* LINK KE MASTER PESANAN - Efek hover */}
            <Link
              to="/admin/master-pesanan" 
              className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <FaClipboardList /> Master Pesanan
            </Link>
            
            {/* LINK KE LAPORAN (Active) - Efek shadow */}
            <Link
              to="/admin/laporan"
              className="flex items-center gap-3 bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-xl"
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

        {/* === Main Content: Laporan Penjualan === */}
        <main className="flex-1 p-10">
          {/* Header - Ditambahkan animasi slide-in-down */}
          <header className="flex justify-between items-center mb-8 animate-slide-in-down" style={{ animationDelay: '100ms' }}>
            <h2 className="text-3xl font-bold text-yellow-700 flex items-center gap-2">
                <FaListAlt /> Laporan Penjualan
            </h2>
            <div className="text-right">
              {/* Tombol Export - Efek hover interaktif */}
              <button 
                  className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.05]"
                  onClick={() => alert('Fitur Export ke Excel/PDF belum diimplementasikan.')}
              >
                  <FaFileExport /> Export Data
              </button>
            </div>
          </header>

          {/* === 1. Area Filter === - Animasi fade-in dengan border yang menonjol */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-start border-l-4 border-yellow-500 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h4 className="font-semibold text-gray-700 flex items-center gap-2 mr-4">
                <FaFilter className="text-yellow-600" /> Filter Periode:
            </h4>
            
            {/* Filter Bulan */}
            <div className="flex items-center gap-2">
                <label htmlFor="month" className="text-gray-600 text-sm">Bulan:</label>
                <select 
                    id="month" 
                    value={filterMonth} 
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 cursor-pointer"
                >
                    <option value="10">Oktober</option>
                    <option value="09">September</option>
                    <option value="08">Agustus</option>
                    {/* Tambahkan bulan lainnya */}
                </select>
            </div>
            
            {/* Filter Tahun */}
            <div className="flex items-center gap-2">
                <label htmlFor="year" className="text-gray-600 text-sm">Tahun:</label>
                <select 
                    id="year" 
                    value={filterYear} 
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 cursor-pointer"
                >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                </select>
            </div>
          </div>

          {/* === 2. Kartu Ringkasan Metrik (Berdasarkan Filter) === - Animasi slide-up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Total Pendapatan */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] animate-slide-up" style={{ animationDelay: '400ms' }}>
              <p className="text-gray-500 text-sm">Total Pendapatan (Lunas)</p>
              <h3 className="text-3xl font-extrabold text-green-700 mt-1">{formatRupiah(totalIncome)}</h3>
              <p className="text-sm text-gray-500 mt-1">Dari {totalOrders} Transaksi bulan ini</p>
            </div>

            {/* Card 2: Total Transaksi */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] animate-slide-up" style={{ animationDelay: '500ms' }}>
              <p className="text-gray-500 text-sm">Total Transaksi</p>
              <h3 className="text-3xl font-extrabold text-yellow-700 mt-1">{totalOrders}</h3>
              <p className="text-sm text-gray-500 mt-1">Pesanan yang tercatat</p>
            </div>

            {/* Card 3: Transaksi Lunas */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] animate-slide-up" style={{ animationDelay: '600ms' }}>
              <p className="text-gray-500 text-sm">Transaksi Lunas</p>
              <h3 className="text-3xl font-extrabold text-blue-700 mt-1">{totalLunas}</h3>
              <p className="text-sm text-gray-500 mt-1">{totalOrders > 0 ? Math.round(totalLunas / totalOrders * 100) : 0}% dari Total Transaksi</p>
            </div>
          </div>

          {/* === 3. Tabel Detail Laporan === - Animasi fade-in */}
          <div className="bg-white rounded-xl shadow-2xl p-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
                <h4 className="text-xl font-semibold text-yellow-700 mb-4">Detail Transaksi Bulan {filterMonth}/{filterYear}</h4>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-yellow-100 text-yellow-700 uppercase text-xs leading-normal sticky top-0 shadow-md">
                                <th className="py-3 px-6 text-left">ID Transaksi</th>
                                <th className="py-3 px-6 text-left">Tanggal</th>
                                <th className="py-3 px-6 text-left">Menu/Paket</th>
                                <th className="py-3 px-6 text-center">Jml Unit</th>
                                <th className="py-3 px-6 text-right">Total Harga</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm font-light">
                            {reportData.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-100 transition-all duration-200 hover:bg-yellow-50/50" style={{ animationDelay: `${900 + index * 100}ms` }}>
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium text-yellow-700">{item.id}</td>
                                    <td className="py-3 px-6 text-left">{item.date}</td>
                                    <td className="py-3 px-6 text-left">{item.menu}</td>
                                    <td className="py-3 px-6 text-center">{item.quantity}</td>
                                    <td className="py-3 px-6 text-right font-bold text-green-600">{formatRupiah(item.total)}</td>
                                    <td className="py-3 px-6 text-center">
                                        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                                            item.status === 'Lunas' ? 'bg-green-200 text-green-600' : 
                                            'bg-red-200 text-red-600'
                                        } transition-colors duration-300`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </div>
        </main>
      </div>

      {/* === Footer ===  - Animasi slide-up dan delay */}
      <footer className="bg-white text-gray-800 border-t border-gray-300 mt-10 animate-fade-in" style={{ animationDelay: '1200ms' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-8 md:space-y-0 animate-slide-up" style={{ animationDelay: '1300ms' }}>
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
          <div className="flex justify-start md:justify-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '1400ms' }}>
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
          <div className="text-center text-sm text-gray-600 space-x-4 animate-slide-up" style={{ animationDelay: '1500ms' }}>
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