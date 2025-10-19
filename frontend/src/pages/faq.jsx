import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

// --- Data FAQ (tetap hardcoded, ini sudah efisien) ---
const faqList = [
  {
    question: "Bagaimana cara memesan katering?",
    answer:
      "Pemesanan dilakukan langsung melalui WhatsApp. Silakan lihat menu kami di website, lalu klik tombol 'Pesan' atau hubungi nomor yang tertera di halaman Kontak. Setelah pesanan dikonfirmasi, kami akan memberikan Kode Pelacakan.",
  },
  {
    question: "Apakah ada minimum pemesanan?",
    answer:
      "Ya, kami memiliki minimum pemesanan sebanyak 20 porsi untuk paket nasi kotak. Untuk detail lebih lanjut atau acara khusus, silakan hubungi tim kami melalui WhatsApp.",
  },
  {
    question: "Area pengantaran mencakup mana saja?",
    answer:
      "Saat ini kami melayani area Tangerang Selatan, Jakarta Selatan, dan sekitarnya. Untuk pemesanan di luar area tersebut, mungkin akan dikenakan biaya pengiriman tambahan tergantung jarak.",
  },
  {
    question: "Kapan pesanan sebaiknya dilakukan?",
    answer:
      "Untuk kelancaran persiapan, kami sangat menyarankan Anda melakukan pemesanan minimal H-2 (dua hari) sebelum acara. Untuk pesanan dalam jumlah besar (>100 porsi), mohon pesan minimal H-7.",
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri) dan dompet digital (GoPay, OVO). Pembayaran penuh (DP 50% dan pelunasan H-1) diperlukan sebelum pesanan diantar.",
  },
];

// --- Komponen untuk satu item FAQ (Akordeon) ---
const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-md"
      >
        <span className="text-lg font-medium text-gray-800">
          {faq.question}
        </span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-yellow-600" : "text-gray-500"
          }`}
        />
      </button>
      {/* Animasi menggunakan Grid, jauh lebih smooth dari max-height */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-20 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-700">
          Temukan jawaban atas pertanyaan yang sering diajukan pelanggan kami.
        </p>
      </section>

      <div className="max-w-3xl w-full mx-auto my-16 px-6 flex-grow">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          {faqList.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* --- Bagian CTA (Call to Action) --- */}
        <div className="mt-12 text-center bg-yellow-50 border-2 border-dashed border-yellow-300 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-800">
            Tidak Menemukan Jawaban?
          </h3>
          <p className="mt-2 text-gray-600">
            Tim kami siap membantu Anda. Jangan ragu untuk menghubungi kami
            langsung.
          </p>
          <Link to="/contact-us">
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow transition-transform transform hover:scale-105">
              Hubungi Kami
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
