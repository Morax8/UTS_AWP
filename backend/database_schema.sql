-- Menonaktifkan cek Foreign Key dan Auto-Commit sementara untuk eksekusi cepat
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Bagian 1: PEMBUATAN STRUKTUR TABLE (CREATE TABLE)
--
-- Menghapus tabel lama (jika ada) untuk memastikan clean state
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `contact_messages`;
DROP TABLE IF EXISTS `menu_items`;
DROP TABLE IF EXISTS `menu_categories`;
DROP TABLE IF EXISTS `users`;


-- Table `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `contact_messages`
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` enum('Baru','Sudah Dibaca','Selesai') DEFAULT 'Baru',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `menu_categories`
CREATE TABLE `menu_categories` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `menu_items`
CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `orders`
CREATE TABLE `orders` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `order_code` varchar(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_address` text NOT NULL,
  `total_amount` int(11) NOT NULL,
  `status` enum('Pesanan Diterima','Sedang Dimasak','Dalam Pengantaran','Selesai','Dibatalkan') DEFAULT 'Pesanan Diterima',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `order_items`
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Bagian 2: DATA (INSERT INTO)
--
-- Data untuk users
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Katering', 'admin@kateringku.com', '$2b$10$abcdefghijklmnopqrstuv', NULL, '', 'admin', '2025-10-17 14:56:17', '2025-10-17 14:56:17'),
(2, 'Pelanggan Budi', 'budi@example.com', '$2b$10$wxyzabcdefghijklmnop', NULL, '', 'customer', '2025-10-17 14:56:17', '2025-10-17 14:56:17'),
(3, 'Aditya Zianur', 'adityazianurrahman@gmail.com', '$2b$10$d6Zgp/tlJvmHxkvkDvKsxeXx15M4IDzqrxJSjc5R8frTrvBD2gsJ.', NULL, '', 'admin', '2025-10-19 09:34:12', '2025-10-19 09:37:52'),
(4, 'ini cuma tes', 'tesdoang@gmail.com', '$2b$10$UTddkmGhEIpoV8c53FlkBOUXdRGEEHMEJrOq6Ne.MOYcnPmGHTDva', '081291919191', 'di umn aja sih bro', 'customer', '2025-10-19 09:51:47', '2025-10-19 10:32:59'),
(5, 'admin', 'admin@admin.com', '$2b$10$/DvrNdtWciztfAjQdCRBOu9ow3bqqlh0MpLyJavK1ZtD8mreb.Xka', NULL, NULL, 'admin', '2025-10-19 10:12:31', '2025-10-19 14:57:56');

-- Data untuk menu_categories
INSERT INTO `menu_categories` (`id`, `name`, `created_at`) VALUES
(1, 'Makanan Utama', '2025-10-17 14:56:17'),
(2, 'Makanan Nusantara', '2025-10-17 14:56:17'),
(3, 'Makanan Kuah', '2025-10-17 14:56:17'),
(4, 'Snack & Kue', '2025-10-17 14:56:17'),
(5, 'Minuman', '2025-10-17 14:56:17');

-- Data untuk menu_items
INSERT INTO `menu_items` (`id`, `category_id`, `name`, `description`, `price`, `image_url`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 1, 'Nasi Putih', 'Nasi putih pulen', 5000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReEdmb61-nasi.jpg', 1, 1, '2025-10-20 18:30:00', '2025-10-20 19:28:00'),
(2, 1, 'Ayam Goreng', 'Ayam goreng bumbu rempah', 15000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReERbA23-ilustrasi-ayam-goreng_43.jpeg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:28:40'),
(3, 1, 'Tempe Goreng', 'Tempe goreng tepung renyah', 3000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReE3Ru3L-011678000_1624676204-shutterstock_1985813441.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:29:57'),
(4, 1, 'Tahu Goreng', 'Tahu goreng isi sayuran', 3000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDKEKKn-tahu-goreng.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:32:17'),
(5, 1, 'Kentang Mustofa', 'Kering kentang pedas manis', 8000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDnx42u-tempat-beli-kentang-mustofa.png.jpeg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:30:44'),
(6, 1, 'Ayam Semur', 'Ayam semur kecap manis', 18000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDjJzE3-semur-ayam-kecap-2_11zon.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:30:58'),
(7, 1, 'Mie Telur', 'Mie goreng telur spesial', 12000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDeFuDh-099632200_1589527804-shutterstock_1455941861.jpg.webp', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:31:14'),
(8, 1, 'Tumis Kangkung', 'Tumis kangkung bawang putih', 10000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDas67N-Tumis-Kangkung.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:31:29'),
(9, 1, 'Tahu Bakso', 'Tahu bakso kukus', 7000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDWCc8R-60a8e98735972.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:31:43'),
(10, 1, 'Perkedel', 'Perkedel kentang kornet', 5000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDNzDEJ-4gEUTbb1o4aUFYHCZjwufkfSManUbPxz-31363538353933383436d41d8cd98f00b204e9800998ecf8427e.jpg.webp', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:32:05'),
(11, 2, 'Rendang', 'Rendang daging sapi Padang', 25000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReDA82A6-rendang-daging-sapi-pedas.jpg', 1, 1, '2025-10-20 18:30:00', '2025-10-20 19:32:48'),
(12, 2, 'Soto Betawi', 'Soto Betawi santan susu', 30000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReD16VR6-IMG_20210505_084453.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:33:21'),
(13, 2, 'Rawon', 'Rawon daging sapi kluwek', 32000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReCtdqKs-rawon.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:33:46'),
(14, 2, 'Nasi Liwet', 'Nasi liwet komplit ayam suwir', 28000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReCn1U2k-nasi%20liwet.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:34:05'),
(15, 2, 'Gudeg', 'Gudeg nangka muda Jogja', 27000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReCdd8Ae-gudeg.jpeg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:34:32'),
(16, 2, 'Ayam Rica-Rica', 'Ayam bumbu rica-rica pedas', 26000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReCYn62S-ayam%20rica%20rica.jpeg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:34:46'),
(17, 2, 'Ayam Pop', 'Ayam pop khas Padang', 25000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReCSCrSh-ayam%20pop.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:35:10'),
(18, 2, 'Ayam Taliwang', 'Ayam bakar Taliwang Lombok', 30000, 'https://placehold.co/600x400/ECF0F1/black?text=Ayam+Taliwang', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(19, 2, 'Soto Kudus', 'Soto Kudus ayam suwir', 22000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReC9MVHT-soto%20kudus.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:36:09'),
(20, 2, 'Coto Makassar', 'Coto Makassar daging jeroan', 35000, 'https://upcdn.io/223k2Rv/raw/uploads/2025/10/20/4jReC46dGa-coto%20makassar.jpg', 1, 0, '2025-10-20 18:30:00', '2025-10-20 19:36:25'),
(21, 3, 'Sop Iga', 'Sop iga sapi empuk', 45000, 'https://placehold.co/600x400/ECF0F1/black?text=Sop+Iga', 1, 1, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(22, 3, 'Soto Ayam', 'Soto ayam bening segar', 20000, 'https://placehold.co/600x400/ECF0F1/black?text=Soto+Ayam', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(23, 3, 'Sop Buntut', 'Sop buntut klasik', 50000, 'https://placehold.co/600x400/ECF0F1/black?text=Sop+Buntut', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(24, 3, 'Opor Ayam', 'Opor ayam bumbu kuning', 28000, 'https://placehold.co/600x400/ECF0F1/black?text=Opor+Ayam', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(25, 3, 'Gulai Kambing', 'Gulai daging kambing', 40000, 'https://placehold.co/600x400/ECF0F1/black?text=Gulai+Kambing', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(26, 3, 'Sayur Lodeh', 'Sayur lodeh santan gurih', 15000, 'https://placehold.co/600x400/ECF0F1/black?text=Sayur+Lodeh', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(27, 3, 'Sayur Asem', 'Sayur asem Jakarta', 12000, 'https://placehold.co/600x400/ECF0F1/black?text=Sayur+Asem', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(28, 3, 'Soto Ceker', 'Soto ceker ayam pedas', 18000, 'https://placehold.co/600x400/ECF0F1/black?text=Soto+Ceker', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(29, 3, 'Sop Bakso', 'Sop bakso sapi sayuran', 20000, 'https://placehold.co/600x400/ECF0F1/black?text=Sop+Bakso', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(30, 3, 'Sayur Labu', 'Sayur labu siam santan', 13000, 'https://placehold.co/600x400/ECF0F1/black?text=Sayur+Labu', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(31, 4, 'Gorengan', 'Aneka gorengan (bakwan, tempe)', 2000, 'https://placehold.co/600x400/ECF0F1/black?text=Gorengan', 1, 1, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(32, 4, 'Klepon', 'Klepon isi gula merah', 10000, 'https://placehold.co/600x400/ECF0F1/black?text=Klepon', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(33, 4, 'Serabi', 'Serabi kuah kinca', 12000, 'https://placehold.co/600x400/ECF0F1/black?text=Serabi', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(34, 4, 'Martabak Mini', 'Martabak manis mini aneka topping', 8000, 'https://placehold.co/600x400/ECF0F1/black?text=Martabak+Mini', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(35, 4, 'Dadar Gulung', 'Dadar gulung isi kelapa', 5000, 'https://placehold.co/600x400/ECF0F1/black?text=Dadar+Gulung', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(36, 4, 'Sosis Solo', 'Sosis solo basah', 7000, 'https://placehold.co/600x400/ECF0F1/black?text=Sosis+Solo', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(37, 4, 'Combro & Misro', 'Combro pedas & Misro manis', 5000, 'https://placehold.co/600x400/ECF0F1/black?text=Combro+Misro', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(38, 4, 'Lemper Ayam', 'Lemper isi ayam cincang', 6000, 'https://placehold.co/600x400/ECF0F1/black?text=Lemper+Ayam', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(39, 4, 'Kue Lapis', 'Kue lapis pepe', 7000, 'https://placehold.co/600x400/ECF0F1/black?text=Kue+Lapis', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(40, 4, 'Brownies Coklat', 'Potongan brownies coklat panggang', 15000, 'https://placehold.co/600x400/ECF0F1/black?text=Brownies+Coklat', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(41, 5, 'Air Putih', 'Air mineral kemasan', 3000, 'https://placehold.co/600x400/ECF0F1/black?text=Air+Putih', 1, 1, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(42, 5, 'Es Teh Manis', 'Es teh manis segar', 8000, 'https://placehold.co/600x400/ECF0F1/black?text=Es+Teh+Manis', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(43, 5, 'Kopi Susu', 'Kopi susu gula aren', 18000, 'https://placehold.co/600x400/ECF0F1/black?text=Kopi+Susu', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(44, 5, 'Kopi Tubruk', 'Kopi hitam tubruk', 10000, 'https://placehold.co/600x400/ECF0F1/black?text=Kopi+Tubruk', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(45, 5, 'Es Kopi', 'Es kopi hitam', 15000, 'https://placehold.co/600x400/ECF0F1/black?text=Es+Kopi', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(46, 5, 'Es Jeruk', 'Es jeruk peras murni', 12000, 'https://placehold.co/600x400/ECF0F1/black?text=Es+Jeruk', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(47, 5, 'Jus Alpukat', 'Jus alpukat kental', 18000, 'https://placehold.co/600x400/ECF0F1/black?text=Jus+Alpukat', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(48, 5, 'Es Kopyor', 'Es kopyor sirup cocopandan', 20000, 'https://placehold.co/600x400/ECF0F1/black?text=Es+Kopyor', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(49, 5, 'Susu Coklat', 'Susu coklat hangat/dingin', 12000, 'https://placehold.co/600x400/ECF0F1/black?text=Susu+Coklat', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00'),
(50, 5, 'Susu Plain', 'Susu putih hangat/dingin', 10000, 'https://placehold.co/600x400/ECF0F1/black?text=Susu+Plain', 1, 0, '2025-10-20 18:30:00', '2025-10-20 18:30:00');

-- Data untuk orders
INSERT INTO `orders` (`id`, `order_code`, `user_id`, `customer_name`, `customer_phone`, `customer_address`, `total_amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 'KTG-20250115-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 43000, 'Selesai', '2025-01-15 03:00:00', '2025-01-15 05:30:00'),
(2, 'KTG-20250120-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 71000, 'Selesai', '2025-01-20 04:30:00', '2025-01-20 06:00:00'),
(3, 'KTG-20250205-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 105000, 'Selesai', '2025-02-05 02:15:00', '2025-02-05 04:00:00'),
(4, 'KTG-20250210-001', 2, 'Pelanggan Tamu', '081111111111', 'Kantor ABC, Jl. Sudirman', 30000, 'Selesai', '2025-02-10 07:00:00', '2025-02-10 08:30:00'),
(5, 'KTG-20250301-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 68000, 'Selesai', '2025-03-01 10:00:00', '2025-03-01 11:30:00'),
(6, 'KTG-20250315-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 45000, 'Selesai', '2025-03-15 03:30:00', '2025-03-15 05:00:00'),
(7, 'KTG-20250320-001', 4, 'Siti', '082222222222', 'Apartemen Mentari, Tower B', 23000, 'Selesai', '2025-03-20 12:00:00', '2025-03-20 13:00:00'),
(8, 'KTG-20250402-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 100000, 'Selesai', '2025-04-02 05:00:00', '2025-04-02 06:00:00'),
(9, 'KTG-20250410-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 80000, 'Selesai', '2025-04-10 04:00:00', '2025-04-10 05:30:00'),
(10, 'KTG-20250425-001', 2, 'Andi', '083333333333', 'Perumahan Cendana, Blok A1', 52000, 'Selesai', '2025-04-25 11:30:00', '2025-04-25 12:30:00'),
(11, 'KTG-20250505-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 62000, 'Selesai', '2025-05-05 03:00:00', '2025-05-05 04:30:00'),
(12, 'KTG-20250515-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 25000, 'Selesai', '2025-05-15 06:00:00', '2025-05-15 07:00:00'),
(13, 'KTG-20250528-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 96000, 'Selesai', '2025-05-28 08:00:00', '2025-05-28 09:30:00'),
(14, 'KTG-20250601-001', 4, 'Rina', '084444444444', 'Jl. Melati No. 10', 44000, 'Selesai', '2025-06-01 04:30:00', '2025-06-01 05:30:00'),
(15, 'KTG-20250610-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 150000, 'Selesai', '2025-06-10 12:00:00', '2025-06-10 13:30:00'),
(16, 'KTG-20250620-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 64000, 'Selesai', '2025-06-20 03:00:00', '2025-06-20 04:00:00'),
(17, 'KTG-20250630-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 30000, 'Selesai', '2025-06-30 07:30:00', '2025-06-30 08:30:00'),
(18, 'KTG-20250705-001', 2, 'Deni', '085555555555', 'Kost Mawar, Kamar 12', 39000, 'Selesai', '2025-07-05 05:00:00', '2025-07-05 06:00:00'),
(19, 'KTG-20250715-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 70000, 'Selesai', '2025-07-15 09:00:00', '2025-07-15 10:00:00'),
(20, 'KTG-20250725-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 56000, 'Selesai', '2025-07-25 04:00:00', '2025-07-25 05:00:00'),
(21, 'KTG-20250801-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 40000, 'Selesai', '2025-08-01 06:00:00', '2025-08-01 07:00:00'),
(22, 'KTG-20250810-001', 4, 'Eka', '086666666666', 'Toko Buku Gramedia', 28000, 'Selesai', '2025-08-10 08:30:00', '2025-08-10 09:30:00'),
(23, 'KTG-20250817-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 90000, 'Selesai', '2025-08-17 03:00:00', '2025-08-17 04:30:00'),
(24, 'KTG-20250825-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 10000, 'Selesai', '2025-08-25 12:00:00', '2025-08-25 13:00:00'),
(25, 'KTG-20250901-001', 2, 'Fajar', '087777777777', 'Jl. Kenanga No. 8', 60000, 'Selesai', '2025-09-01 04:00:00', '2025-09-01 05:00:00'),
(26, 'KTG-20250905-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 52000, 'Selesai', '2025-09-05 07:00:00', '2025-09-05 08:00:00'),
(27, 'KTG-20250910-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 76000, 'Selesai', '2025-09-10 11:00:00', '2025-09-10 12:00:00'),
(28, 'KTG-20250915-001', 4, 'Gita', '088888888888', 'Lobby Mall Summarecon', 38000, 'Selesai', '2025-09-15 05:30:00', '2025-09-15 06:30:00'),
(29, 'KTG-20250920-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 110000, 'Selesai', '2025-09-20 03:30:00', '2025-09-20 05:00:00'),
(30, 'KTG-20250925-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 40000, 'Selesai', '2025-09-25 09:30:00', '2025-09-25 10:30:00'),
(31, 'KTG-20250928-001', 2, 'Hadi', '089999999999', 'Jl. Pahlawan Seribu', 80000, 'Selesai', '2025-09-28 04:00:00', '2025-09-28 05:00:00'),
(32, 'KTG-20250930-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 60000, 'Selesai', '2025-09-30 06:00:00', '2025-09-30 07:00:00'),
(33, 'KTG-20251001-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 30000, 'Selesai', '2025-10-01 10:00:00', '2025-10-01 11:00:00'),
(34, 'KTG-20251002-001', 4, 'Indah', '081211112222', 'RS Bethsaida', 26000, 'Selesai', '2025-10-02 05:00:00', '2025-10-02 06:00:00'),
(35, 'KTG-20251003-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 46000, 'Selesai', '2025-10-03 03:00:00', '2025-10-03 04:00:00'),
(36, 'KTG-20251004-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 56000, 'Selesai', '2025-10-04 07:00:00', '2025-10-04 08:00:00'),
(37, 'KTG-20251005-001', 2, 'Joko', '081233334444', 'Universitas Pradita', 35000, 'Selesai', '2025-10-05 09:00:00', '2025-10-05 10:00:00'),
(38, 'KTG-20251006-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 70000, 'Selesai', '2025-10-06 04:30:00', '2025-10-06 05:30:00'),
(39, 'KTG-20251007-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 40000, 'Selesai', '2025-10-07 11:30:00', '2025-10-07 12:30:00'),
(40, 'KTG-20251008-001', 4, 'Kiki', '081255556666', 'Scientia Park', 130000, 'Selesai', '2025-10-08 06:00:00', '2025-10-08 07:00:00'),
(41, 'KTG-20251010-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 78000, 'Sedang Dimasak', '2025-10-10 02:00:00', '2025-10-10 02:15:00'),
(42, 'KTG-20251011-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 45000, 'Sedang Dimasak', '2025-10-11 04:00:00', '2025-10-11 04:10:00'),
(43, 'KTG-20251012-001', 2, 'Lina', '081277778888', 'Jl. BSD Raya Utama', 55000, 'Sedang Dimasak', '2025-10-12 07:00:00', '2025-10-12 07:05:00'),
(44, 'KTG-20251013-001', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 27000, 'Sedang Dimasak', '2025-10-13 03:30:00', '2025-10-13 03:35:00'),
(45, 'KTG-20251015-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 84000, 'Sedang Dimasak', '2025-10-15 10:00:00', '2025-10-15 10:10:00'),
(46, 'KTG-20251018-001', 4, 'Mira', '081299990000', 'ICE BSD, Hall 10', 120000, 'Dalam Pengantaran', '2025-10-18 04:00:00', '2025-10-18 04:45:00'),
(47, 'KTG-20251018-002', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 60000, 'Dalam Pengantaran', '2025-10-18 08:00:00', '2025-10-18 08:30:00'),
(48, 'KTG-20251019-001', 4, 'ini cuma tes', '081291919191', 'di umn aja sih bro', 40000, 'Dalam Pengantaran', '2025-10-19 03:00:00', '2025-10-19 03:30:00'),
(49, 'KTG-20251019-002', 2, 'Nina', '081311112222', 'QBig BSD', 38000, 'Dalam Pengantaran', '2025-10-19 07:30:00', '2025-10-19 08:00:00'),
(50, 'KTG-20251019-003', 2, 'Pelanggan Budi', '081234567890', 'Jl. UMN No. 1, Gading Serpong, Tangerang', 76000, 'Dalam Pengantaran', '2025-10-19 12:00:00', '2025-10-19 12:30:00');

-- Data untuk order_items
INSERT INTO `order_items` (`id`, `order_id`, `menu_item_id`, `quantity`, `unit_price`) VALUES
(1, 1, 1, 2, 5000), (2, 1, 2, 1, 15000), (3, 1, 42, 2, 8000), (4, 2, 11, 1, 25000), (5, 2, 1, 2, 5000), (6, 2, 22, 1, 20000), (7, 2, 46, 1, 12000), (8, 2, 3, 1, 3000), (9, 2, 4, 1, 3000), (10, 3, 21, 1, 45000),
(11, 3, 23, 1, 50000), (12, 3, 41, 2, 3000), (13, 3, 1, 1, 5000), (14, 4, 12, 1, 30000), (15, 5, 16, 1, 26000), (16, 5, 24, 1, 28000), (17, 5, 42, 1, 8000), (18, 5, 1, 1, 5000), (19, 5, 31, 1, 2000), (20, 6, 47, 1, 18000),
(21, 6, 40, 1, 15000), (22, 6, 46, 1, 12000), (23, 7, 7, 1, 12000), (24, 7, 8, 1, 10000), (25, 7, 41, 1, 3000), (26, 8, 20, 2, 35000), (27, 8, 43, 1, 18000), (28, 8, 44, 1, 10000), (29, 8, 31, 1, 2000), (30, 9, 25, 1, 40000),
(31, 9, 13, 1, 32000), (32, 9, 42, 1, 8000), (33, 10, 19, 1, 22000), (34, 10, 30, 1, 13000), (35, 10, 49, 1, 12000), (36, 10, 1, 1, 5000), (37, 11, 2, 2, 15000), (38, 11, 6, 1, 18000), (39, 11, 3, 2, 3000), (40, 11, 4, 2, 3000),
(41, 11, 42, 1, 8000), (42, 12, 11, 1, 25000), (43, 13, 18, 2, 30000), (44, 13, 27, 2, 12000), (45, 13, 46, 1, 12000), (46, 14, 10, 2, 5000), (47, 14, 35, 2, 5000), (48, 14, 38, 4, 6000), (49, 15, 23, 3, 50000), (50, 16, 13, 2, 32000),
(51, 17, 10, 6, 5000), (52, 18, 5, 1, 8000), (53, 18, 9, 1, 7000), (54, 18, 26, 1, 15000), (55, 18, 41, 3, 3000), (56, 19, 32, 2, 10000), (57, 19, 33, 2, 12000), (58, 19, 39, 2, 7000), (59, 19, 40, 1, 15000), (60, 20, 14, 2, 28000),
(61, 21, 40, 2, 15000), (62, 21, 41, 2, 3000), (63, 21, 31, 2, 2000), (64, 22, 15, 1, 27000), (65, 22, 41, 1, 3000), (66, 23, 21, 2, 45000), (67, 24, 50, 1, 10000), (68, 25, 2, 4, 15000), (69, 26, 17, 1, 25000), (70, 26, 27, 1, 12000),
(71, 26, 42, 1, 8000), (72, 26, 1, 1, 5000), (73, 26, 31, 1, 2000), (74, 27, 16, 1, 26000), (75, 27, 48, 2, 20000), (76, 27, 50, 1, 10000), (77, 28, 47, 1, 18000), (78, 28, 43, 1, 18000), (79, 28, 31, 1, 2000), (80, 29, 23, 1, 50000), (81, 29, 21, 1, 45000),
(82, 29, 1, 3, 5000), (83, 30, 29, 2, 20000), (84, 31, 25, 2, 40000), (85, 32, 12, 2, 30000), (86, 33, 34, 3, 8000), (87, 33, 31, 3, 2000), (88, 34, 28, 1, 18000), (89, 34, 42, 1, 8000), (90, 35, 10, 2, 5000), (91, 35, 2, 1, 15000), (92, 35, 3, 2, 3000),
(93, 35, 4, 2, 3000), (94, 35, 42, 1, 8000), (95, 35, 41, 1, 3000), (96, 36, 7, 2, 12000), (97, 36, 8, 2, 10000), (98, 36, 46, 1, 12000), (99, 37, 20, 1, 35000), (100, 38, 36, 10, 7000), (101, 39, 37, 8, 5000), (102, 40, 21, 1, 45000), (103, 40, 23, 1, 50000),
(104, 40, 11, 1, 25000), (105, 40, 1, 2, 5000), (106, 41, 16, 1, 26000), (107, 41, 24, 1, 28000), (108, 41, 46, 2, 12000), (109, 42, 1, 5, 5000), (110, 42, 2, 1, 15000), (111, 42, 41, 1, 3000), (112, 42, 31, 1, 2000), (113, 43, 6, 1, 18000), (114, 43, 11, 1, 25000),
(115, 43, 42, 1, 8000), (116, 43, 41, 1, 3000), (117, 43, 31, 1, 2000), (118, 44, 15, 1, 27000), (119, 45, 18, 1, 30000), (120, 45, 13, 1, 32000), (121, 45, 43, 1, 18000), (122, 45, 41, 1, 3000), (123, 45, 31, 1, 2000), (124, 46, 20, 2, 35000), (125, 46, 25, 1, 40000),
(126, 46, 42, 1, 8000), (127, 46, 41, 1, 3000), (128, 47, 1, 10, 5000), (129, 47, 41, 2, 3000), (130, 47, 31, 2, 2000), (131, 48, 22, 2, 20000), (132, 49, 47, 1, 18000), (133, 49, 43, 1, 18000), (134, 49, 31, 1, 2000), (135, 50, 17, 2, 25000), (136, 50, 1, 2, 5000), (137, 50, 42, 2, 8000);

--
-- Bagian 3: PRIMARY KEY, INDEXES, AUTO_INCREMENT, dan FOREIGN KEYS
--
-- Indexes for table `contact_messages`


-- Indexes for table `menu_categories`
ALTER TABLE `menu_categories`
  ADD UNIQUE KEY `name` (`name`);

-- Indexes for table `menu_items`
ALTER TABLE `menu_items`
  ADD KEY `category_id` (`category_id`);

-- Indexes for table `orders`
ALTER TABLE `orders`
  ADD UNIQUE KEY `order_code` (`order_code`),
  ADD KEY `user_id` (`user_id`);

-- Indexes for table `order_items`
ALTER TABLE `order_items`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

-- Indexes for table `users`
ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`);

-- AUTO_INCREMENT for table `contact_messages`
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT for table `menu_categories`
ALTER TABLE `menu_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- AUTO_INCREMENT for table `menu_items`
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

-- AUTO_INCREMENT for table `orders`
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

-- AUTO_INCREMENT for table `order_items`
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

-- AUTO_INCREMENT for table `users`
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- Constraints for table `menu_items`
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `menu_categories` (`id`) ON DELETE CASCADE;

-- Constraints for table `orders`
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

-- Constraints for table `order_items`
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);


-- Mengaktifkan kembali cek Foreign Key dan mengakhiri transaksi
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;


SELECT * FROM menu_categories;

SELECT DATE_FORMAT(created_at, '%d %b') as day, SUM(total_amount) as sales 
         FROM orders 
         WHERE created_at >= CURDATE() - INTERVAL 7 DAY
         GROUP BY DATE(created_at)
         ORDER BY DATE(created_at) ASC;
         
         
         
         
ALTER TABLE `orders`
ADD COLUMN `payment_method` ENUM('transfer_bank', 'qris', 'cash') 
NOT NULL 
DEFAULT 'transfer_bank' 
AFTER `total_amount`;
         
SELECT * FROM orders;