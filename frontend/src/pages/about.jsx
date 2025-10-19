import React from "react";
import { Link } from "react-router-dom";
// 1. Import motion
import { motion } from "framer-motion";

// --- Komponen Ikon SVG (Tidak berubah) ---
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const ChefIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 14v6m-5-6v6m-5-6v6M3 10h18M4 14h16M7 14a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zM7 14V6a2 2 0 012-2h6a2 2 0 012 2v8"
    />
  </svg>
);
const QualityIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7M5 13l4 4L19 7"
      transform="translate(0 -5)"
    />
  </svg>
);
const ServiceIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-yellow-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268-.5-1.857m0 0a3.001 3.001 0 015 0m0 0a3.001 3.001 0 015 0m0 0A3.001 3.001 0 007.5 16.143M12 12a3 3 0 100-6 3 3 0 000 6z"
    />
  </svg>
);
// --- End Komponen Ikon SVG ---

export default function AboutPage() {
  const features = [
    // ... data features (tidak berubah)
    {
      icon: <ChefIcon />,
      title: "Koki Berpengalaman",
      description:
        "Tim koki kami memiliki pengalaman bertahun-tahun dalam menyajikan masakan nusantara dan modern.",
    },
    {
      icon: <QualityIcon />,
      title: "Bahan Kualitas Terbaik",
      description:
        "Kami hanya menggunakan bahan-bahan segar pilihan yang didapat dari pemasok lokal tepercaya setiap harinya.",
    },
    {
      icon: <ServiceIcon />,
      title: "Pelayanan Profesional",
      description:
        "Dari pemesanan hingga pengantaran, tim kami siap melayani Anda dengan ramah dan tepat waktu.",
    },
  ];

  const teamMembers = [
    // ... data teamMembers (tidak berubah)
    {
      name: "Muhammad Rassya",
      role: "Head Chef",
      image: "https://placehold.co/600x800/F1C40F/white?text=Rassya",
    },
    {
      name: "Aditya Zianur",
      role: "Operations Manager",
      image: "https://placehold.co/600x800/3498DB/white?text=Aditya",
    },
    {
      name: "Raditya Agra",
      role: "Customer Relations",
      image: "https://placehold.co/600x800/E74C3C/white?text=Raditya",
    },
    {
      name: "Khairiansyah Hafizh",
      role: "Customer Relations",
      image: "https://placehold.co/600x800/E74C3C/white?text=Khairiansyah",
    },
  ];

  // 2. Definisikan variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const staggerContainerVariants = (staggerAmount = 0.15) => ({
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
      },
    },
  });

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section - Animasi On-Load */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-20 text-center shadow-md">
        {/* Tag <motion.h1> diubah jadi <h1> */}
        <h1 className="text-5xl font-bold mb-3">Tentang KateringKu</h1>
        {/* Tag <motion.p> diubah jadi <p> */}
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Lebih dari sekadar makanan, kami menyajikan kebahagiaan dan kenangan
          di setiap hidangan.
        </p>
      </section>

      {/* Bagian Cerita Kami - Animasi On-Scroll (Slide-in) */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants(0.2)}
        >
          {/* Teks - Fade dari Kanan */}
          <motion.div variants={fadeInRightVariants}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Cerita Kami
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KateringKu dimulai dari sebuah dapur rumahan sederhana dengan
              kecintaan yang besar terhadap masakan tradisional Indonesia. Kami
              percaya bahwa makanan yang enak berasal dari hati dan bahan-bahan
              terbaik.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Misi kami adalah menyajikan hidangan berkualitas restoran dengan
              kenyamanan layanan katering, membuat setiap acara Anda, baik besar
              maupun kecil, menjadi momen yang tak terlupakan.
            </p>
            {/* Stagger untuk checklist */}
            <motion.ul
              className="space-y-4"
              variants={staggerContainerVariants(0.1)}
            >
              <motion.li
                className="flex items-center text-gray-700 font-medium"
                variants={fadeInUpVariants}
              >
                <CheckIcon />
                <span className="ml-3">Kualitas Rasa Terjamin</span>
              </motion.li>
              <motion.li
                className="flex items-center text-gray-700 font-medium"
                variants={fadeInUpVariants}
              >
                <CheckIcon />
                <span className="ml-3">100% Halal dan Higienis</span>
              </motion.li>
              <motion.li
                className="flex items-center text-gray-700 font-medium"
                variants={fadeInUpVariants}
              >
                <CheckIcon />
                <span className="ml-3">Pengiriman Tepat Waktu</span>
              </motion.li>
            </motion.ul>
          </motion.div>
          {/* Gambar - Fade dari Kiri */}
          <motion.div className="md:order-first" variants={fadeInLeftVariants}>
            <img
              src="https://placehold.co/800x600/F1C40F/white?text=Dapur+Kami"
              alt="Tim KateringKu"
              className="rounded-2xl shadow-2xl object-cover w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Bagian Mengapa Memilih Kami - Animasi On-Scroll (Stagger) */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUpVariants}
        >
          Mengapa Memilih Kami?
        </motion.h2>
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              variants={fadeInUpVariants}
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-3 text-yellow-600">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bagian Tim Kami - Animasi On-Scroll (Stagger) */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUpVariants}
        >
          Tim Profesional Kami
        </motion.h2>
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-10"
          variants={staggerContainerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInUpVariants}>
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-yellow-300 text-sm">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section - Animasi On-Scroll */}
      <section className="py-20 bg-yellow-400 text-center text-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUpVariants}
        >
          <h2 className="text-4xl font-bold mb-6">
            Siap Membuat Acara Anda Berkesan?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Lihat menu lengkap kami atau hubungi tim kami untuk konsultasi
            gratis kebutuhan katering Anda.
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
