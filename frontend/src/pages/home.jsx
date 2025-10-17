import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import heroImage from "/images/hero-catering.jpg";
import menu1 from "/images/nasi-kuning.jpg";
import menu2 from "/images/rendang.jpg";
import menu3 from "/images/soto.jpg";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function HomePage() {
  useScrollAnimation();
  
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Nikmati <span className="text-yellow-400">Masakan Rumahan</span> yang
            Lezat
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Disajikan dengan cinta, dari dapur kami langsung ke meja Anda.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/menu">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition">
                Lihat Menu
              </button>
            </Link>
            <Link to="/contact-us">
              <button className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-lg transition">
                Hubungi Kami
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 text-center animate-fade-in animate-on-scroll">
        <h2 className="text-4xl font-bold mb-6">Tentang Kami</h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Kami adalah penyedia layanan catering profesional yang berfokus pada
          rasa, kualitas, dan kepuasan pelanggan. Dari acara kecil hingga besar,
          kami siap menyajikan makanan terbaik untuk Anda.
        </p>
      </section>

      {/* Menu Favorit */}
      <section className="py-20 px-6 md:px-20 bg-yellow-50 text-center animate-fade-in animate-on-scroll">
        <h2 className="text-4xl font-bold mb-10">Menu Favorit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[menu1, menu2, menu3].map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={img}
                alt={`Menu ${index + 1}`}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index === 0
                    ? "Nasi Kuning Komplit"
                    : index === 1
                    ? "Rendang Sapi"
                    : "Soto Ayam"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {index === 0
                    ? "Nasi kuning lezat dengan lauk komplit dan sambal pedas manis."
                    : index === 1
                    ? "Rendang khas Padang yang gurih, empuk, dan kaya rempah."
                    : "Soto ayam segar dengan kuah bening dan taburan bawang goreng."}
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold">
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 px-6 md:px-20 bg-white text-center animate-fade-in animate-on-scroll">
        <h2 className="text-4xl font-bold mb-10">Mengapa Pilih Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Bahan Segar",
              desc: "Kami hanya menggunakan bahan-bahan segar dan berkualitas tinggi setiap hari.",
            },
            {
              title: "Pengiriman Cepat",
              desc: "Makanan selalu tiba tepat waktu dan dalam kondisi hangat.",
            },
            {
              title: "Rasa Terjamin",
              desc: "Rasakan cita rasa khas rumahan yang sulit dilupakan.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-3 text-yellow-500">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400 text-center text-black animate-scale-up animate-on-scroll">
        <h2 className="text-4xl font-bold mb-6">Pesan Catering Sekarang!</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Nikmati makanan rumahan dengan rasa yang tak terlupakan. Cocok untuk
          semua acara!
        </p>
        <Link to="/menu">
          <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition">
            Lihat Menu Lengkap
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-gray-800 border-t border-gray-300 mt-20 animate-fade-in animate-on-scroll">
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
