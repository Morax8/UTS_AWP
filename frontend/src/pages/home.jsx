import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 1. Import motion dari framer-motion
import { motion } from "framer-motion";
import heroImage from "/images/hero-catering.jpg";

// --- Komponen Ikon SVG (Tidak berubah) ---
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
  const [featuredMenu, setFeaturedMenu] = useState([]);

  useEffect(() => {
    // ... (logika fetch data tidak berubah)
    const fetchFeaturedMenu = async () => {
      try {
        // Simulasi fetch data (gantilah dengan API-mu)
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${apiUrl}/api/menu/featured`);
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
    // ... (data features tidak berubah)
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

  // 2. Definisikan variants untuk animasi

  // Variants untuk Hero Section (Stagger on Load)
  const heroContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Jeda antar elemen (0.3s)
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Variants untuk Section Lain (Fade In Up on Scroll)
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Variants untuk Grid (Stagger on Scroll)
  // Kita buat sebagai fungsi agar bisa mengatur delay stagger
  const staggerContainerVariants = (staggerAmount = 0.15) => ({
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
      },
    },
  });

  console.log("Featured Menu:", featuredMenu);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        {/* 3. Terapkan motion.div dengan variants, initial, dan animate untuk animasi 'on load' */}
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-white px-4"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 4. Terapkan variants 'item' pada children */}
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            variants={heroItemVariants}
          >
            Nikmati <span className="text-yellow-400">Masakan Rumahan</span>{" "}
            yang Lezat
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            variants={heroItemVariants}
          >
            Disajikan dengan cinta, dari dapur kami langsung ke meja Anda.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={heroItemVariants}
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
          </motion.div>
        </motion.div>
      </section>

      {/* Tentang Kami - Layout Diperbaiki */}
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        {/* 5. Terapkan animasi 'on scroll' dengan whileInView dan viewport */}
        {/* Kita gunakan stagger juga di sini untuk gambar dan teks */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={staggerContainerVariants(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeInUpVariants}>
            <img
              src="https://placehold.co/600x400/ECF0F1/black?text=Tim+kami"
              alt="Tentang KateringKu"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div className="text-left" variants={fadeInUpVariants}>
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
          </motion.div>
        </motion.div>
      </section>

      {/* Menu Favorit - Dinamis */}
      <section className="py-20 px-6 md:px-10 bg-yellow-50 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUpVariants}
        >
          Menu Favorit Pilihan
        </motion.h2>
        {/* 6. Terapkan container staggering pada grid menu */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 "
          variants={staggerContainerVariants(0.15)} // delay 0.15s antar kartu
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger saat 10% grid terlihat
        >
          {featuredMenu.map((item) => (
            // 7. Terapkan item variants pada children (kartu)
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              variants={fadeInUpVariants}
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 px-6 md:px-10 bg-white text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUpVariants}
        >
          Mengapa Pilih Kami?
        </motion.h2>
        {/* Terapkan logika yang sama untuk grid Keunggulan */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all duration-300"
              variants={fadeInUpVariants}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-yellow-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400 text-center text-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUpVariants}
        >
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
        </motion.div>
      </section>
    </div>
  );
}
