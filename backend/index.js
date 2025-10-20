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
    console.log("Testing database connection...");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_NAME:", process.env.DB_NAME);

    const [result] = await db.query(`SELECT NOW()`);
    res.json({
      message: "Koneksi database berhasil!",
      time: result[0]["NOW()"],
      config: {
        usingDatabaseUrl: !!process.env.DATABASE_URL,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
      }
    });
  } catch (error) {
    console.error("Error saat query ke database:", error);
    res.status(500).json({
      message: "Gagal terhubung ke database.",
      error: error.message,
      config: {
        usingDatabaseUrl: !!process.env.DATABASE_URL,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
      }
    });
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

// Route untuk test database query
app.get("/api/menu/debug", async (req, res) => {
  try {
    console.log("Testing database query...");

    // Test simple query
    const [result] = await db.query("SELECT 1 as test");
    console.log("Simple query result:", result);

    // Test table existence
    const [tables] = await db.query("SHOW TABLES");
    console.log("Tables found:", tables);

    // Test menu_items table
    const [menuItems] = await db.query("SELECT COUNT(*) as count FROM menu_items");
    console.log("Menu items count:", menuItems);

    res.json({
      success: true,
      simpleQuery: result,
      tables: tables,
      menuItemsCount: menuItems[0].count
    });
  } catch (error) {
    console.error("Database debug error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

// Route untuk test dashboard stats sederhana
app.get("/api/dashboard/simple", async (req, res) => {
  try {
    console.log("Testing simple dashboard stats...");

    const [menuCount] = await db.query("SELECT COUNT(*) as count FROM menu_items WHERE is_active = TRUE");
    const [userCount] = await db.query("SELECT COUNT(*) as count FROM users");
    const [orderCount] = await db.query("SELECT COUNT(*) as count FROM orders");

    res.json({
      success: true,
      data: {
        totalMenuItems: menuCount[0].count,
        totalUsers: userCount[0].count,
        totalOrders: orderCount[0].count,
        totalRevenue: 0
      }
    });
  } catch (error) {
    console.error("Simple dashboard error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Route untuk insert sample data
app.get("/api/menu/init", async (req, res) => {
  try {
    console.log("Initializing sample data...");

    // Create all tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(500),
        category_id INT,
        is_active BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_code VARCHAR(50) UNIQUE NOT NULL,
        user_id INT,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        customer_address TEXT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        menu_item_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
      )
    `);

    // Insert sample data
    await db.query(`
      INSERT IGNORE INTO menu_items (name, description, price, image_url, is_active, is_featured) VALUES
      ('Nasi Kuning', 'Nasi kuning dengan lauk pauk lengkap', 15000, '/images/nasi-kuning.jpg', TRUE, TRUE),
      ('Rendang', 'Rendang daging sapi yang empuk', 25000, '/images/rendang.jpg', TRUE, TRUE),
      ('Soto Ayam', 'Soto ayam dengan kuah bening', 18000, '/images/soto.jpg', TRUE, TRUE)
    `);

    // Insert admin user (password: admin123)
    await db.query(`
      INSERT IGNORE INTO users (name, email, password, role) VALUES
      ('Admin', 'admin@kateringku.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
    `);

    res.json({
      success: true,
      message: "All tables and sample data created successfully"
    });
  } catch (error) {
    console.error("Init data error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
