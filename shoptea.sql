-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 24, 2026 at 01:09 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoptea`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `receiver_name` varchar(100) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `details`, `phone`, `receiver_name`, `is_default`) VALUES
(1, 3, '456 Đường DEF', '0337629844', 'Công ty TNHH Bán Trà', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `created_at`) VALUES
(1, 3, '2026-03-20 09:00:13');

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `variant_id` (`variant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image_url`, `slug`, `description`, `created_at`) VALUES
(1, 'Trà Xanh', 'https://example.com/images/tra_xanh.jpg', 'tra-xanh', 'Trà xanh nguyên chất, thơm ngon và tốt cho sức khỏe', '2026-03-20 14:49:11'),
(2, 'Trà Ô Long', 'https://example.com/images/tra_olong.jpg', 'tra-olong', 'Trà Ô Long cao cấp, thơm nồng, hương vị đặc trưng', '2026-03-20 14:57:58');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_batch`
--

DROP TABLE IF EXISTS `inventory_batch`;
CREATE TABLE IF NOT EXISTS `inventory_batch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_id` int DEFAULT NULL,
  `batch_code` varchar(50) DEFAULT NULL,
  `stock_quantity` int DEFAULT '0',
  `expiry_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variant_id` (`variant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inventory_batch`
--

INSERT INTO `inventory_batch` (`id`, `variant_id`, `batch_code`, `stock_quantity`, `expiry_date`) VALUES
(1, 1, 'BATCH_100G_001', 50, '2026-12-31'),
(2, 2, 'BATCH_200G_001', 27, '2026-12-31'),
(3, 3, 'BATCH_200G_001', 30, '2026-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2026_03_20_041805_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `payment_method_id` int DEFAULT NULL,
  `total_amount` decimal(15,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `shipping_address_id` int DEFAULT NULL,
  `shipping_fee` decimal(15,2) DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_method_id` (`payment_method_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `payment_method_id`, `total_amount`, `status`, `shipping_address_id`, `shipping_fee`, `payment_status`, `created_at`) VALUES
(1, 3, 1, 220000.00, 'Processing', 1, 30000.00, 'Paid', '2026-03-20 10:55:53'),
(2, 3, 1, 125000.00, 'Processing', 1, 30000.00, 'Paid', '2026-03-21 06:34:19');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price_at_purchase` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `variant_id` (`variant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `variant_id`, `quantity`, `price_at_purchase`) VALUES
(1, 1, 2, 2, 95000.00),
(2, 2, 2, 1, 95000.00);

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `name`, `is_active`) VALUES
(1, 'Thanh toán khi nhận hàng (COD)', 1),
(2, 'Chuyển khoản ngân hàng', 1),
(3, 'Ví MoMo', 1),
(4, 'ZaloPay', 1),
(5, 'VNPay', 1),
(6, 'Thẻ tín dụng / ghi nợ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'ae6604346f58e9c1353d9412a9d79c1036f6e4fb3e1fde49fd6b2cf729064f8c', '[\"*\"]', NULL, NULL, '2026-03-19 22:36:29', '2026-03-19 22:36:29'),
(4, 'App\\Models\\User', 2, 'auth_token', '7eff09098c3e6723efdce60060cb162fb4be176a065c6d1f2ce1369b744d0822', '[\"*\"]', NULL, NULL, '2026-03-19 23:13:06', '2026-03-19 23:13:06'),
(5, 'App\\Models\\User', 3, 'auth_token', '5b80b6b3f1fa29838025eaea32417212412bc7c48312d000582a0fe8e2223f27', '[\"*\"]', NULL, NULL, '2026-03-19 23:16:22', '2026-03-19 23:16:22'),
(7, 'App\\Models\\User', 3, 'auth_token', '36a2240a48b3047c7984c09892b523d5742ca9bccbc8493fc04405003c15b9f2', '[\"*\"]', '2026-03-20 23:44:34', NULL, '2026-03-20 01:57:19', '2026-03-20 23:44:34'),
(8, 'App\\Models\\User', 3, 'auth_token', '573ab925c653c03e07661505ac2851711bfb8bfaa5c0a8f3a333f719a26afbd8', '[\"*\"]', NULL, NULL, '2026-03-20 03:51:36', '2026-03-20 03:51:36'),
(9, 'App\\Models\\User', 3, 'auth_token', '24f37808b777edbdc6401bf8a9ea7f98965c5a3e303601e4bba5dad43c5a8c87', '[\"*\"]', NULL, NULL, '2026-03-20 23:32:31', '2026-03-20 23:32:31');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `ingredients` text,
  `brewing_guide` text,
  `is_organic` tinyint(1) DEFAULT '0',
  `slug` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category_id`, `name`, `description`, `ingredients`, `brewing_guide`, `is_organic`, `slug`, `status`) VALUES
(1, 1, 'Trà Xanh Thượng Hạng', 'Trà xanh thượng hạng, hương vị tinh khiết, giàu chất chống oxy hóa', 'Lá trà xanh nguyên chất', 'Ngâm 2-3g trà trong 200ml nước sôi khoảng 3 phút', 1, 'tra-xanh-thuong-hang', 'active'),
(2, 2, 'Trà Ô Long Cao Cấp', 'Trà Ô Long cao cấp, hương thơm nồng, giàu chất chống oxy hóa', 'Lá trà Ô Long nguyên chất', 'Ngâm 2-3g trà trong 200ml nước sôi khoảng 3 phút', 1, 'tra-olong-cao-cap', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute`
--

DROP TABLE IF EXISTS `product_attribute`;
CREATE TABLE IF NOT EXISTS `product_attribute` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `attribute_name` varchar(50) DEFAULT NULL,
  `attribute_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_attribute`
--

INSERT INTO `product_attribute` (`id`, `product_id`, `attribute_name`, `attribute_value`) VALUES
(1, 1, 'Hương vị', 'Tươi mát, thanh nhẹ'),
(2, 1, 'Xuất xứ', 'Việt Nam'),
(3, 1, 'Loại trà', 'Trà xanh thượng hạng'),
(4, 1, 'Đóng gói', 'Hộp 200g'),
(5, 2, 'Hương vị', 'Nồng, thơm đậm'),
(6, 2, 'Xuất xứ', 'Đài Loan'),
(7, 2, 'Loại trà', 'Ô Long thượng hạng'),
(8, 2, 'Đóng gói', 'Hộp 200g');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE IF NOT EXISTS `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `url`) VALUES
(1, 1, 'https://example.com/images/tra_xanh_200g.jpg'),
(2, 2, 'https://example.com/images/tra_olong_200g.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_variant`
--

DROP TABLE IF EXISTS `product_variant`;
CREATE TABLE IF NOT EXISTS `product_variant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `option_name` varchar(20) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_variant`
--

INSERT INTO `product_variant` (`id`, `product_id`, `option_name`, `price`) VALUES
(1, 1, '200g', 120000.00),
(2, 2, '100g', 95000.00),
(3, 2, '200g', 180000.00);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `phone_number` varchar(15) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `full_name`, `email`, `role`, `phone_number`, `password_hash`, `created_at`) VALUES
(1, 'Nguyen Van A', 'nguyenvana@gmail.com', 'user', '0987654321', '$2y$12$E5o7ypE6Nh6uvK1Jmbr9Pua4UHbWv9IKWwMyqae.Ei7nkH6zKo5d6', '2026-03-20 05:36:29'),
(2, 'Nguyễn Trung Nguyên', 'nguyenvanabc@gmail.com', 'user', '0337629744', '$2y$12$T09QTQgnpo0t2d.NPNIIA.qZajcqcP2mvIrZTG.GPTyB0tn7xUIw6', '2026-03-20 06:13:06'),
(3, 'Nguyễn', 'nguyenvanabcd@gmail.com', 'user', '0337629784', '$2y$12$2dAtnjkyQgH9KAWq3cZIMugD6MVxXvw/H7kklSu/lUW8rFikkrvlO', '2026-03-20 06:16:22');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
