CREATE DATABASE  IF NOT EXISTS "catering_uts_awp" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `catering_uts_awp`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: mysql-373ca7e1-adityazianurrahman-fab2.g.aivencloud.com    Database: catering_uts_awp
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('Baru','Sudah Dibaca','Selesai') COLLATE utf8mb4_general_ci DEFAULT 'Baru',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'RADITYA AGRA ANGGI NUGROHO','khrassya@gmail.com','Tambahin menunya dongg','Baru','2025-12-04 02:05:20');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_categories`
--

DROP TABLE IF EXISTS `menu_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_categories`
--

LOCK TABLES `menu_categories` WRITE;
/*!40000 ALTER TABLE `menu_categories` DISABLE KEYS */;
INSERT INTO `menu_categories` VALUES (1,'Makanan Utama','2025-10-17 14:56:17'),(2,'Makanan Nusantara','2025-10-17 14:56:17'),(3,'Makanan Kuah','2025-10-17 14:56:17'),(4,'Snack & Kue','2025-10-17 14:56:17'),(5,'Minuman','2025-10-17 14:56:17');
/*!40000 ALTER TABLE `menu_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `menu_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,1,'Nasi Putih','Nasi putih pulen',5000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242211/kateringku-menu/hqpkzsvlb9d2xojpstsh.jpg',1,1,'2025-10-20 18:30:00','2025-12-20 14:50:11'),(3,1,'Tempe Goreng','Tempe goreng tepung renyah',3000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242231/kateringku-menu/x1ytmw4b35biy4nihmok.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:50:32'),(4,1,'Tahu Goreng','Tahu susu goreng',3000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242258/kateringku-menu/yfxcqndxvr4txocmnlex.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:50:58'),(5,1,'Kentang Mustofa','Kering kentang pedas manis',8000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242267/kateringku-menu/fgguzueuferc0eu1uflz.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:51:08'),(6,1,'Ayam Semur','Ayam semur kecap manis',18000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242280/kateringku-menu/c87ou9wvklrcbll6qhzy.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:51:21'),(7,1,'Mie Telur','Mie goreng telur spesial',12000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242291/kateringku-menu/muvphaqp0mzirqyteifu.webp',1,0,'2025-10-20 18:30:00','2025-12-20 14:51:31'),(8,1,'Tumis Kangkung','Tumis kangkung bawang putih',10000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242301/kateringku-menu/dsztignlafmirqwvzlws.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:51:42'),(9,1,'Tahu Bakso','Tahu bakso kukus',7000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242311/kateringku-menu/lbw5dhkbcryugcxllcuw.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:51:52'),(10,1,'Perkedel','Perkedel kentang kornet',5000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242320/kateringku-menu/lxnvohumsbhlwduej0fd.webp',1,0,'2025-10-20 18:30:00','2025-12-20 14:52:01'),(11,2,'Rendang','Rendang daging sapi Padang',25000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1764813643/kateringku-menu/p0ifce9tdseepbuiieha.jpg',1,1,'2025-10-20 18:30:00','2025-12-04 02:00:44'),(12,2,'Soto Betawi','Soto Betawi santan susu',30000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242354/kateringku-menu/m4rzfp3ba4mjkx04ubka.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:52:35'),(13,2,'Rawon','Rawon daging sapi kluwek',32000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242368/kateringku-menu/hpn4yzlbfiztelejdkl7.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:52:49'),(14,2,'Nasi Liwet','Nasi liwet komplit ayam suwir',28000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242380/kateringku-menu/bccn1gbjxblgbp6dvnjn.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:53:01'),(15,2,'Gudeg','Gudeg nangka muda Jogja',27000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242391/kateringku-menu/iyckld1zpeaue6trnsr6.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:53:11'),(16,2,'Ayam Rica-Rica','Ayam bumbu rica-rica pedas',26000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242409/kateringku-menu/egfma41tu4kuv8hvonux.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:53:29'),(17,2,'Ayam Pop','Ayam pop khas Padang',25000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242424/kateringku-menu/xxclwewwca4grtarzr87.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:53:45'),(18,2,'Ayam Taliwang','Ayam bakar Taliwang Lombok',30000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242531/kateringku-menu/ecgavxycqwzmthlffde3.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:55:31'),(19,2,'Soto Kudus','Soto Kudus ayam suwir',22000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242463/kateringku-menu/lxusgtz6mippntq5bfqk.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:54:23'),(20,2,'Coto Makassar','Coto Makassar daging jeroan',35000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242550/kateringku-menu/svvhvr52k8ps30qxyv3f.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:55:51'),(21,3,'Sop Iga','Sop iga sapi empuk',45000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242575/kateringku-menu/tmdl6dadixt3rckgjq8l.jpg',1,1,'2025-10-20 18:30:00','2025-12-20 14:56:15'),(22,3,'Soto Ayam','Soto ayam bening segar',20000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242590/kateringku-menu/i79jib9uidejppr5kd8s.avif',1,0,'2025-10-20 18:30:00','2025-12-20 14:56:30'),(23,3,'Sop Buntut','Sop buntut klasik',50000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242604/kateringku-menu/uvxz2uvqnaul2mmwwcua.avif',1,0,'2025-10-20 18:30:00','2025-12-20 14:56:45'),(24,3,'Opor Ayam','Opor ayam bumbu kuning',28000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242618/kateringku-menu/urnkp5msgxyit5o3qw5l.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:56:58'),(25,3,'Gulai Kambing','Gulai daging kambing',40000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242630/kateringku-menu/gky5kwc13vm9v5swbdaf.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:57:11'),(26,3,'Sayur Lodeh','Sayur lodeh santan gurih',15000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242655/kateringku-menu/q4dj5rvxknjgxrfmnmmu.avif',1,0,'2025-10-20 18:30:00','2025-12-20 14:57:35'),(27,3,'Soto Ceker','Soto Ceker Betawi',18000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242749/kateringku-menu/ndqqcgaftgx7xt8i4ifg.webp',1,0,'2025-10-20 18:30:00','2025-12-20 14:59:09'),(28,3,'Soto Ceker','Soto ceker ayam pedas',18000,'https://placehold.co/600x400/ECF0F1/black?text=Soto+Ceker',0,0,'2025-10-20 18:30:00','2025-12-20 14:59:35'),(29,3,'Sop Bakso','Sop bakso sapi sayuran',20000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242789/kateringku-menu/ssulg15yqhq3914mc5va.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 14:59:49'),(30,3,'Sayur Labu','Sayur labu siam santan',13000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242802/kateringku-menu/mu4dupf4w61ozq5thasa.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:00:03'),(31,4,'Gorengan','Aneka gorengan (bakwan, tempe)',2000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242830/kateringku-menu/od79jiqml1y3r6ukzsgn.jpg',1,1,'2025-10-20 18:30:00','2025-12-20 15:00:30'),(32,4,'Klepon','Klepon isi gula merah',10000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242844/kateringku-menu/addve3hctxn0tu2ri8jk.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:00:44'),(33,4,'Serabi','Serabi kuah kinca',12000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242855/kateringku-menu/kcofia4ycxwybibxdt4e.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:00:55'),(34,4,'Martabak Mini','Martabak manis mini aneka topping',8000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242869/kateringku-menu/i6pjozwc2f69abcsfetr.avif',1,0,'2025-10-20 18:30:00','2025-12-20 15:01:09'),(35,4,'Dadar Gulung','Dadar gulung isi kelapa',5000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242879/kateringku-menu/j5axl6hftcibxm3r45iu.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:01:20'),(36,4,'Sosis Solo','Sosis solo basah',7000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242890/kateringku-menu/b8q1qj6j8emksig6e1kx.avif',1,0,'2025-10-20 18:30:00','2025-12-20 15:01:31'),(37,4,'Combro & Misro','Combro pedas & Misro manis',5000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242907/kateringku-menu/eh4716twq1asxzthrz7y.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:01:48'),(38,4,'Lemper Ayam','Lemper isi ayam cincang',6000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242918/kateringku-menu/f7vmj8thcrafsc1kldui.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:01:58'),(39,4,'Kue Lapis Legit','Kue lapis legit',9000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242958/kateringku-menu/kiqns0y68kad0xmglbcz.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:02:38'),(40,4,'Brownies Coklat','Potongan brownies coklat panggang',15000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242968/kateringku-menu/ltk8xx73nxquhi8prhe0.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:02:49'),(41,5,'Air Putih','Air mineral kemasan',3000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766242987/kateringku-menu/aaipcasc2ifjm3hqjqzj.jpg',1,1,'2025-10-20 18:30:00','2025-12-20 15:03:08'),(42,5,'Es Teh Manis','Es teh manis segar',8000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243001/kateringku-menu/pwdy3jlgmfvvrhwj7b85.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:03:21'),(43,5,'Kopi Susu','Kopi susu gula aren',18000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243011/kateringku-menu/wsayyzqbyksv1peuhjcs.avif',1,0,'2025-10-20 18:30:00','2025-12-20 15:03:31'),(44,5,'Kopi Tubruk','Kopi hitam tubruk',10000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243023/kateringku-menu/qhhhh6cnguhp6zwrd25k.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:03:44'),(45,5,'Latte','Kopi dengan susu tanpa gula',15000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243067/kateringku-menu/y68feid1gebvzdai01xc.avif',1,0,'2025-10-20 18:30:00','2025-12-20 15:04:28'),(46,5,'Es Jeruk','Es jeruk peras murni',12000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243079/kateringku-menu/nczqwvyrd7mc4y5rb8ab.webp',1,0,'2025-10-20 18:30:00','2025-12-20 15:04:39'),(47,5,'Jus Alpukat','Jus alpukat kental',18000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243090/kateringku-menu/vhckkk7n6t5am4qa8rok.webp',1,0,'2025-10-20 18:30:00','2025-12-20 15:04:50'),(48,5,'Es Kopyor','Es kopyor sirup cocopandan',20000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243103/kateringku-menu/jnndmekyn5xngktkflta.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:05:03'),(49,5,'Susu Coklat','Susu coklat hangat/dingin',12000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243114/kateringku-menu/txcm2nyoa1kjjnhsnmrb.jpg',1,0,'2025-10-20 18:30:00','2025-12-20 15:05:15'),(50,5,'Susu Plain','Susu putih hangat/dingin',10000,'https://res.cloudinary.com/dgcjaspq7/image/upload/v1766243124/kateringku-menu/tuzmyevyf5zpapsc82i1.webp',1,0,'2025-10-20 18:30:00','2025-12-20 15:05:25');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,2,5000),(3,1,42,2,8000),(4,2,11,1,25000),(5,2,1,2,5000),(6,2,22,1,20000),(7,2,46,1,12000),(8,2,3,1,3000),(9,2,4,1,3000),(10,3,21,1,45000),(11,3,23,1,50000),(12,3,41,2,3000),(13,3,1,1,5000),(14,4,12,1,30000),(15,5,16,1,26000),(16,5,24,1,28000),(17,5,42,1,8000),(18,5,1,1,5000),(19,5,31,1,2000),(20,6,47,1,18000),(21,6,40,1,15000),(22,6,46,1,12000),(23,7,7,1,12000),(24,7,8,1,10000),(25,7,41,1,3000),(26,8,20,2,35000),(27,8,43,1,18000),(28,8,44,1,10000),(29,8,31,1,2000),(30,9,25,1,40000),(31,9,13,1,32000),(32,9,42,1,8000),(33,10,19,1,22000),(34,10,30,1,13000),(35,10,49,1,12000),(36,10,1,1,5000),(38,11,6,1,18000),(39,11,3,2,3000),(40,11,4,2,3000),(41,11,42,1,8000),(42,12,11,1,25000),(43,13,18,2,30000),(44,13,27,2,12000),(45,13,46,1,12000),(46,14,10,2,5000),(47,14,35,2,5000),(48,14,38,4,6000),(49,15,23,3,50000),(50,16,13,2,32000),(51,17,10,6,5000),(52,18,5,1,8000),(53,18,9,1,7000),(54,18,26,1,15000),(55,18,41,3,3000),(56,19,32,2,10000),(57,19,33,2,12000),(58,19,39,2,7000),(59,19,40,1,15000),(60,20,14,2,28000),(61,21,40,2,15000),(62,21,41,2,3000),(63,21,31,2,2000),(64,22,15,1,27000),(65,22,41,1,3000),(66,23,21,2,45000),(67,24,50,1,10000),(69,26,17,1,25000),(70,26,27,1,12000),(71,26,42,1,8000),(72,26,1,1,5000),(73,26,31,1,2000),(74,27,16,1,26000),(75,27,48,2,20000),(76,27,50,1,10000),(77,28,47,1,18000),(78,28,43,1,18000),(79,28,31,1,2000),(80,29,23,1,50000),(81,29,21,1,45000),(82,29,1,3,5000),(83,30,29,2,20000),(84,31,25,2,40000),(85,32,12,2,30000),(86,33,34,3,8000),(87,33,31,3,2000),(88,34,28,1,18000),(89,34,42,1,8000),(90,35,10,2,5000),(92,35,3,2,3000),(93,35,4,2,3000),(94,35,42,1,8000),(95,35,41,1,3000),(96,36,7,2,12000),(97,36,8,2,10000),(98,36,46,1,12000),(99,37,20,1,35000),(100,38,36,10,7000),(101,39,37,8,5000),(102,40,21,1,45000),(103,40,23,1,50000),(104,40,11,1,25000),(105,40,1,2,5000),(106,41,16,1,26000),(107,41,24,1,28000),(108,41,46,2,12000),(109,42,1,5,5000),(111,42,41,1,3000),(112,42,31,1,2000),(113,43,6,1,18000),(114,43,11,1,25000),(115,43,42,1,8000),(116,43,41,1,3000),(117,43,31,1,2000),(118,44,15,1,27000),(119,45,18,1,30000),(120,45,13,1,32000),(121,45,43,1,18000),(122,45,41,1,3000),(123,45,31,1,2000),(124,46,20,2,35000),(125,46,25,1,40000),(126,46,42,1,8000),(127,46,41,1,3000),(128,47,1,10,5000),(129,47,41,2,3000),(130,47,31,2,2000),(131,48,22,2,20000),(132,49,47,1,18000),(133,49,43,1,18000),(134,49,31,1,2000),(135,50,17,2,25000),(136,50,1,2,5000),(137,50,42,2,8000),(140,52,7,1,12000),(142,53,3,1,3000),(143,54,1,1,5000),(145,55,1,1,5000),(147,56,11,1,25000),(150,58,1,1,5000),(151,58,11,1,25000),(152,58,4,1,3000),(153,59,3,1,3000),(154,59,4,1,3000),(157,61,50,1,10000),(160,63,1,1,5000),(161,63,6,1,18000),(162,64,4,1,3000),(163,64,5,1,8000),(164,64,8,1,10000),(165,65,1,1,5000),(166,65,6,1,18000),(167,65,7,1,12000),(168,65,8,1,10000);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  `customer_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `customer_phone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `customer_address` text COLLATE utf8mb4_general_ci NOT NULL,
  `total_amount` int NOT NULL,
  `payment_method` enum('transfer_bank','qris','cash') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'transfer_bank',
  `status` enum('Pesanan Diterima','Sedang Dimasak','Dalam Pengantaran','Selesai','Dibatalkan') COLLATE utf8mb4_general_ci DEFAULT 'Pesanan Diterima',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_code` (`order_code`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'KTG-20250115-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',43000,'transfer_bank','Selesai','2025-01-15 03:00:00','2025-01-15 05:30:00'),(2,'KTG-20250120-001',4,'ini cuma tes','081291919191','di umn aja sih bro',71000,'transfer_bank','Selesai','2025-01-20 04:30:00','2025-01-20 06:00:00'),(3,'KTG-20250205-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',105000,'transfer_bank','Selesai','2025-02-05 02:15:00','2025-02-05 04:00:00'),(4,'KTG-20250210-001',2,'Pelanggan Tamu','081111111111','Kantor ABC, Jl. Sudirman',30000,'transfer_bank','Selesai','2025-02-10 07:00:00','2025-02-10 08:30:00'),(5,'KTG-20250301-001',4,'ini cuma tes','081291919191','di umn aja sih bro',68000,'transfer_bank','Selesai','2025-03-01 10:00:00','2025-03-01 11:30:00'),(6,'KTG-20250315-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',45000,'transfer_bank','Selesai','2025-03-15 03:30:00','2025-03-15 05:00:00'),(7,'KTG-20250320-001',4,'Siti','082222222222','Apartemen Mentari, Tower B',23000,'transfer_bank','Selesai','2025-03-20 12:00:00','2025-03-20 13:00:00'),(8,'KTG-20250402-001',4,'ini cuma tes','081291919191','di umn aja sih bro',100000,'transfer_bank','Selesai','2025-04-02 05:00:00','2025-04-02 06:00:00'),(9,'KTG-20250410-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',80000,'transfer_bank','Selesai','2025-04-10 04:00:00','2025-04-10 05:30:00'),(10,'KTG-20250425-001',2,'Andi','083333333333','Perumahan Cendana, Blok A1',52000,'transfer_bank','Selesai','2025-04-25 11:30:00','2025-04-25 12:30:00'),(11,'KTG-20250505-001',4,'ini cuma tes','081291919191','di umn aja sih bro',62000,'transfer_bank','Selesai','2025-05-05 03:00:00','2025-05-05 04:30:00'),(12,'KTG-20250515-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',25000,'transfer_bank','Selesai','2025-05-15 06:00:00','2025-05-15 07:00:00'),(13,'KTG-20250528-001',4,'ini cuma tes','081291919191','di umn aja sih bro',96000,'transfer_bank','Selesai','2025-05-28 08:00:00','2025-05-28 09:30:00'),(14,'KTG-20250601-001',4,'Rina','084444444444','Jl. Melati No. 10',44000,'transfer_bank','Selesai','2025-06-01 04:30:00','2025-06-01 05:30:00'),(15,'KTG-20250610-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',150000,'transfer_bank','Selesai','2025-06-10 12:00:00','2025-06-10 13:30:00'),(16,'KTG-20250620-001',4,'ini cuma tes','081291919191','di umn aja sih bro',64000,'transfer_bank','Selesai','2025-06-20 03:00:00','2025-06-20 04:00:00'),(17,'KTG-20250630-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',30000,'transfer_bank','Selesai','2025-06-30 07:30:00','2025-06-30 08:30:00'),(18,'KTG-20250705-001',2,'Deni','085555555555','Kost Mawar, Kamar 12',39000,'transfer_bank','Selesai','2025-07-05 05:00:00','2025-07-05 06:00:00'),(19,'KTG-20250715-001',4,'ini cuma tes','081291919191','di umn aja sih bro',70000,'transfer_bank','Selesai','2025-07-15 09:00:00','2025-07-15 10:00:00'),(20,'KTG-20250725-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',56000,'transfer_bank','Selesai','2025-07-25 04:00:00','2025-07-25 05:00:00'),(21,'KTG-20250801-001',4,'ini cuma tes','081291919191','di umn aja sih bro',40000,'transfer_bank','Selesai','2025-08-01 06:00:00','2025-08-01 07:00:00'),(22,'KTG-20250810-001',4,'Eka','086666666666','Toko Buku Gramedia',28000,'transfer_bank','Selesai','2025-08-10 08:30:00','2025-08-10 09:30:00'),(23,'KTG-20250817-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',90000,'transfer_bank','Selesai','2025-08-17 03:00:00','2025-08-17 04:30:00'),(24,'KTG-20250825-001',4,'ini cuma tes','081291919191','di umn aja sih bro',10000,'transfer_bank','Selesai','2025-08-25 12:00:00','2025-08-25 13:00:00'),(25,'KTG-20250901-001',2,'Fajar','087777777777','Jl. Kenanga No. 8',60000,'transfer_bank','Selesai','2025-09-01 04:00:00','2025-09-01 05:00:00'),(26,'KTG-20250905-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',52000,'transfer_bank','Selesai','2025-09-05 07:00:00','2025-09-05 08:00:00'),(27,'KTG-20250910-001',4,'ini cuma tes','081291919191','di umn aja sih bro',76000,'transfer_bank','Selesai','2025-09-10 11:00:00','2025-09-10 12:00:00'),(28,'KTG-20250915-001',4,'Gita','088888888888','Lobby Mall Summarecon',38000,'transfer_bank','Selesai','2025-09-15 05:30:00','2025-09-15 06:30:00'),(29,'KTG-20250920-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',110000,'transfer_bank','Selesai','2025-09-20 03:30:00','2025-09-20 05:00:00'),(30,'KTG-20250925-001',4,'ini cuma tes','081291919191','di umn aja sih bro',40000,'transfer_bank','Selesai','2025-09-25 09:30:00','2025-09-25 10:30:00'),(31,'KTG-20250928-001',2,'Hadi','089999999999','Jl. Pahlawan Seribu',80000,'transfer_bank','Selesai','2025-09-28 04:00:00','2025-09-28 05:00:00'),(32,'KTG-20250930-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',60000,'transfer_bank','Selesai','2025-09-30 06:00:00','2025-09-30 07:00:00'),(33,'KTG-20251001-001',4,'ini cuma tes','081291919191','di umn aja sih bro',30000,'transfer_bank','Selesai','2025-10-01 10:00:00','2025-10-01 11:00:00'),(34,'KTG-20251002-001',4,'Indah','081211112222','RS Bethsaida',26000,'transfer_bank','Selesai','2025-10-02 05:00:00','2025-10-02 06:00:00'),(35,'KTG-20251003-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',46000,'transfer_bank','Selesai','2025-10-03 03:00:00','2025-10-03 04:00:00'),(36,'KTG-20251004-001',4,'ini cuma tes','081291919191','di umn aja sih bro',56000,'transfer_bank','Selesai','2025-10-04 07:00:00','2025-10-04 08:00:00'),(37,'KTG-20251005-001',2,'Joko','081233334444','Universitas Pradita',35000,'transfer_bank','Selesai','2025-10-05 09:00:00','2025-10-05 10:00:00'),(38,'KTG-20251006-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',70000,'transfer_bank','Selesai','2025-10-06 04:30:00','2025-10-06 05:30:00'),(39,'KTG-20251007-001',4,'ini cuma tes','081291919191','di umn aja sih bro',40000,'transfer_bank','Selesai','2025-10-07 11:30:00','2025-10-07 12:30:00'),(40,'KTG-20251008-001',4,'Kiki','081255556666','Scientia Park',130000,'transfer_bank','Selesai','2025-10-08 06:00:00','2025-10-08 07:00:00'),(41,'KTG-20251010-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',78000,'transfer_bank','Sedang Dimasak','2025-10-10 02:00:00','2025-10-10 02:15:00'),(42,'KTG-20251011-001',4,'ini cuma tes','081291919191','di umn aja sih bro',45000,'transfer_bank','Sedang Dimasak','2025-10-11 04:00:00','2025-10-11 04:10:00'),(43,'KTG-20251012-001',2,'Lina','081277778888','Jl. BSD Raya Utama',55000,'transfer_bank','Sedang Dimasak','2025-10-12 07:00:00','2025-10-12 07:05:00'),(44,'KTG-20251013-001',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',27000,'transfer_bank','Sedang Dimasak','2025-10-13 03:30:00','2025-10-13 03:35:00'),(45,'KTG-20251015-001',4,'ini cuma tes','081291919191','di umn aja sih bro',84000,'transfer_bank','Sedang Dimasak','2025-10-15 10:00:00','2025-10-15 10:10:00'),(46,'KTG-20251018-001',4,'Mira','081299990000','ICE BSD, Hall 10',120000,'transfer_bank','Dalam Pengantaran','2025-10-18 04:00:00','2025-10-18 04:45:00'),(47,'KTG-20251018-002',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',60000,'transfer_bank','Dalam Pengantaran','2025-10-18 08:00:00','2025-10-18 08:30:00'),(48,'KTG-20251019-001',4,'ini cuma tes','081291919191','di umn aja sih bro',40000,'transfer_bank','Dalam Pengantaran','2025-10-19 03:00:00','2025-10-19 03:30:00'),(49,'KTG-20251019-002',2,'Nina','081311112222','QBig BSD',38000,'transfer_bank','Dalam Pengantaran','2025-10-19 07:30:00','2025-10-19 08:00:00'),(50,'KTG-20251019-003',2,'Pelanggan Budi','081234567890','Jl. UMN No. 1, Gading Serpong, Tangerang',76000,'transfer_bank','Dalam Pengantaran','2025-10-19 12:00:00','2025-10-19 12:30:00'),(51,'KTG-20251020-4283',NULL,'ini cuma tes','081291919191','adasadas',15000,'transfer_bank','Pesanan Diterima','2025-10-20 23:36:24','2025-10-20 23:36:24'),(52,'KTG-20251025-2836',NULL,'bbb','6',' b',57000,'transfer_bank','Pesanan Diterima','2025-10-25 17:28:22','2025-10-25 17:28:22'),(53,'KTG-20251204-4172',NULL,'ini cuma tes','081291919191','jgfdyjshfxcggliuutdryjfchv',18000,'transfer_bank','Pesanan Diterima','2025-12-04 01:21:44','2025-12-04 01:21:44'),(54,'KTG-20251204-6821',NULL,'whahh','4544','ahhah',20000,'transfer_bank','Pesanan Diterima','2025-12-04 01:50:06','2025-12-04 01:50:06'),(55,'KTG-20251204-4698',NULL,'Raditya','0319138819839','DAMEN',20000,'transfer_bank','Sedang Dimasak','2025-12-04 02:03:14','2025-12-20 14:11:51'),(56,'KTG-20251204-0673',NULL,'Raditya Agra','081319846253','Medang Lestari',25000,'transfer_bank','Pesanan Diterima','2025-12-04 02:16:50','2025-12-04 02:16:50'),(58,'KTG-20251220-2255',11,'gabriela','087881551290','disana',33000,'transfer_bank','Pesanan Diterima','2025-12-20 14:15:42','2025-12-20 14:15:42'),(59,'KTG-20251220-9695',5,'admin','66868','yrtcyffghjy',6000,'transfer_bank','Pesanan Diterima','2025-12-20 15:06:59','2025-12-20 15:06:59'),(61,'KTG-20251220-1505',13,'Rassya','089697583185','Bitung',10000,'transfer_bank','Pesanan Diterima','2025-12-20 16:48:51','2025-12-20 16:48:51'),(63,'KTG-20251221-3590',12,'graa','081319846253','medang lestari',23000,'transfer_bank','Sedang Dimasak','2025-12-21 07:53:03','2025-12-21 07:53:53'),(64,'KTG-20251221-8535',12,'graa','081319846253','medang lestari',21000,'transfer_bank','Selesai','2025-12-21 07:59:58','2025-12-21 08:01:13'),(65,'KTG-20251221-5805',11,'gabriela','087881551290','disana',45000,'qris','Pesanan Diterima','2025-12-21 15:11:35','2025-12-21 15:11:35');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('admin','customer') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Katering','admin@kateringku.com','$2b$10$abcdefghijklmnopqrstuv',NULL,'','admin','2025-10-17 14:56:17','2025-10-17 14:56:17'),(2,'Pelanggan Budi','budi@example.com','$2b$10$wxyzabcdefghijklmnop',NULL,'','customer','2025-10-17 14:56:17','2025-10-17 14:56:17'),(3,'Aditya Zianur','adityazianurrahman@gmail.com','$2b$10$d6Zgp/tlJvmHxkvkDvKsxeXx15M4IDzqrxJSjc5R8frTrvBD2gsJ.',NULL,'','admin','2025-10-19 09:34:12','2025-10-19 09:37:52'),(4,'ini cuma tes','tesdoang@gmail.com','$2b$10$UTddkmGhEIpoV8c53FlkBOUXdRGEEHMEJrOq6Ne.MOYcnPmGHTDva','081291919191','di umn aja sih bro','customer','2025-10-19 09:51:47','2025-10-19 10:32:59'),(5,'admin','admin@admin.com','$2b$10$/DvrNdtWciztfAjQdCRBOu9ow3bqqlh0MpLyJavK1ZtD8mreb.Xka',NULL,NULL,'admin','2025-10-19 10:12:31','2025-10-19 14:57:56'),(6,'Muhammad Rassya','khrassya@gmail.com','$2b$10$4PB6o8mUvS3TnipdM7m7u.HpE7uG6Lhd2lWnx.Xbz/1tL9PgSf3oe','089697583182','Pabuaran Residence Blok E1 no 18, Margasari, Karawaci, Tangerang','customer','2025-10-21 00:05:02','2025-10-21 00:05:02'),(7,'Aditya Zianur','adityazianur@gmail.com','$2b$10$wWIbdchH52Fo9OKuIdRxjuwqc40qMqW3DwQ8H.am7a/iH3iFndZ.e','081291010393','disanaa','customer','2025-10-21 00:13:57','2025-12-04 03:17:27'),(8,'vassel','vassel@gmail.com','$2b$10$c5YEbwW12NoHLyn4D9yefuT.FRLGMGLNovoRjOkuTznbD8DxnisnC','087868918900','Medang','customer','2025-12-04 01:59:40','2025-12-04 01:59:40'),(9,'vassel','goleyu@gmail.com','$2b$10$CltmoHRY6PqVxthKgsk36eA26BJ6wLFGnutJO13XUwZv5UQXYFpK.','0818222220','medang','customer','2025-12-04 02:00:20','2025-12-04 02:00:20'),(10,'Raditya Agra','radityaagra045@gmail.com','$2b$10$yecSzoRbPOh2WFigPY.ph.kZIgM.KP7X003nfWidz9lCOiBO8GCIu','081319846253','Medang Lestari','customer','2025-12-04 02:15:07','2025-12-04 02:15:07'),(11,'gabriela','gabrielazahrafani@gmail.com','$2b$10$DaBbzakG25RE4zxQ16Waq.SXzvlTMhtj7nqLczUSEaIteyZFkKjke','087881551290','disana','customer','2025-12-20 14:13:55','2025-12-20 14:13:55'),(12,'graa','agrarea@gmail.com','$2b$10$ULLYP5PNg8gLroTbG0Bl/uNx3z5F1lcRqQaVtyl24QoCFgU5i/zrS','081319846253','medang lestari','customer','2025-12-20 16:34:16','2025-12-20 16:34:16'),(13,'Rassya','trushdamnit@gmail.com','$2b$10$bmJVWk7sI3S6RNukRahBtONv8Aaud5/m5Wnl.N66F2uVRy1.EIcfW','089697583185','Bitung','customer','2025-12-20 16:48:15','2025-12-20 16:48:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-21 23:16:35
