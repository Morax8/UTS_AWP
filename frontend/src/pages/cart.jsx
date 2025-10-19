import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Keranjang Kosong 😢</h2>
        <Link
          to="/menu"
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
        >
          Lihat Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Keranjang Anda</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-yellow-600 font-bold">
                  Rp{item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => decreaseFromCart(item.id)}
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="px-3 py-1 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-3 text-red-600 font-semibold hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BAGIAN TOTAL DAN TOMBOL */}
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <h3 className="text-xl font-bold">
          Total: Rp{totalPrice.toLocaleString("id-ID")}
        </h3>

        <div className="space-x-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Kosongkan
          </button>

          {/* Tombol Checkout */}
          <button
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
