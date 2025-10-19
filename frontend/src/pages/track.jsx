import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { FaSearch, FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";

// --- Komponen Timeline Status (tidak diubah) ---
const StatusTimeline = ({ currentStatus }) => {
  const statuses = [
    { name: "Pesanan Diterima", icon: <FaBox className="w-6 h-6" /> },
    {
      name: "Sedang Dimasak",
      icon: (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268-.5-1.857m0 0a3.001 3.001 0 015 0m0 0a3.001 3.001 0 015 0m0 0A3.001 3.001 0 007.5 16.143M12 12a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      ),
    },
    { name: "Dalam Pengantaran", icon: <FaTruck className="w-6 h-6" /> },
    { name: "Selesai", icon: <FaCheckCircle className="w-6 h-6" /> },
  ];
  const currentIndex = statuses.findIndex((s) => s.name === currentStatus);
  return (
    <div className="flex justify-between items-start my-8">
      {statuses.map((status, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center text-center w-24">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                index <= currentIndex
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentIndex ? (
                <FaCheckCircle className="w-6 h-6" />
              ) : (
                status.icon
              )}
            </div>
            <p
              className={`mt-2 text-xs font-semibold ${
                index <= currentIndex ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {status.name}
            </p>
          </div>
          {index < statuses.length - 1 && (
            <div
              className={`flex-grow h-1 mx-2 rounded mt-6 ${
                index < currentIndex ? "bg-yellow-500" : "bg-gray-200"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function TrackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [search, setSearch] = useState(searchParams.get("code") || "");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const successMessage = location.state?.successMessage;

  // --- PERBAIKAN 1: Buat fungsi pencarian yang bisa dipanggil ulang ---
  // Gunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const performSearch = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setError("Kolom pencarian tidak boleh kosong.");
      return;
    }
    setLoading(true);
    setOrderData(null);
    setError("");
    try {
      const response = await fetch(
        `/api/orders/track?search=${encodeURIComponent(searchTerm)}`
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Gagal mencari pesanan.");
      }
      setOrderData(result.data);
    } catch (err) {
      setOrderData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Dependensi kosong karena fungsi ini mandiri

  // --- PERBAIKAN 2: useEffect untuk pencarian otomatis ---
  useEffect(() => {
    const initialCode = searchParams.get("code");
    if (initialCode) {
      // Panggil fungsi pencarian dengan kode dari URL
      performSearch(initialCode);
    }
  }, [performSearch, searchParams]); // Jalankan ulang jika parameter URL berubah

  // --- PERBAIKAN 3: Handler untuk form submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update URL dengan kode yang dicari
    setSearchParams({ code: search });
    // Panggil fungsi pencarian dengan nilai dari input
    performSearch(search);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* ... (Hero section sama) ... */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-20 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-3">Lacak Pesanan Anda</h1>
        <p className="text-lg text-gray-700">
          Lihat status pesanan Anda secara real-time.
        </p>
      </section>

      {/* ... (Search box sama, tapi sekarang memanggil handleSubmit) ... */}
      <div className="max-w-2xl w-full mx-auto -mt-10 z-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-white shadow-xl rounded-xl p-4"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Masukkan kode pesanan Anda di sini..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
          >
            {loading ? "Mencari..." : "Cari"}
          </button>
        </form>
      </div>

      <div className="max-w-3xl w-full mx-auto mt-10 px-4 text-center flex-grow">
        {successMessage && !orderData && !error && (
          <p className="text-green-600 font-medium bg-green-100 p-3 rounded-lg mb-4">
            {successMessage}
          </p>
        )}
        {error && (
          <p className="text-red-600 font-medium bg-red-100 p-3 rounded-lg">
            {error}
          </p>
        )}
        {orderData && (
          // ... (Tampilan hasil pencarian tidak diubah) ...
          <div className="bg-white rounded-xl shadow-lg p-8 mt-6 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-200 pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Kode Pesanan</p>
                <h2 className="text-2xl font-bold text-yellow-600">
                  #{orderData.order_code}
                </h2>
              </div>
              <div className="mt-2 sm:mt-0 sm:text-right">
                <p className="text-sm text-gray-500">Nama Pemesan</p>
                <p className="text-lg font-semibold">
                  {orderData.customer_name}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Status Pengiriman
            </h3>
            <StatusTimeline currentStatus={orderData.status} />
            <div className="border-t border-gray-200 my-6"></div>
            <h3 className="text-lg font-semibold mb-3">Rincian Pesanan:</h3>
            <div className="space-y-2 text-gray-700">
              {orderData.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50"
                >
                  <span>
                    {item.quantity}x {item.menu_name}
                  </span>
                  <span className="font-medium">
                    Rp
                    {(item.quantity * item.unit_price).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-dashed border-gray-200 my-4"></div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Pembayaran</span>
              <span className="text-yellow-600">
                Rp{orderData.total_amount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        )}
        {!orderData && !error && !loading && (
          <div className="text-center mt-20 text-gray-500">
            <FaBox className="text-7xl text-gray-300 mx-auto mb-4" />
            <p className="text-lg">
              Masukkan kode pesanan Anda untuk memulai pelacakan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
