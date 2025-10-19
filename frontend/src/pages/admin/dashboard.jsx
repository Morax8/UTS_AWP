import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { FaDollarSign, FaShoppingBasket, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Sidebar from "../../components/sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Gagal mengambil data dashboard.");

        const result = await response.json();
        setStats(result.data);
      } catch (err) {
        setError(err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, logout]);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);

  const COLORS = ["#FACC15", "#22C55E", "#3B82F6", "#A855F7", "#F97316"];

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center bg-yellow-50">
          <p>Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center bg-yellow-50 text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-yellow-50">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-right">
            <p className="font-semibold text-gray-700">Ringkasan Bulan Ini</p>
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

        {/* --- Stat Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Pesanan Bulan Ini</p>
              <h3 className="text-4xl font-extrabold text-yellow-600 mt-1">
                {stats?.totalOrdersThisMonth}
              </h3>
            </div>
            <FaShoppingBasket className="text-4xl text-yellow-400 opacity-30" />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Pemasukan</p>
              <h3 className="text-4xl font-extrabold text-green-600 mt-1">
                {formatRupiah(stats?.totalRevenueThisMonth)}
              </h3>
            </div>
            <FaDollarSign className="text-4xl text-green-500 opacity-30" />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Pelanggan</p>
              <h3 className="text-4xl font-extrabold text-blue-600 mt-1">
                {stats?.totalCustomers}
              </h3>
            </div>
            <FaUsers className="text-4xl text-blue-500 opacity-30" />
          </div>
        </div>

        {/* --- Chart Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
          {/* Bar Chart */}
          <div className="bg-white lg:col-span-3 rounded-xl shadow-md p-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              Pemasukan Harian (7 Hari Terakhir)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.dailySales || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fill: "#6B7280" }} />
                <YAxis
                  tickFormatter={(v) => `Rp${v.toLocaleString("id-ID")}`}
                  tick={{ fill: "#6B7280" }}
                />
                <Tooltip
                  formatter={(v) => formatRupiah(v)}
                  contentStyle={{ borderRadius: "10px" }}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#colorSales)"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                />
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white lg:col-span-2 rounded-xl shadow-md p-6 flex flex-col items-center">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              Penjualan per Kategori
            </h4>
            {stats?.categorySales?.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.categorySales.map((item) => ({
                      name: item.name,
                      value: Number(item.category_total) || 0, // <--- ini kuncinya bro
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {stats.categorySales.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                  />
                  <Tooltip formatter={(v) => formatRupiah(v)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">Belum ada data kategori.</p>
            )}
          </div>
        </div>

        {/* --- Tabel Menu Terlaris --- */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Menu Paling Laris
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Header Tabel yang Diperbarui */}
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                    No
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Nama Menu
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Terjual
                  </th>
                </tr>
              </thead>
              {/* Body Tabel yang Diperbarui */}
              <tbody>
                {stats?.topMenus?.length > 0 ? (
                  stats.topMenus.map((item, index) => (
                    <tr
                      key={item.name}
                      className="border-b border-gray-200 hover:bg-yellow-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-gray-500">
                        {index + 1}
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800">
                        {item.name}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-700 font-semibold">
                        {item.total_sold} Pcs
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-12 text-gray-500">
                      Belum ada data menu terlaris.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
