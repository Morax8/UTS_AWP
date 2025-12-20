-- Database Schema untuk KateringKu
-- Jalankan script ini di database Anda

-- Buat tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel menu_categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel menu_items
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  category_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

-- Buat tabel orders
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
);

-- Buat tabel order_items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Buat tabel contacts
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO menu_categories (name, description) VALUES
('Makanan Utama', 'Menu makanan utama'),
('Minuman', 'Menu minuman'),
('Snack', 'Menu snack dan kue');

INSERT INTO menu_items (name, description, price, image_url, category_id, is_active, is_featured) VALUES
('Nasi Kuning', 'Nasi kuning dengan lauk pauk lengkap', 15000, '/images/nasi-kuning.jpg', 1, TRUE, TRUE),
('Rendang', 'Rendang daging sapi yang empuk', 25000, '/images/rendang.jpg', 1, TRUE, TRUE),
('Soto Ayam', 'Soto ayam dengan kuah bening', 18000, '/images/soto.jpg', 1, TRUE, TRUE),
('Es Teh Manis', 'Es teh manis segar', 5000, '/images/es-teh.jpg', 2, TRUE, FALSE),
('Kue Lapis', 'Kue lapis legit', 12000, '/images/kue-lapis.jpg', 3, TRUE, FALSE);

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@kateringku.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
