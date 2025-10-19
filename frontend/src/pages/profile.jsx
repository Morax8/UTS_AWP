import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

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

export default function ProfilePage() {
  const { currentUser, login } = useAuth();
  const [user, setUser] = useState(
    currentUser || { name: "", email: "", phone: "", address: "" }
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Anda harus login untuk melihat halaman ini.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Gagal mengambil data profil.");
        }
        setUser(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Hanya fetch jika data user belum ada di state
    if (!currentUser?.name) {
      fetchUserProfile();
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui profil.");
      }
      setSuccess(result.message);

      // Update data di context agar Navbar ikut berubah
      login(result.data, token);

      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading && !user.name)
    return <div className="text-center py-20">Memuat profil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Profil Saya
        </h1>
        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-lg mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 bg-green-100 p-3 rounded-lg mb-4">
            {success}
          </p>
        )}
        <form onSubmit={handleUpdate}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition ${
                    !editMode
                      ? "bg-gray-100 border border-gray-300 cursor-not-allowed"
                      : "bg-white border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition ${
                    !editMode
                      ? "bg-gray-100 border border-gray-300 cursor-not-allowed"
                      : "bg-white border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition ${
                    !editMode
                      ? "bg-gray-100 border border-gray-300 cursor-not-allowed"
                      : "bg-white border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alamat
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                  <AddressIcon />
                </div>
                <textarea
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  readOnly={!editMode}
                  rows="3"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition resize-none ${
                    !editMode
                      ? "bg-gray-100 border border-gray-300 cursor-not-allowed"
                      : "bg-white border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end gap-4">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Ubah Profil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
