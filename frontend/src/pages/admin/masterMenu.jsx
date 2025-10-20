import React, { useState, useEffect, useMemo } from "react"; // 1. Import useMemo
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import axios from "axios";

// Fungsi format mata uang
const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);

// --- Komponen Utama Halaman ---
export default function MasterMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // --- 2. STATE BARU UNTUK FILTER & SEARCH ---

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState(""); // Akan menyimpan ID kategori // --- FUNGSI FETCH (Tidak berubah) ---

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const [menuRes, catRes] = await Promise.all([
        fetch(`${apiUrl}/api/menu/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/api/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!menuRes.ok) throw new Error("Gagal mengambil data menu.");
      if (!catRes.ok) throw new Error("Gagal mengambil data kategori.");

      const menuResult = await menuRes.json();
      const catResult = await catRes.json();

      setMenuItems(menuResult.data);
      setCategories(catResult.data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Akses ditolak")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // --- 4. LOGIKA FILTER MENGGUNAKAN useMemo --- // visibleItems akan dihitung ulang HANYA jika menuItems, filterCategory, atau searchTerm berubah

  const visibleItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        // Filter Kategori
        // Jika filterCategory kosong (""), tampilkan semua
        if (filterCategory === "") {
          return true;
        } // Asumsi: item menu punya properti `category_id`
        return String(item.category_id) === filterCategory;
      })
      .filter((item) => {
        // Filter Search Term
        // Cek apakah nama menu (lowercase) mengandung searchTerm (lowercase)
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [menuItems, filterCategory, searchTerm]); // Dependensinya

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus menu ini? Ini akan menghapus data terkait di pesanan."
      )
    ) {
      try {
        const token = localStorage.getItem("authToken");
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${apiUrl}/api/menu/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Gagal menghapus menu.");
        fetchData(); // Refresh data setelah hapus (visibleItems akan otomatis update)
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // jumlah item per halaman
  // --- Hitung data untuk halaman saat ini ---
  const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = visibleItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Master Menu</h2>

          <button
            onClick={() => navigate("/admin/master-menu/add")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
          >
            <FaPlus /> Tambah Menu
          </button>
        </header>
        {/* --- 3. UI BARU UNTUK FILTER & SEARCH --- */}
        <div className="mb-6 p-4 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Cari nama menu..."
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/4"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    ID
                  </th>

                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Nama Menu
                  </th>

                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Kategori
                  </th>

                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Harga
                  </th>

                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Memuat data menu...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : /* --- 5. RENDER DARI visibleItems --- */
                currentItems.length > 0 ? (
                  currentItems.map((menu) => (
                    <tr key={menu.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-gray-700">{menu.id}</td>

                      <td className="p-4 font-semibold text-gray-900">
                        {menu.name}
                      </td>

                      <td className="p-4 text-gray-600">
                        {menu.category_name}
                      </td>

                      <td className="p-4 text-green-600 font-medium">
                        {formatRupiah(menu.price)}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            menu.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {menu.is_active ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>

                      <td className="p-4 space-x-3">
                        <button
                          title="Edit"
                          onClick={() =>
                            navigate(`/admin/master-menu/edit/${menu.id}`)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <FaEdit className="text-sm" />
                          <span className="font-medium text-sm">Edit</span>
                        </button>

                        <button
                          onClick={() => handleDelete(menu.id)}
                          title="Hapus"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <FaTrashAlt className="text-sm" />
                          <span className="font-medium text-sm">Hapus</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* --- 6. PESAN JIKA HASIL FILTER KOSONG --- */
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Tidak ada menu yang sesuai dengan pencarian/filter Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* --- Pagination Controls --- */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
