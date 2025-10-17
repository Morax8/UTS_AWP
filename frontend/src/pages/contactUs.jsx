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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-16 text-center shadow-md animate-fade-in">
        <h1 className="text-5xl font-bold mb-3">Hubungi Kami</h1>
        <p className="text-lg text-gray-700">
          Ada pertanyaan, saran, atau ingin memesan langsung? Kami siap membantu!
        </p>
      </section>

      {/* Contact Form */}
      <div className="max-w-6xl mx-auto my-16 px-6 flex flex-col md:flex-row gap-12">
        {/* Info Kontak */}
        <div className="md:w-1/2 space-y-6 animate-scale-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Kontak Kami</h2>

          <div className="flex items-center space-x-4">
            <FaPhone className="text-yellow-500 text-2xl" />
            <p className="text-lg">+62 812 3456 7890</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-yellow-500 text-2xl" />
            <p className="text-lg">info@kateringrassya.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
            <p className="text-lg">Jl. Mawar No. 15, Tangerang, Indonesia</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">Ikuti Kami:</h3>
          <div className="flex space-x-4">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white transition-all transform hover:scale-110"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 bg-white shadow-lg rounded-xl p-8 animate-fade-in"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Kirim Pesan</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
              placeholder="Masukkan email Anda"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Pesan
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition resize-none"
              placeholder="Tulis pesan Anda di sini..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md transition transform hover:scale-[1.02]"
          >
            Kirim Pesan
          </button>

          {sent && (
            <p className="text-green-600 font-medium text-center mt-4 animate-fade-in">
              ✅ Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.
            </p>
          )}
        </form>
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
            {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Icon />
                </a>
              )
            )}
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
