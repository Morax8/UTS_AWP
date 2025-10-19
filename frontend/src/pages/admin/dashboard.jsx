import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  // Ikon Statistik
  FaDollarSign,
  FaChartLine,
  FaShoppingBasket,
  // Ikon Footer
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

// Data dummy untuk Charts dan Tables
const dummyChartData = [
    { day: '1 Okt', sales: 15000000 },
    { day: '5 Okt', sales: 20000000 },
    { day: '10 Okt', sales: 35000000 },
    { day: '15 Okt', sales: 25000000 },
    { day: '20 Okt', sales: 40000000 },
    { day: '25 Okt', sales: 30000000 },
    { day: '31 Okt', sales: 50000000 },
];

const topMenuData = [
    { id: 1, name: 'Nasi Box Ayam Bakar', price: 'Rp 25.000/Pax', sold: 500 },
    { id: 2, name: 'Paket Prasmanan B', price: 'Rp 45.000/Pax', sold: 250 },
    { id: 3, name: 'Nasi Tumpeng Mini', price: 'Rp 150.000/Pcs', sold: 90 },
];

export default function Dashboard() {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* === Wrapper utama === */}
      <div className="flex flex-1">
        {/* === Sidebar === */}
        <aside className="w-64 bg-yellow-500 text-white flex flex-col p-6 shadow-2xl">
          <h1 className="text-2xl font-bold mb-8 text-center animate-pulse duration-1000">Katering Rassya</h1>
          <nav className="flex flex-col space-y-4">
            {/* Animasi hover yang lebih jelas */}
            <Link to="/admin/dashboard" className="flex items-center gap-3 bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02]" ><FaHome /> Dashboard</Link>
            <Link to="/admin/master-menu" className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"><FaUtensils /> Master Menu</Link>
            <Link to="/admin/master-pesanan" className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"><FaClipboardList /> Master Pesanan</Link>
            <Link to="/admin/laporan" className="flex items-center gap-3 hover:bg-yellow-600 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"><FaUsers /> Laporan</Link>
          </nav>
          <div className="mt-auto">
            {/* Efek hover tombol Logout */}
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-red-600 w-full px-4 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg transform hover:scale-[1.02] hover:shadow-red-800/50">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* === Main Content: Statistik Dashboard === */}
        <main className="flex-1 p-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-8 animate-slide-in-down" style={{ animationDelay: '50ms' }}>
            <h2 className="text-3xl font-bold text-yellow-700">Statistik Penjualan</h2>
            <div className="text-right">
              <p className="font-semibold text-gray-700">Ringkasan Kinerja Bulan Ini</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </header>

          {/* === 1. Kartu Metrik Utama (Total Sales, Income, Current Income) === */}
          {/* Tambahkan animasi masuk (slide-in) dan efek hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Total Sales */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 flex items-center justify-between transition-all duration-300 hover:scale-[1.03] transform animate-slide-in-up" style={{ animationDelay: '100ms' }}>
              <div>
                <p className="text-gray-500 text-sm">Jumlah Pesanan Bulan Ini</p>
                <h3 className="text-4xl font-extrabold text-yellow-700 mt-1">128</h3>
                <p className="text-green-500 text-sm mt-1 flex items-center">
                    <FaChartLine className="mr-1" /> +12% dari bulan lalu
                </p>
              </div>
              <FaShoppingBasket className="text-4xl text-yellow-500 opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>

            {/* Card 2: Income Earned */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 flex items-center justify-between transition-all duration-300 hover:scale-[1.03] transform animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <div>
                <p className="text-gray-500 text-sm">Pemasukan Kotor Bulan Ini</p>
                <h3 className="text-4xl font-extrabold text-green-700 mt-1">{formatRupiah(990999000)}</h3>
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FaDollarSign className="mr-1" /> -5% dari bulan lalu
                </p>
              </div>
              <FaDollarSign className="text-4xl text-green-500 opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>

            {/* Card 3: Current Income */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 flex items-center justify-between transition-all duration-300 hover:scale-[1.03] transform animate-slide-in-up" style={{ animationDelay: '300ms' }}>
              <div>
                <p className="text-gray-500 text-sm">Estimasi Keuntungan</p>
                <h3 className="text-4xl font-extrabold text-blue-700 mt-1">{formatRupiah(710429000)}</h3>
                <p className="text-gray-500 text-sm mt-1">Total Setelah Biaya Operasional</p>
              </div>
              <FaChartLine className="text-4xl text-blue-500 opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
          </div>

          {/* ... Area Grafik dan Tabel ... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {/* 2.1 Earnings Graph (Dummy Chart Area) */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-700">Grafik Pemasukan</h4>
                    <a href="#" className="text-sm text-blue-500 hover:underline transition-colors duration-300">Lihat Lebih Detail →</a>
                </div>
                
                {/* Dummy Chart Area */}
                <div className="h-64 flex flex-col justify-end">
                    <div className="text-sm text-gray-500 mb-2">Pemasukan (Rp Juta)</div>
                    
                    {/* Visualisasi data dummy sederhana (menggunakan div) */}
                    <div className="flex justify-between items-end border-l border-b border-gray-300 h-full py-2">
                        {dummyChartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center mx-1 group">
                                <div 
                                    className="w-4 bg-yellow-500 rounded-t-sm transition-all duration-700 group-hover:bg-yellow-700 transform group-hover:scale-y-105"
                                    style={{ height: `${data.sales / 50000000 * 90}%` }} // Scaling data
                                ></div>
                                <span className="text-xs text-gray-500 mt-1">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2.2 Top Menu Items Sold Chart (Dummy Bar Chart) */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-700">Penjualan Unit Menu</h4>
                    <a href="#" className="text-sm text-blue-500 hover:underline transition-colors duration-300">Lihat Lebih Detail →</a>
                </div>

                {/* Dummy Bar Chart Area */}
                <div className="h-64 flex items-end justify-around border-b border-gray-300 pb-2">
                    {topMenuData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div 
                                className="w-12 bg-yellow-500 rounded-t-md transition-all duration-700 group-hover:bg-yellow-700 transform group-hover:scale-y-105"
                                style={{ height: `${item.sold / 500 * 90}%` }} // Scaling data
                            ></div>
                            <span className="text-xs text-gray-600 mt-2 font-medium">{item.name.split(' ')[0]}</span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center group">
                        <div className="w-12 bg-gray-200 rounded-t-md h-full text-center text-gray-500 text-xs pt-2 transition-colors duration-300 group-hover:bg-gray-300">Lainnya</div>
                        <span className="text-xs text-gray-600 mt-2 font-medium">Lainnya</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500 text-center mt-2">Bulan: Okt</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
            {/* 3.1 Sales Chart (Dummy Donut Chart) - 1 Kolom */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-700">Proporsi Penjualan Kategori</h4>
                    <a href="#" className="text-sm text-blue-500 hover:underline transition-colors duration-300">Lihat Lebih Detail →</a>
                </div>
                
                <div className="flex items-center space-x-6">
                    {/* Dummy Donut Chart */}
                    {/* Tambahkan shadow dan transisi untuk efek 3D */}
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-center text-xs font-semibold text-gray-600 border-8 border-yellow-500 ring-4 ring-yellow-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.05] transform">
                        50% Nasi Box
                    </div>
                    
                    {/* Legend */}
                    <div className="space-y-2 text-sm">
                        <p className="flex items-center hover:text-yellow-700 transition-colors duration-300"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>50% Nasi Box</p>
                        <p className="flex items-center hover:text-red-700 transition-colors duration-300"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>20% Snack Box</p>
                        <p className="flex items-center hover:text-blue-700 transition-colors duration-300"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>17% Prasmanan</p>
                        <p className="flex items-center hover:text-green-700 transition-colors duration-300"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>13% Tumpeng</p>
                    </div>
                </div>
            </div>

            {/* 3.2 Most Sales Table (Tabel Menu Terlaris) - 2 Kolom */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-700">Menu Paling Laris</h4>
                    <a href="#" className="text-sm text-blue-500 hover:underline transition-colors duration-300">Lihat Lebih Detail →</a>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="py-2 pr-4">No</th>
                                <th className="py-2 pr-4">Nama Menu</th>
                                <th className="py-2 pr-4">Hasil (Harga/Unit)</th>
                                <th className="py-2 pr-4">Terjual (Unit)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Efek hover pada baris tabel */}
                            {topMenuData.map((item, index) => (
                                <tr key={item.id} className="border-b transition-all duration-200 hover:bg-yellow-100/50 hover:shadow-md">
                                    <td className="py-3 pr-4 font-semibold text-gray-600">{index + 1}</td>
                                    <td className="py-3 pr-4 font-semibold text-yellow-700">{item.name}</td>
                                    <td className="py-3 pr-4 text-green-600">{item.price}</td>
                                    <td className="py-3 pr-4 text-gray-700">{item.sold} Pcs</td>
                                </tr>
                            ))}
                            <tr className="transition-all duration-200 hover:bg-yellow-100/50 hover:shadow-md">
                                <td className="py-3 pr-4 font-semibold text-gray-600">4</td>
                                <td className="py-3 pr-4 font-semibold text-yellow-700">Lainnya...</td>
                                <td className="py-3 pr-4 text-green-600">...</td>
                                <td className="py-3 pr-4 text-gray-700">...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </main>
      </div>

      {/* === Footer === (Tetap dengan animasi kustom) */}
      <footer className="bg-white text-gray-800 border-t border-gray-300 mt-10 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Section - Tetap dengan kelas animasi slide-up */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-8 md:space-y-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
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

          {/* Social Media - Tetap dengan kelas animasi slide-up */}
          <div className="flex justify-start md:justify-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-125 shadow-md hover:shadow-xl"
              >
                <Icon />
              </a>
            ))}
          </div>

          <hr className="border-gray-300 mb-4" />

          {/* Bottom Links - Tetap dengan kelas animasi slide-up */}
          <div className="text-center text-sm text-gray-600 space-x-4 animate-slide-up" style={{ animationDelay: '500ms' }}>
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