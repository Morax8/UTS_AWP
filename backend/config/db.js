// backend/config/db.js

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Muat environment variables dari file .env
dotenv.config();

// Konfigurasi database - support DATABASE_URL atau individual variables
let dbConfig;

if (process.env.DATABASE_URL) {
  // Parse DATABASE_URL (format: mysql://user:password@host:port/database)
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading slash
    port: url.port || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
  console.log("Using DATABASE_URL for database connection");
} else {
  // Fallback ke individual environment variables
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
  console.log("Using individual DB environment variables");
}

// Buat connection pool
const pool = mysql.createPool(dbConfig);

console.log("Koneksi ke database berhasil dibuat.");

// Ekspor pool agar bisa digunakan di file lain
module.exports = pool;
