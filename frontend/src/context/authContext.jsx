import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true); // State untuk loading pengecekan auth
  const navigate = useNavigate();

  useEffect(() => {
    // Cek token saat aplikasi pertama kali dimuat
    const checkUser = async () => {
      if (token) {
        try {
          // Di dunia nyata, kamu akan mem-validasi token ini ke server
          // Untuk sekarang, kita asumsikan token di localStorage = user valid
          // Kamu bisa decode token untuk mendapatkan data user
          const storedUser = JSON.parse(localStorage.getItem("user"));
          if (storedUser) {
            setUser(storedUser);
          } else {
            // Jika tidak ada user di storage, hapus token
            localStorage.removeItem("authToken");
            setToken(null);
          }
        } catch (error) {
          console.error("Gagal memuat data user:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false); // Selesai pengecekan
    };

    checkUser();
  }, [token]);

  const login = (userData, authToken) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    // Navigasi sudah di-handle di halaman login
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login"); // Redirect ke login setelah logout
  };

  const value = { user, token, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
