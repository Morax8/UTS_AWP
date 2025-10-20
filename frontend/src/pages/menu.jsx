import React, { useState, useEffect, useMemo } from "react";
import CustomDropdown from "../components/customDropdown";
import { useCart } from "../context/cartContext";
import { motion } from "framer-motion";

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.05 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95.69l1.286-3.96z" />
  </svg>
);
const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const EmptyIcon = () => (
  <svg
    className="w-16 h-16 text-gray-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l4 4m0-4l-4 4"
    />
  </svg>
);

const sortOptions = [
  { value: "default", label: "Urutkan Berdasarkan" },
  { value: "price-asc", label: "Harga: Termurah" },
  { value: "price-desc", label: "Harga: Termahal" },
  { value: "name-asc", label: "Nama: A-Z" },
  { value: "name-desc", label: "Nama: Z-A" },
];

export default function MenuPage() {
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState(null);
  const [allMenuItems, setAllMenuItems] = useState([]); // data asli
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Fetch data sekali aja
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${apiUrl}/api/menu`);
        if (!response.ok) throw new Error("Gagal memuat data menu.");
        const result = await response.json();

        setAllMenuItems(result.data);

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

  // Filter & sort berdasarkan allMenuItems (data asli)
  const filteredMenuItems = useMemo(() => {
    let filtered = allMenuItems.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category_name === selectedCategory;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [allMenuItems, selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Memuat menu...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-20 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-3">Menu KateringKu</h1>
        <p className="text-lg text-gray-700">
          Pilih menu favorit Anda — dimasak dengan bahan segar dan rasa rumahan.
        </p>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-6 md:px-10">
        {/* Search & Filter */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative md:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Cari nama menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none"
              />
            </div>
            <CustomDropdown
              options={sortOptions}
              selected={sortBy}
              onSelect={setSortBy}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-black shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item, index) => {
              const isAdded = item.id === addedItemId;
              return (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col animate-on-scroll"
                  style={{ transitionDelay: `${index * 50}ms` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image_url}
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
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdded}
                        className={`px-4 py-2 rounded-lg font-semibold transition w-32 ${
                          isAdded
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-yellow-400 hover:bg-yellow-500 text-black"
                        }`}
                      >
                        {isAdded ? "Ditambahkan ✓" : "Tambah"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <EmptyIcon />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                Menu Tidak Ditemukan
              </h3>
              <p className="mt-1 text-gray-500">
                Coba kata kunci atau filter kategori yang lain.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
