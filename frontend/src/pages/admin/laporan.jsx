import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// --- Komponen Ikon SVG (Pengganti React-Icons) ---
const FaListAlt = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const FaFileExport = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
    <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
  </svg>
);
const FaFilter = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
      clipRule="evenodd"
    />
  </svg>
);

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);
};

export default function LaporanPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [reportData, setReportData] = useState([]);
  const [summary, setSummary] = useState({ totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `/api/reports?${
            filterMonth === "all"
              ? `year=${filterYear}`
              : `month=${filterMonth}&year=${filterYear}`
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReportData(response.data.data.report);
        setSummary(response.data.data.summary);
      } catch (err) {
        setError("Gagal mengambil data laporan.");
        if (err.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [filterMonth, filterYear, logout]);

  const handleExportExcel = () => {
    if (!reportData || reportData.length === 0) {
      alert("Tidak ada data untuk diexport.");
      return;
    }

    // Format data
    const dataToExport = reportData.map((item, index) => ({
      No: index + 1,
      "Kode Pesanan": item.order_code,
      Tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
      "Nama Pelanggan": item.customer_name,
      "Total Harga": formatRupiah(item.total_amount),
      Status: item.status,
    }));

    // Buat worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport, { origin: "A3" });

    // Tambah judul besar di atas
    XLSX.utils.sheet_add_aoa(
      ws,
      [[`Laporan Penjualan Periode ${filterMonth}/${filterYear}`]],
      { origin: "A1" }
    );

    // Tambah summary di bawah data
    const lastRow = dataToExport.length + 5;
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [],
        ["Total Pesanan", summary.totalOrders],
        ["Total Pemasukan", formatRupiah(summary.totalRevenue)],
      ],
      { origin: `A${lastRow}` }
    );

    // Styling (manual)
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const col = XLSX.utils.encode_col(C);
      const cell = ws[`${col}3`];
      if (cell) {
        cell.s = {
          fill: { fgColor: { rgb: "4F81BD" } }, // biru elegan
          font: { bold: true, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center" },
        };
      }
    }

    // Auto width kolom
    const colWidths = Object.keys(dataToExport[0]).map((key) => ({
      wch:
        Math.max(
          key.length,
          ...dataToExport.map((item) => item[key]?.toString().length || 0)
        ) + 5,
    }));
    ws["!cols"] = colWidths;

    // Merge cell judul
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];

    // Buat workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");

    // Simpan file
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Laporan_Penjualan_${filterMonth}_${filterYear}.xlsx`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = reportData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reportData.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaListAlt /> Laporan Penjualan
          </h2>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <FaFileExport /> Export ke Excel
          </button>
        </header>

        <div
          id="filter-section"
          className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap gap-4 items-center"
        >
          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
            <FaFilter className="text-yellow-600" /> Filter Periode:
          </h4>
          <div className="flex items-center gap-2">
            <label htmlFor="month" className="text-gray-600 text-sm">
              Bulan:
            </label>
            <select
              id="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="all">Semua</option>
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="year" className="text-gray-600 text-sm">
              Tahun:
            </label>
            <select
              id="year"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">
              Total Pemasukan (Periode Terfilter)
            </p>
            <h3 className="text-3xl font-extrabold text-green-700 mt-1">
              {formatRupiah(summary.totalRevenue)}
            </h3>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm">
              Total Pesanan (Periode Terfilter)
            </p>
            <h3 className="text-3xl font-extrabold text-yellow-700 mt-1">
              {summary.totalOrders} Pesanan
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Detail Laporan Transaksi
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Kode Pesanan
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Tanggal
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Nama Pelanggan
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                    Total Harga
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10">
                      Memuat data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : reportData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-yellow-700">
                        {item.order_code}
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-4 text-gray-800 font-semibold">
                        {item.customer_name}
                      </td>
                      <td className="p-4 text-right font-bold text-green-600">
                        {formatRupiah(item.total_amount)}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Dibatalkan"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      Tidak ada data untuk periode ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
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
