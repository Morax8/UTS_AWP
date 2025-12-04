// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext.jsx";

const BACKEND_URL = "https://uts-awp.onrender.com/api/test-db";

const wakeUpServer = async () => {
  try {
    // Kita panggil backend cuma buat bangunin
    console.log("Mencoba membangunkan backend...");
    await fetch(BACKEND_URL);
    console.log("Backend sudah bangun!");
  } catch (error) {
    // Biasanya error timeout karena kelamaan bangun, itu wajar
    console.log("Sedang proses bangun (Cold Start)...");
  }
};

// Panggil fungsi ini langsung saat aplikasi dimuat
wakeUpServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
