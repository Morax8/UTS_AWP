import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import Sidebar from "../../components/sidebar";

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);

export default function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [menuData, setMenuData] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
    is_active: true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // 1. STATE BARU

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const menuRes = await axios.get(`${apiUrl}/api/menu/all`, config);
      const found = menuRes.data.data.find((m) => m.id === parseInt(id));
      if (!found) {
        alert("Menu tidak ditemukan");
        return navigate("/admin/master-menu");
      }
      setMenuData(found);
      setPreview(found.image_url);
    } catch (err) {
      console.error(err);
      if (err.message.includes("Akses")) logout();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuData({
      ...menuData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 2. FUNGSI HANDLE SUBMIT DIPERBARUI
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // <-- Set loading jadi true
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      const fixedData = {
        ...menuData,
        is_active: menuData.is_active ? 1 : 0,
      };
      Object.keys(fixedData).forEach((key) =>
        formData.append(key, fixedData[key])
      );
      if (file) formData.append("image", file);
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.put(`${apiUrl}/api/menu/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Menu berhasil diperbarui!");
      navigate("/admin/master-menu");
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui menu");
    } finally {
      setIsSubmitting(false); // <-- Balikin jadi false setelah selesai
    }
  };

  if (loading) return <div className="p-10">Memuat data...</div>;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Menu</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-8"
            encType="multipart/form-data"
          >
            <div className="md:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Menu
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={menuData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Harga (Rp)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={menuData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-gray-500 text-sm mt-1">
                {formatRupiah(menuData.price)}
              </p>
            </div>
            <div className="md:col-span-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kategori
              </label>
              <input
                type="text"
                id="category"
                value={menuData.category_name || "-"}
                disabled
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deskripsi
              </label>
              <textarea
                name="description"
                id="description"
                value={menuData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
              />
            </div>
            <div className="md:col-span-3 md:grid md:grid-cols-2 md:gap-6 items-start space-y-6 md:space-y-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Menu
                </label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-28 h-28 md:w-40 md:h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors"
                    >
                      Ubah Gambar
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Ganti gambar jika perlu.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Menu
                </label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <input
                    type="checkbox"
                    name="is_active"
                    id="is_active"
                    checked={menuData.is_active}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="is_active"
                    className="font-medium text-gray-700"
                  >
                    Menu ini Aktif
                  </label>
                </div>
              </div>
            </div>
            {/* --- 3. TOMBOL DIPERBARUI --- */}
            <div className="md:col-span-3 flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Memproses..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
