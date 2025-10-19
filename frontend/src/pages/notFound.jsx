import React from "react";
import { Link } from "react-router-dom";
// --- Komponen SVG Ilustrasi 404 ---
// Menggambarkan kaca pembesar yang tidak menemukan apa-apa
const NotFoundIcon = () => (
  <svg
    className="w-32 h-32 text-yellow-400 mb-8 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 21l-2.828-2.828"
    />
  </svg>
);

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <div className="flex-grow flex flex-col justify-center items-center text-center px-6 py-20">
        <NotFoundIcon />
        <h1 className="text-6xl font-extrabold text-yellow-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Oops! Halaman Tidak Ditemukan
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Maaf, halaman yang kamu cari sepertinya tidak ada atau sudah
          dipindahkan. Yuk, kembali ke beranda.
        </p>
        <Link to="/">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow transition transform hover:scale-105">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}
