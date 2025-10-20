import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../../components/sidebar";

export default function MasterPesanan() {
  const navigate = useNavigate();
  const [pesananData, setPesananData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // === Fetch data dari backend ===
  useEffect(() => {
    axios
      .get("/api/orders") // ganti sesuai route lu
      .then((res) => {
        if (res.data.success) {
          setPesananData(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal fetch pesanan:", err));
  }, []);

  // Filter berdasarkan pencarian dan status
  const filteredData = pesananData.filter((p) => {
    const matchSearch =
      p.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      p.order_code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  // Fungsi untuk mendapatkan style status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Proses":
        return "bg-yellow-100 text-yellow-700";
      case "Dibatalkan":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Update status pesanan
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status: newStatus });
      setPesananData((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      alert("Status pesanan berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Gagal memperbarui status pesanan.");
    }
  };

  // Hapus pesanan
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus pesanan ini?")) return;

    try {
      await axios.delete(`/api/orders/${id}`);
      setPesananData((prev) => prev.filter((p) => p.id !== id));
      alert("Pesanan berhasil dihapus!");
    } catch (error) {
      console.error("Gagal hapus pesanan:", error);
      alert("Gagal menghapus pesanan.");
    }
  };
  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset ke page 1 tiap kali search/filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* === Wrapper utama === */}
      <div className="flex flex-1">
        <Sidebar />
        {/* === Main Content: Master Pesanan === */}
        <main className="flex-1 p-10">
          {/* Header - Ditambahkan animasi slide-in-down */}
          <header
            className="flex justify-between items-center mb-8 animate-slide-in-down"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="text-3xl font-bold text-yellow-700">
              Master Pesanan
            </h2>
            <div className="text-right">
              <p className="font-semibold text-gray-700">
                Kelola Semua Transaksi Pesanan
              </p>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </header>

          {/* Konten Utama - Ditambahkan animasi fade-in */}
          <div
            className="bg-white rounded-xl shadow-2xl p-6 border-t-4 border-yellow-500 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-700 mb-4 md:mb-0">
                Daftar Pesanan Terbaru
              </h3>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                {/* Input Pencarian - Transisi focus */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Cari Pesanan atau Pelanggan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg w-full focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 focus:shadow-md"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {/* Filter Status (Dummy) - Transisi focus */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="py-2 px-3 border border-gray-300 rounded-lg bg-white focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                >
                  <option value="">Semua Status</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>
            </div>

            {/* Tabel Master Pesanan */}
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-700 bg-gray-100 border-b border-gray-300 sticky top-0 shadow-sm">
                    <th className="p-4">ID Pesanan</th>
                    <th className="p-4">Pelanggan</th>
                    <th className="p-4">Menu Dipesan</th>
                    <th className="p-4">Total Harga</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Efek hover pada baris tabel */}
                  {currentItems.map((pesanan, index) => (
                    <tr
                      key={pesanan.id}
                      className="border-b border-gray-100 hover:bg-yellow-50/50"
                    >
                      <td className="py-3 px-4 font-medium text-gray-600">
                        #{pesanan.id}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {pesanan.customer_name}
                      </td>
                      <td className="py-3 px-4">
                        {pesanan.items.map((item) => (
                          <div key={item.menu_name}>
                            {item.menu_name} x{item.quantity}
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-4 text-green-600 font-semibold">
                        Rp {pesanan.total_amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            pesanan.status
                          )}`}
                        >
                          {pesanan.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-3 flex items-center">
                        {/* Dropdown Update Status */}
                        <select
                          value={pesanan.status}
                          onChange={(e) =>
                            handleUpdateStatus(pesanan.id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        >
                          <option value="Pesanan Diterima">
                            Pesanan Diterima
                          </option>
                          <option value="Sedang Dimasak">Sedang Dimasak</option>
                          <option value="Dalam Pengantaran">
                            Dalam Pengantaran
                          </option>
                          <option value="Selesai">Selesai</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </select>

                        {/* Tombol Delete */}
                        <button
                          title="Hapus Pesanan"
                          onClick={() => handleDelete(pesanan.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <FaTimesCircle className="text-lg" />
                          <span className="font-medium">Hapus</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
