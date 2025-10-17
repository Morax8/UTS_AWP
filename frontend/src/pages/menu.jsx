import React from "react";
import { FaStar, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const menuData = [
  {
    id: 1,
    name: "Ayam Goreng Kriuk",
    category: "Makanan Utama",
    price: 15000,
    rating: 5.0,
    reviews: 140,
    image: "/images/nasi-kuning.jpg",
  },
  {
    id: 2,
    name: "Rendang Sapi Premium",
    category: "Makanan Nusantara",
    price: 45000,
    rating: 5.0,
    reviews: 200,
    image: "/images/rendang.jpg",
  },
  {
    id: 3,
    name: "Soto Ayam Spesial",
    category: "Makanan Kuah",
    price: 25000,
    rating: 4.9,
    reviews: 180,
    image: "/images/soto.jpg",
  },
  {
    id: 4,
    name: "Nasi Kuning Komplit",
    category: "Makanan Tradisional",
    price: 30000,
    rating: 4.8,
    reviews: 110,
    image: "/images/nasi-kuning.jpg",
  },
  // tambahkan lagi sesuai kebutuhan
];

export default function MenuPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="text-center py-16 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black shadow-md">
        <h1 className="text-5xl font-bold mb-3 animate-fade-in">Menu KateringKu</h1>
        <p className="text-lg text-gray-700">
          Pilih menu favorit Anda — dimasak dengan bahan segar dan rasa rumahan.
        </p>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {menuData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-scale-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gambar */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-gray-800 shadow">
                  {item.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">Lorem ipsum dolor sit amet.</p>

                {/* Rating */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{item.rating.toFixed(1)}</span>
                  <span className="mx-1">•</span>
                  <span>({item.reviews})</span>
                </div>

                {/* Harga + Tombol */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-yellow-500">
                    Rp{item.price.toLocaleString("id-ID")}
                  </span>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
