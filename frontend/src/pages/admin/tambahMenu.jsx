import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import axios from "axios";

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default function AddMenuPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
    is_active: true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${apiUrl}/api/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Gagal mengambil data kategori.");
        const result = await response.json();
        setCategories(result.data);
      } catch (err) {
        setError(
          "Gagal memuat kategori. Pastikan endpoint /api/categories sudah ada."
        );
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      // Convert boolean to integer for is_active
      if (key === "is_active") {
        data.append(key, formData[key] ? 1 : 0);
      } else {
        data.append(key, formData[key]);
      }
    });

    if (file) {
      data.append("image", file);
    }

    try {
      const token = localStorage.getItem("authToken");
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.post(`${apiUrl}/api/menu`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Menu baru berhasil ditambahkan!");
      navigate("/admin/master-menu");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan menu.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Tambah Menu Baru
            </h2>
            <Link
              to="/admin/master-menu"
              className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all border border-gray-300 shadow-sm"
            >
              <BackIcon /> Kembali
            </Link>
          </header>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* --- Nama Menu --- */}
              <div>
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Nasi Goreng Spesial"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* --- Harga --- */}
              <div>
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
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Contoh: 25000"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* --- Kategori --- */}
            <div>
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kategori
              </label>
              <select
                name="category_id"
                id="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Deskripsi --- */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deskripsi
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat menu (opsional)"
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            {/* --- Upload Gambar & Status --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Menu (Wajib)
                </label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border">
                      Preview
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors"
                    >
                      Pilih Gambar
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Format: JPG, PNG, WEBP.
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
                    checked={formData.is_active}
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

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            {/* --- Tombol Aksi --- */}
            <div className="flex justify-end gap-4 pt-4 border-t mt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/master-menu")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSaving ? "Menyimpan..." : "Simpan Menu"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
