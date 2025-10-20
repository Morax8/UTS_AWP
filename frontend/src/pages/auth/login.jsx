import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Path diperbaiki

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login gagal.");

      login(result.user, result.token);

      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 space-y-6"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserIcon />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Alamat Email"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400 outline-none transition"
              placeholder="Password"
            />
          </div>
          {error && (
            <p className="text-red-600 font-medium text-center text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md transition transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-600 pt-2">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-medium text-yellow-600 hover:text-yellow-500 hover:underline"
            >
              Daftar di sini
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
