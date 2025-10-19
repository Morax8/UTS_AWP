import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  // Mengambil state dan fungsi dari CartContext
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // State untuk data formulir pelanggan
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Jika keranjang kosong, arahkan kembali ke menu
  if (cartItems.length === 0) {
    navigate("/menu");
    return null; 
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Persiapkan item pesanan (sesuai skema order_items di SQL Anda)
    const orderItems = cartItems.map((item) => ({
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    // Payload pesanan yang akan dikirim ke backend
    const orderPayload = {
      customer_name: formData.customerName,
      customer_phone: formData.customerPhone,
      customer_address: formData.customerAddress,
      total_amount: totalPrice,
      items: orderItems,
      // user_id bisa ditambahkan di sini jika Anda sudah menerapkan Auth
      // user_id: 1, 
    };

    try {
      // Ganti URL ini dengan endpoint backend Anda
      const response = await axios.post(
        "http://localhost:5000/api/orders", 
        orderPayload
      );
      
      const orderCode = response.data.order.order_code; 

      // Bersihkan keranjang setelah pesanan berhasil
      clearCart();

      // Arahkan ke halaman pelacakan pesanan dengan kode pesanan
      navigate(`/track/${orderCode}`, { state: { orderCode } });

    } catch (err) {
      console.error("Error placing order:", err);
      setError("Gagal memproses pesanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-6 text-center">Detail Pengiriman & Checkout</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Kolom Kiri: Detail Pelanggan / Form */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Informasi Pelanggan</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Alamat Pengiriman</label>
              <textarea
                id="customerAddress"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                rows="3"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              ></textarea>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black transition 
                ${loading || cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
                }`}
            >
              {loading ? "Memproses..." : `Pesan Sekarang - Rp${totalPrice.toLocaleString("id-ID")}`}
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Ringkasan Pesanan */}
        <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Ringkasan Pesanan ({cartItems.length} Item)</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b last:border-b-0 pb-2">
                <p className="text-gray-700">
                  {item.name} <span className="font-semibold text-yellow-600">x{item.quantity}</span>
                </p>
                <p className="font-medium">
                  Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
            <p className="text-lg font-bold">Total Pembayaran:</p>
            <p className="text-xl font-extrabold text-red-600">
              Rp{totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}