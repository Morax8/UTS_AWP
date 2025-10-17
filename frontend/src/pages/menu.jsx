import React, { useState, useEffect, useMemo } from "react";

// --- Komponen Ikon Bintang (SVG) ---
const StarIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.05 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
  </svg>
);

// --- Komponen Footer ---
const Footer = () => (
  <footer className="bg-white text-gray-800 border-t border-gray-300 mt-20">
    <div className="max-w-7xl mx-auto px-6 py-10 text-center">
      <div className="text-3xl font-extrabold text-yellow-500 tracking-wider mb-8">
        KATERINGKU
      </div>
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} KateringKu. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- PERUBAHAN 1: State untuk filter ---
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) {
          throw new Error(
            "Gagal memuat data. Server mungkin sedang bermasalah."
          );
        }
        const result = await response.json();
        setMenuItems(result.data);

        // --- PERUBAHAN 2: Ekstrak kategori unik dari data menu ---
        const uniqueCategories = [
          "All",
          ...new Set(result.data.map((item) => item.category_name)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  // --- PERUBAHAN 3: Logika untuk memfilter menu ---
  // `useMemo` digunakan agar proses filter tidak berjalan ulang jika data tidak berubah.
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Filter berdasarkan kategori
      const categoryMatch =
        selectedCategory === "All" || item.category_name === selectedCategory;
      // Filter berdasarkan nama (pencarian)
      const searchMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  const handlePesanClick = (itemName) => {
    const message = `Halo, saya tertarik untuk memesan ${itemName}.`;
    const phoneNumber = "6281234567890";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Memuat menu...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="text-center py-16 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black shadow-md">
        <h1 className="text-5xl font-bold mb-3">Menu KateringKu</h1>
        <p className="text-lg text-gray-700">
          Pilih menu favorit Anda — dimasak dengan bahan segar dan rasa rumahan.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 md:px-10">
        {/* --- PERUBAHAN 4: UI untuk kontrol filter --- */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <input
              type="text"
              placeholder="Cari nama menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-black shadow"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- PERUBAHAN 5: Render `filteredMenuItems` bukan `menuItems` --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`${item.image_url}`}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-gray-800 shadow">
                    {item.category_name}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 h-15">
                    {item.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span>5.0</span>
                    <span className="mx-1">•</span>
                    <span>(100+)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-yellow-500">
                      Rp{item.price.toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={() => handlePesanClick(item.name)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Menu yang kamu cari tidak ditemukan.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
