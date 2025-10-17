import React, { useState } from "react";
import {
  FaSearch,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function TrackPage() {
  const [search, setSearch] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading

  // Fungsi handleSearch diubah untuk mengambil data dari API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      setError("Kolom pencarian tidak boleh kosong.");
      return;
    }

    setLoading(true);
    setOrderData(null);
    setError("");

    try {
      // Gunakan path relatif agar Vite Proxy bekerja saat development
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(
        `${apiUrl}/api/orders/track?search=${encodeURIComponent(search)}`
      );
      const result = await response.json();

      if (!response.ok) {
        // Ambil pesan error dari backend
        throw new Error(result.message || "Gagal mencari pesanan.");
      }

      setOrderData(result.data);
    } catch (err) {
      setOrderData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-16 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-3 animate-fade-in">
          Lacak Pesanan
        </h1>
        <p className="text-lg text-gray-700">
          Masukkan <strong>kode pesanan</strong> atau <strong>nama Anda</strong>{" "}
          untuk melihat status.
        </p>
      </section>

      {/* Search Box */}
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 animate-scale-up">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Masukkan kode pesanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            type="submit"
            disabled={loading} // Tombol disable saat loading
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-lg flex items-center gap-2 transition disabled:bg-gray-400"
          >
            {loading ? (
              "Mencari..."
            ) : (
              <>
                <FaSearch /> Cari
              </>
            )}
          </button>
        </form>
      </div>

      {/* Hasil Pencarian */}
      <div className="max-w-2xl mx-auto mt-10 px-4 text-center flex-grow">
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {orderData && (
          <div className="bg-white rounded-xl shadow-md p-8 mt-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-yellow-600">
              Detail Pesanan #{orderData.order_code}
            </h2>

            <div className="flex justify-center items-center mb-6">
              {orderData.status === "Selesai" ? (
                <FaCheckCircle className="text-green-500 text-4xl" />
              ) : orderData.status === "Dalam Pengantaran" ? (
                <FaTruck className="text-blue-500 text-4xl" />
              ) : (
                <FaBox className="text-yellow-500 text-4xl" />
              )}
            </div>

            <p className="text-lg font-semibold mb-2">
              Nama Pemesan: {orderData.customer_name}
            </p>
            <p className="text-gray-700 mb-3">
              Status Pesanan:{" "}
              <span
                className={`font-semibold ${
                  orderData.status === "Selesai"
                    ? "text-green-600"
                    : orderData.status === "Dalam Pengantaran"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {orderData.status}
              </span>
            </p>

            <div className="border-t border-gray-200 my-4"></div>

            <h3 className="text-lg font-bold mb-2">Daftar Pesanan:</h3>
            <ul className="text-gray-700 mb-4 list-disc list-inside text-left inline-block">
              {orderData.items.map((item, i) => (
                <li key={i}>
                  {item.quantity}x {item.menu_name}
                </li>
              ))}
            </ul>

            <p className="text-lg font-bold text-yellow-600">
              Total: Rp{orderData.total_amount.toLocaleString("id-ID")}
            </p>

            {/* <p className="text-sm text-gray-500 mt-3">
              Estimasi Selesai: {orderData.estimated}
            </p> */}
          </div>
        )}
      </div>

      {!orderData && !error && (
        <div className="text-center mt-20 text-gray-500 animate-fade-in">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
          <p>Masukkan kode atau nama untuk melacak pesanan Anda.</p>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white text-gray-800 border-t border-gray-300 mt-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-8 md:space-y-0">
            <div className="text-3xl font-extrabold text-red-600 tracking-wider animate-pulse">
              KATERING
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
              <a href="#" className="hover:text-red-600 transition-colors">
                Lorem Ipsum
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Lorem Ipsum
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Lorem Ipsum
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Lorem Ipsum
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                FAQ
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Lorem Ipsum
              </a>
            </div>
          </div>

          <div className="flex justify-start md:justify-center space-x-6 mb-8">
            {[
              { icon: <FaFacebookF />, href: "#" },
              { icon: <FaTwitter />, href: "#" },
              { icon: <FaYoutube />, href: "#" },
              { icon: <FaInstagram />, href: "#" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <hr className="border-gray-300 mb-4" />

          <div className="text-center text-sm text-gray-600 space-x-4">
            <a href="#" className="hover:text-red-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Price Disclaimer
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Responsible Disclosure
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
