import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

// --- Komponen baru untuk Input Field dengan Ikon ---
const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
    />
  </div>
);

const TextAreaField = (props) => (
  <textarea
    {...props}
    className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition resize-none"
  ></textarea>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pesan.");
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-20 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-3">Hubungi Kami</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Ada pertanyaan, saran, atau ingin memesan langsung? Kami siap
          membantu!
        </p>
      </section>

      <div className="max-w-6xl w-full mx-auto my-16 px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Bagian Kiri: Info Kontak (dengan background) */}
          <div className="md:w-2/5 bg-yellow-500 text-white p-8 md:p-12 space-y-8">
            <h2 className="text-3xl font-bold mb-6">Info Kontak</h2>
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-2xl mt-1 flex-shrink-0" />
              <p className="text-lg">Jl. Mawar No. 15, Tangerang, Indonesia</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-2xl" />
              <p className="text-lg">+62 812 3456 7890</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl" />
              <p className="text-lg">info@kateringku.com</p>
            </div>

            <div className="border-t border-yellow-400 my-6"></div>

            <h3 className="text-xl font-semibold">Ikuti Kami:</h3>
            <div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-yellow-500 transition-all transform hover:scale-110"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Bagian Kanan: Form */}
          <form onSubmit={handleSubmit} className="md:w-3/5 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Kirim Pesan
            </h2>

            <div className="space-y-6">
              <InputField
                icon={
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
                }
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nama Lengkap Anda"
              />
              <InputField
                icon={
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Alamat Email Anda"
              />
              <TextAreaField
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md transition transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>

            {success && (
              <p className="text-green-600 font-medium text-center mt-4">
                ✅ Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.
              </p>
            )}
            {error && (
              <p className="text-red-600 font-medium text-center mt-4">
                ❌ Terjadi kesalahan: {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
