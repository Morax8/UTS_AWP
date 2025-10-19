import { useCart } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";

// --- Komponen Ikon SVG (agar tidak perlu install library eksternal) ---
const EmptyCartIcon = () => (
  <svg
    className="w-24 h-24 text-gray-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);
const TrashIcon = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export default function Cart() {
  const {
    cartItems,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-600 text-center px-4">
        <EmptyCartIcon />
        <h2 className="text-3xl font-bold mt-6 mb-2">Keranjang Anda Kosong</h2>
        <p className="max-w-sm mb-6">
          Sepertinya Anda belum menemukan menu yang pas di hati. Mari kita cari
          lagi!
        </p>
        <Link
          to="/menu"
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-md"
        >
          Jelajahi Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">
        Keranjang Belanja
      </h1>

      {/* Daftar Item */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 rounded-md object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                <p className="text-gray-600">
                  Rp{item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => decreaseFromCart(item.id)}
                  className="px-3 py-1 font-bold text-lg text-gray-700 hover:bg-gray-100 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 w-12 text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 font-bold text-lg text-gray-700 hover:bg-gray-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <p className="font-semibold w-28 text-right">
                Rp{(item.price * item.quantity).toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan & Aksi */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-600 hover:underline font-semibold mb-4 sm:mb-0"
        >
          Kosongkan Keranjang
        </button>

        <div className="text-right">
          <h3 className="text-xl font-bold">
            Total:{" "}
            <span className="text-yellow-600">
              Rp{totalPrice.toLocaleString("id-ID")}
            </span>
          </h3>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 px-8 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition shadow-lg transform hover:scale-105"
          >
            Lanjut ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
