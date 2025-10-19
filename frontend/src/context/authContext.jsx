import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Buat Context
const AuthContext = createContext(null);

// 2. Buat Provider (Komponen yang akan "membungkus" aplikasi)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Cek localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Buat custom hook untuk memudahkan pemakaian context
export const useAuth = () => {
  return useContext(AuthContext);
};
