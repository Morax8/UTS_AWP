import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqList = [
    {
      question: "Bagaimana cara memesan catering?",
      answer:
        "Anda dapat memesan melalui halaman Menu kami, lalu klik tombol 'Pesan Sekarang' pada menu yang Anda pilih. Setelah itu, isi data pemesanan dan kami akan menghubungi Anda untuk konfirmasi.",
    },
    {
      question: "Apakah bisa pesan untuk acara besar?",
      answer:
        "Tentu! Kami melayani catering untuk acara kantor, pesta, pernikahan, seminar, dan lainnya. Hubungi kami melalui halaman Kontak untuk mendapatkan penawaran khusus.",
    },
    {
      question: "Apakah ada minimal pemesanan?",
      answer:
        "Minimal pemesanan adalah 10 porsi untuk pengantaran dalam satu area. Namun, untuk area tertentu bisa lebih fleksibel sesuai ketersediaan.",
    },
    {
      question: "Kapan pesanan sebaiknya dilakukan?",
      answer:
        "Kami menyarankan Anda melakukan pemesanan minimal 1 hari sebelum acara agar kami bisa menyiapkan bahan terbaik dan pengantaran tepat waktu.",
    },
    {
      question: "Apakah makanan bisa disesuaikan dengan permintaan?",
      answer:
        "Ya, kami menyediakan opsi custom menu sesuai kebutuhan Anda — misalnya menu tanpa pedas, vegetarian, atau menyesuaikan alergi tertentu.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-16 text-center shadow-md animate-fade-in">
        <h1 className="text-5xl font-bold mb-3">FAQ</h1>
        <p className="text-lg text-gray-700">
          Temukan jawaban atas pertanyaan yang sering diajukan pelanggan kami.
        </p>
      </section>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto my-12 px-6 flex-grow">
        {faqList.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg mb-4 transition-all duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className="text-lg font-semibold text-gray-800">
                {faq.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-yellow-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
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
