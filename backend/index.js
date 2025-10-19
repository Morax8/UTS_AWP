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

// const pesananRoutes = require('./routes/pesananRoutes'); // Nanti diaktifkan jika sudah dibuat

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// app.use('/api/pesanan', pesananRoutes); // Nanti diaktifkan jika sudah dibuat

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

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
