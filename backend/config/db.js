// backend/config/db.js

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Muat environment variables dari file .env
dotenv.config();

// Buat connection pool. Pool lebih baik daripada koneksi tunggal
// untuk aplikasi web karena mengelola beberapa koneksi secara efisien.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("Koneksi ke database berhasil dibuat.");

// Ekspor pool agar bisa digunakan di file lain
module.exports = pool;
