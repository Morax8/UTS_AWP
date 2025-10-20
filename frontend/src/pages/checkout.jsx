import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// --- Komponen Ikon SVG untuk Form ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const AddressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        customerName: currentUser.name || "",
        customerPhone: currentUser.phone || "",
        customerAddress: currentUser.address || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (cartItems.length === 0 && !loading) {
      navigate("/menu");
    }
  }, [cartItems, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderPayload = {
      customer_name: formData.customerName,
      customer_phone: formData.customerPhone,
      customer_address: formData.customerAddress,
      total_amount: totalPrice,
      items: cartItems.map((item) => ({
        menu_item_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      user_id: currentUser ? currentUser.id : null,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await axios.post(`${apiUrl}/api/orders`, orderPayload);
      const orderCode = response.data.order_code;
      clearCart();
      navigate(`/track-order?code=${orderCode}`, {
        state: { successMessage: `Pesanan #${orderCode} berhasil dibuat!` },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Gagal memproses pesanan. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
          Checkout Pesanan
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Pengiriman */}
          <div className="lg:w-3/5 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-4 text-gray-700">
              Detail Pengiriman
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- PERBAIKAN STRUKTUR INPUT --- */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nomor Telepon
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PhoneIcon />
                  </div>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="customerAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat Pengiriman
                </label>
                <div className="relative mt-1">
                  <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none">
                    <AddressIcon />
                  </div>
                  <textarea
                    id="customerAddress"
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition resize-none"
                  ></textarea>
                </div>
              </div>
              {/* --- BATAS PERBAIKAN --- */}

              {error && (
                <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className={`w-full py-3 px-4 rounded-lg shadow-lg text-md font-bold text-black transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                  loading || cartItems.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500"
                }`}
              >
                {loading
                  ? "Memproses..."
                  : `Pesan Sekarang - Rp${totalPrice.toLocaleString("id-ID")}`}
              </button>
            </form>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="lg:w-2/5 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-4 text-gray-700">
              Ringkasan Pesanan
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">{item.name}</p>
                      <p className="text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <p>Total Pembayaran</p>
                <p className="text-2xl font-extrabold text-yellow-600">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
