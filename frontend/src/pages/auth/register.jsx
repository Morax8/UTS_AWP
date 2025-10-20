import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- Komponen Ikon SVG ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const AddressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registrasi gagal.");
      }
      setSuccess(result.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold tracking-tight">
            <span className="font-black text-yellow-600">Katering</span>
            <span className="font-light text-gray-700">Ku</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Buat Akun Baru
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 space-y-6"
        >
          {/* Input Nama */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserIcon />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Nama Lengkap"
            />
          </div>
          {/* Input Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <EmailIcon />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Alamat Email"
            />
          </div>
          {/* Input Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Password"
            />
          </div>

          {/* --- PERUBAHAN DI SINI --- */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PhoneIcon />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Nomor Telepon"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <AddressIcon />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Alamat"
            />
          </div>
          {/* --- BATAS PERUBAHAN --- */}

          {error && (
            <p className="text-red-600 font-medium text-center text-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 font-medium text-center text-sm">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md transition transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-medium text-yellow-600 hover:text-yellow-500"
            >
              Login di sini
            </Link>
          </p>
        </form>
      </div>
      <p className="mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} KateringKu. All rights reserved.
      </p>
    </div>
  );
}
