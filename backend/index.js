const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

// Import Routes
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://uts-awp-1.onrender.com',  // URL frontend di Render (tanpa slash di akhir)
    'http://localhost:3000',                   // Untuk development
    'http://localhost:5173'                   // Vite dev server
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Gunakan Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reports", reportRoutes);

// Route opsional untuk testing koneksi database
app.get("/api/test-db", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT NOW()`);
    res.json({
      message: "Koneksi database berhasil!",
      time: result[0]["NOW()"],
    });
  } catch (error) {
    console.error("Error saat query ke database:", error);
    res.status(500).json({ message: "Gagal terhubung ke database." });
  }
});

// Route untuk test CORS
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
    origin: req.headers.origin
  });
});

// Route untuk test menu tanpa database
app.get("/api/menu/simple", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "Nasi Kuning",
        description: "Nasi kuning dengan lauk pauk lengkap",
        image_url: "/images/nasi-kuning.jpg",
        price: 15000
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
