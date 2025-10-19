import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "/images/hero-catering.jpg";
import useScrollAnimation from "../hooks/useScrollAnimation";

// --- Komponen Ikon SVG untuk 'Keunggulan' (agar tidak perlu install library) ---
const FreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318zM12 12a3 3 0 100-6 3 3 0 000 6z"
    />
  </svg>
);
const FastIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);
const TasteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function HomePage() {
  useScrollAnimation();
  const [featuredMenu, setFeaturedMenu] = useState([]);

  useEffect(() => {
    // Ambil data menu favorit dari backend
    const fetchFeaturedMenu = async () => {
      try {
        const response = await fetch("/api/menu/featured");
        const result = await response.json();
        if (result.success) {
          setFeaturedMenu(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil menu favorit:", error);
      }
    };
    fetchFeaturedMenu();
  }, []);

  const features = [
    {
      icon: <FreshIcon />,
      title: "Bahan Segar",
      desc: "Kami hanya menggunakan bahan-bahan segar dan berkualitas tinggi setiap hari.",
    },
    {
      icon: <FastIcon />,
      title: "Pengiriman Cepat",
      desc: "Makanan selalu tiba tepat waktu dan dalam kondisi hangat.",
    },
    {
      icon: <TasteIcon />,
      title: "Rasa Terjamin",
      desc: "Rasakan cita rasa khas rumahan yang sulit dilupakan.",
    },
  ];

  console.log("Featured Menu:", featuredMenu);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-white px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            Nikmati <span className="text-yellow-400">Masakan Rumahan</span>{" "}
            yang Lezat
          </h1>
          <p
            className="text-lg md:text-xl mb-8 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Disajikan dengan cinta, dari dapur kami langsung ke meja Anda.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Link to="/menu">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                Lihat Menu
              </button>
            </Link>
            <Link to="/contact-us">
              <button className="border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-8 py-3 rounded-lg transition w-full sm:w-auto">
                Hubungi Kami
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Kami - Layout Diperbaiki */}
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <img
              src="https://placehold.co/600x400/ECF0F1/black?text=Tim+kami"
              alt="Tentang KateringKu"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div
            className="text-left animate-on-scroll"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Selamat Datang di KateringKu
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kami adalah penyedia layanan katering profesional yang berfokus
              pada rasa, kualitas, dan kepuasan pelanggan. Dari dapur rumahan,
              kami membawa cita rasa otentik ke setiap acara Anda.
            </p>
            <Link to="/about">
              <button className="mt-4 text-yellow-600 font-semibold hover:text-yellow-700 transition group">
                Baca Cerita Kami
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Favorit - Dinamis */}
      <section className="py-20 px-6 md:px-10 bg-yellow-50 text-center">
        <h2 className="text-4xl font-bold mb-12 animate-on-scroll">
          Menu Favorit Pilihan
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {featuredMenu.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }} // Animasi Staggered
            >
              <img
                src={`${item.image_url}`}
                alt={item.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                  {item.description}
                </p>
                <Link to="/menu">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold">
                    Lihat Detail
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 px-6 md:px-10 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12 animate-on-scroll">
          Mengapa Pilih Kami?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${i * 0.15}s` }} // Animasi Staggered
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-yellow-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400 text-center text-black">
        <div className="animate-on-scroll">
          <h2 className="text-4xl font-bold mb-6">Pesan Katering Sekarang!</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Nikmati makanan rumahan dengan rasa yang tak terlupakan. Cocok untuk
            semua acara!
          </p>
          <Link to="/menu">
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105">
              Lihat Menu Lengkap
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
