-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: atcoffee
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `address` varchar(255) DEFAULT NULL,
  `amount` float NOT NULL,
  `discount` int NOT NULL,
  `point` int NOT NULL,
  `price` float NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `payment_id` bigint DEFAULT NULL,
  `promotion_id` bigint DEFAULT NULL,
  `reward_id` bigint DEFAULT NULL,
  `staff_id` bigint DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK85s80t91fj3va97wxjir26pg2` (`customer_id`),
  KEY `FKivsv2kk65fwd2wf855n0bjqvw` (`payment_id`),
  KEY `FKrbaci95xy5me5dtw25yvmpq9k` (`promotion_id`),
  KEY `FK5aqtrv6pki1dbj0ehugjbdhx6` (`reward_id`),
  KEY `FKs7qo7bcepagt9l0s4c8vo68r4` (`staff_id`),
  KEY `FKj414nnlhhlgjk7lo8f7braaft` (`store_id`),
  CONSTRAINT `FK5aqtrv6pki1dbj0ehugjbdhx6` FOREIGN KEY (`reward_id`) REFERENCES `reward` (`id`),
  CONSTRAINT `FK85s80t91fj3va97wxjir26pg2` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKivsv2kk65fwd2wf855n0bjqvw` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `FKj414nnlhhlgjk7lo8f7braaft` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `FKrbaci95xy5me5dtw25yvmpq9k` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  CONSTRAINT `FKs7qo7bcepagt9l0s4c8vo68r4` FOREIGN KEY (`staff_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,'BI63888152','staff','2021-12-07 19:52:07','staff','2021-12-07 19:54:51',1,'',61750,0,62,61750,'DELIVERING',1,1,NULL,NULL,3,1),(2,'BI63888156','staff','2021-12-07 19:52:43','staff','2021-12-07 19:54:49',1,'',100555,17745,101,118300,'COMPLETED',6,2,1,NULL,3,1),(3,'BI63888177','staff2','2021-12-07 19:56:11','staff2','2021-12-07 19:56:28',1,'',91757.5,16192,92,107950,'COMPLETED',5,1,1,NULL,4,2);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_detail`
--

DROP TABLE IF EXISTS `bill_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `amount` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount` int NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `bill_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeolgwyayei3o80bb7rj7t207q` (`bill_id`),
  KEY `FKe7fmo7042u349ftue4g4oeiuy` (`product_id`),
  CONSTRAINT `FKe7fmo7042u349ftue4g4oeiuy` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKeolgwyayei3o80bb7rj7t207q` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_detail`
--

LOCK TABLES `bill_detail` WRITE;
/*!40000 ALTER TABLE `bill_detail` DISABLE KEYS */;
INSERT INTO `bill_detail` VALUES (1,'BI63888152D1','staff','2021-12-07 19:52:08','staff','2021-12-07 19:52:08',1,47500,'',5,25000,2,'M',1,2),(2,'BI63888152D2','staff','2021-12-07 19:52:08','staff','2021-12-07 19:52:08',1,14250,'',5,15000,1,'S',1,1),(3,'BI63888156D1','staff','2021-12-07 19:52:43','staff','2021-12-07 19:52:43',1,22500,'',10,25000,1,'S',2,3),(4,'BI63888156D2','staff','2021-12-07 19:52:43','staff','2021-12-07 19:52:43',1,70300,'',5,37000,2,'L',2,6),(5,'BI63888156D3','staff','2021-12-07 19:52:43','staff','2021-12-07 19:52:43',1,25500,'',15,30000,1,'M',2,11),(6,'BI63888177D1','staff2','2021-12-07 19:56:11','staff2','2021-12-07 19:56:11',1,14250,'',5,15000,1,'S',3,1),(7,'BI63888177D2','staff2','2021-12-07 19:56:11','staff2','2021-12-07 19:56:11',1,23750,'',5,25000,1,'M',3,2),(8,'BI63888177D3','staff2','2021-12-07 19:56:11','staff2','2021-12-07 19:56:11',1,28800,'',10,32000,1,'L',3,3),(9,'BI63888177D4','staff2','2021-12-07 19:56:11','staff2','2021-12-07 19:56:11',1,25000,'',0,25000,1,'S',3,4),(10,'BI63888177D5','staff2','2021-12-07 19:56:11','staff2','2021-12-07 19:56:11',1,16150,'',5,17000,1,'S',3,9);
/*!40000 ALTER TABLE `bill_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9mocisyryuqas1xrlbl8872lb` (`customer_id`),
  KEY `FK3d704slv66tw6x5hmbm6p2x3u` (`product_id`),
  KEY `FKd1x6ip1voqx475p471usgde93` (`store_id`),
  CONSTRAINT `FK3d704slv66tw6x5hmbm6p2x3u` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK9mocisyryuqas1xrlbl8872lb` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKd1x6ip1voqx475p471usgde93` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'COFFEE','anonymousUser','2021-12-04 21:33:46','anonymousUser','2021-12-04 21:33:46',1,'C?? ph??'),(2,'MILKTEA','anonymousUser','2021-12-04 21:33:46','anonymousUser','2021-12-04 21:33:46',1,'Tr?? s???a'),(3,'JUICE','anonymousUser','2021-12-04 21:33:46','admin','2021-12-07 18:41:31',1,'N?????c ??p');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `category_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  KEY `FKssroqj2vyiaujfleklq1ifigj` (`product_id`),
  KEY `FKfr6rjc04htbtc3xas2b9xmq7r` (`category_id`),
  CONSTRAINT `FKfr6rjc04htbtc3xas2b9xmq7r` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKssroqj2vyiaujfleklq1ifigj` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
INSERT INTO `category_product` VALUES (1,1),(1,2),(1,3),(1,4),(1,9),(3,10),(3,11),(3,12),(3,13),(2,5),(2,6),(2,7),(2,8),(2,14);
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'CASH','anonymousUser','2021-12-04 21:33:47','anonymousUser','2021-12-04 21:33:47',1,'Ti???n m???t'),(2,'CREDIT_CARD','anonymousUser','2021-12-04 21:33:47','anonymousUser','2021-12-04 21:33:47',1,'Th??? t??n d???ng');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `discount` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'COFFEE_CUP','admin','2021-12-07 18:43:29','admin','2021-12-07 18:43:29',1,'C?? ph?? ch???t l?????ng ?????n t??? v??ng ?????t c?? ph?? ?????nh ch??p c???a Vi???t Nam. H????ng v??? m?? ly, ?????ng l??ng ng?????i u???ng.',5,'https://res.cloudinary.com/tranan2509/image/upload/v1638877407/asyj1jhq8cd5wq3d5ipc.png','C?? ph?? ??en'),(2,'MACHIATO','admin','2021-12-07 18:44:44','admin','2021-12-07 18:44:44',1,'H????ng v??? ?????m ????, c?? ph?? m?? ly',5,'https://res.cloudinary.com/tranan2509/image/upload/v1638877482/hm2ov2czpx7n3fy9iegn.png','Machiato'),(3,'LATTE','admin','2021-12-07 18:45:42','admin','2021-12-07 18:45:42',1,'Th??m ngon v?? m?? ly',10,'https://res.cloudinary.com/tranan2509/image/upload/v1638877541/apsgub3kqzlw5fqiccwk.png','Latte'),(4,'CAPUCHINO','admin','2021-12-07 18:46:39','admin','2021-12-07 18:46:39',1,'Th?????ng th???c c?? ph?? th??m n???c m??i v?? ng???t ng??o c???a s???a',0,'https://res.cloudinary.com/tranan2509/image/upload/v1638877598/ohrcdgnrgir4walr0f9k.png','Capuchino'),(5,'MT_MATCHA','admin','2021-12-07 18:48:38','admin','2021-12-07 18:48:38',1,'Tr?? s???a h??a quy???n v???i matcha t???o n??n h????ng v??? d???u nh??? v?? ph???n ph???t m??i matcha nh??? nh??ng',0,'https://res.cloudinary.com/tranan2509/image/upload/v1638877715/vobpq7flt3hyu0npq3us.png','Tr?? s???a Matcha'),(6,'MT_MINT','admin','2021-12-07 18:50:01','admin','2021-12-07 18:50:01',1,'B???c h?? the m??t h??a quy???n v???i v??? tr?? s???a gia truy???n ?????c ????o s??? l?? l???a ch???n ph?? h???p v??o nh???ng ng??y n??ng b???c',5,'https://res.cloudinary.com/tranan2509/image/upload/v1638877799/jjsek1o66g0i59brlsjr.png','Tr?? s???a b???c h??'),(7,'MT_BLACKTEA','admin','2021-12-07 18:51:04','admin','2021-12-07 18:51:04',1,'T??n ????? tr?? n??n d??ng th??? v?? kh??m ph?? v??? ?????t bi???t c???a n?? nh??',0,'https://res.cloudinary.com/tranan2509/image/upload/v1638877863/sxf4uky3jopziuz6d3ub.png','Tr?? ??en'),(8,'MT_PEACHTEA','admin','2021-12-07 18:52:13','admin','2021-12-07 18:52:13',1,'Tr?? ????o v???i mi???ng ????o th???t v?? tr?? n???u t??? nh???ng tr??i ????o th??m ngon ch??n m???ng',0,'https://res.cloudinary.com/tranan2509/image/upload/v1638877932/lprhr75mn0v4yujplufv.png','Tr?? ????o'),(9,'MILKCOFFEE','admin','2021-12-07 18:53:18','admin','2021-12-07 18:53:18',1,'C?? ph?? s???a th??m ngon n???c l??ng ng?????i',5,'https://res.cloudinary.com/tranan2509/image/upload/v1638877997/iljub5uij7dvpni1zykv.png','C?? ph?? s???a'),(10,'ORANGEJUICE','admin','2021-12-07 18:55:13','admin','2021-12-07 18:55:13',1,'Vitamin C cho ng??y d??i n??ng ?????ng',10,'https://res.cloudinary.com/tranan2509/image/upload/v1638878112/elxdilasee3u3leo3n9h.png','N?????c cam ??p'),(11,'APPLEJUICE','admin','2021-12-07 18:56:09','admin','2021-12-07 18:56:09',1,'N?????c t??o ??p t???t cho s???c kh???e',15,'https://res.cloudinary.com/tranan2509/image/upload/v1638878167/l1b1okxkc0vnnybmpbta.png','N?????c t??o ??p'),(12,'WATERMELON_JUICE','admin','2021-12-07 18:57:14','admin','2021-12-07 18:57:14',1,'D??a h???u t????i ngon',0,'https://res.cloudinary.com/tranan2509/image/upload/v1638878233/zpdupz0ia0nztrjsgjy0.png','N?????c ??p d??a h???u'),(13,'TOMATOJUICE','admin','2021-12-07 18:58:08','admin','2021-12-07 18:58:08',1,'C?? chua t????i b??? m???t',15,'https://res.cloudinary.com/tranan2509/image/upload/v1638878286/vhp2ppdyj8m6jbjn2qso.png','N?????c ??p c?? chua'),(14,'MT_SOCOLA','admin','2021-12-07 18:59:16','admin','2021-12-07 18:59:16',1,'Tr?? s???a socola gi???m stress',0,'https://res.cloudinary.com/tranan2509/image/upload/v1638878354/dw4wclw3fse1dm2gs5zq.png','Tr?? s???a socola');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `description` text,
  `discount` int NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `object` varchar(255) DEFAULT NULL,
  `proviso` int NOT NULL,
  `start_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,'KMTAKH','admin','2021-12-07 19:00:49','admin','2021-12-07 19:00:49',1,'Gi???m 15% cho ????n h??ng t??? 89K',15,'2022-03-01 07:00:00','','Khuy???n m??i tri ??n kh??ch h??ng','BRONZE',89000,'2021-12-01 07:00:00'),(2,'KMNX','admin','2021-12-07 19:02:06','admin','2021-12-07 19:02:06',1,'Gi???m 20% cho ????n h??ng t??? 89K d??nh cho h???i vi??n V??ng tr??? l??n',20,'2022-03-01 07:00:00','','Khuy???n m??i ng??y xu??n','GOLD',89000,'2021-12-01 07:00:00'),(3,'KMKQ','admin','2021-12-07 19:03:06','admin','2021-12-07 19:03:06',1,'Gi???m 25% cho ????n h??ng t??? 89K d??nh cho h???i vi??n B???ch Kim tr??? l',25,'2022-03-01 07:00:00','','Khuy???n m??i kh??ch quen','PLATINUM',89000,'2021-12-01 07:00:00');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `comment` text,
  `star` int NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrwqxo7w4ksxh4g3qgjdqdl4w5` (`product_id`),
  KEY `FKqa3bu60wco5ipgfi8rhmxr6aq` (`user_id`),
  CONSTRAINT `FKqa3bu60wco5ipgfi8rhmxr6aq` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKrwqxo7w4ksxh4g3qgjdqdl4w5` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward`
--

DROP TABLE IF EXISTS `reward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  `proviso` int NOT NULL,
  `redution` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward`
--

LOCK TABLES `reward` WRITE;
/*!40000 ALTER TABLE `reward` DISABLE KEYS */;
INSERT INTO `reward` VALUES (1,'R_01','admin','2021-12-07 19:03:42','admin','2021-12-07 19:03:42',1,'100 ??i???m gi???m 5K',100,5000),(2,'R_02','admin','2021-12-07 19:03:57','admin','2021-12-07 19:03:57',1,'200 ??i???m gi???m 11K',200,11000),(3,'R_03','admin','2021-12-07 19:04:17','admin','2021-12-07 19:04:17',1,'300 ??i???m gi???m 17K',300,17000),(4,'R_04','admin','2021-12-07 19:04:40','admin','2021-12-07 19:04:40',1,'400 ??i???m gi???m 25K',400,25000);
/*!40000 ALTER TABLE `reward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN','anonymousUser','2021-12-04 21:33:45','anonymousUser','2021-12-04 21:33:45',1,'ADMIN'),(2,'ROLE_STAFF','anonymousUser','2021-12-04 21:33:46','anonymousUser','2021-12-04 21:33:46',1,'STAFF'),(3,'ROLE_USER','anonymousUser','2021-12-04 21:33:46','anonymousUser','2021-12-04 21:33:46',1,'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `price` float NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj2c44yesw2o1kacfugn5oh6sg` (`product_id`),
  CONSTRAINT `FKj2c44yesw2o1kacfugn5oh6sg` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,NULL,'admin','2021-12-07 18:43:29','admin','2021-12-07 18:43:29',0,15000,'S',1),(2,NULL,'admin','2021-12-07 18:43:29','admin','2021-12-07 18:43:29',0,20000,'M',1),(3,NULL,'admin','2021-12-07 18:43:29','admin','2021-12-07 18:43:29',0,22000,'L',1),(4,NULL,'admin','2021-12-07 18:44:44','admin','2021-12-07 18:44:44',0,20000,'S',2),(5,NULL,'admin','2021-12-07 18:44:44','admin','2021-12-07 18:44:44',0,25000,'M',2),(6,NULL,'admin','2021-12-07 18:44:44','admin','2021-12-07 18:44:44',0,27000,'L',2),(7,NULL,'admin','2021-12-07 18:45:42','admin','2021-12-07 18:45:42',0,25000,'S',3),(8,NULL,'admin','2021-12-07 18:45:42','admin','2021-12-07 18:45:42',0,30000,'M',3),(9,NULL,'admin','2021-12-07 18:45:42','admin','2021-12-07 18:45:42',0,32000,'L',3),(10,NULL,'admin','2021-12-07 18:46:39','admin','2021-12-07 18:46:39',0,25000,'S',4),(11,NULL,'admin','2021-12-07 18:46:39','admin','2021-12-07 18:46:39',0,30000,'M',4),(12,NULL,'admin','2021-12-07 18:46:39','admin','2021-12-07 18:46:39',0,32000,'L',4),(13,NULL,'admin','2021-12-07 18:48:38','admin','2021-12-07 18:48:38',0,30000,'S',5),(14,NULL,'admin','2021-12-07 18:48:38','admin','2021-12-07 18:48:38',0,35000,'M',5),(15,NULL,'admin','2021-12-07 18:48:38','admin','2021-12-07 18:48:38',0,37000,'L',5),(16,NULL,'admin','2021-12-07 18:50:01','admin','2021-12-07 18:50:01',0,30000,'S',6),(17,NULL,'admin','2021-12-07 18:50:01','admin','2021-12-07 18:50:01',0,35000,'M',6),(18,NULL,'admin','2021-12-07 18:50:01','admin','2021-12-07 18:50:01',0,37000,'L',6),(19,NULL,'admin','2021-12-07 18:51:04','admin','2021-12-07 18:51:04',0,17000,'S',7),(20,NULL,'admin','2021-12-07 18:51:04','admin','2021-12-07 18:51:04',0,22000,'M',7),(21,NULL,'admin','2021-12-07 18:51:04','admin','2021-12-07 18:51:04',0,24000,'L',7),(22,NULL,'admin','2021-12-07 18:52:13','admin','2021-12-07 18:52:13',0,25000,'S',8),(23,NULL,'admin','2021-12-07 18:52:13','admin','2021-12-07 18:52:13',0,30000,'M',8),(24,NULL,'admin','2021-12-07 18:52:13','admin','2021-12-07 18:52:13',0,32000,'L',8),(25,NULL,'admin','2021-12-07 18:53:18','admin','2021-12-07 18:53:18',0,17000,'S',9),(26,NULL,'admin','2021-12-07 18:53:18','admin','2021-12-07 18:53:18',0,22000,'M',9),(27,NULL,'admin','2021-12-07 18:53:18','admin','2021-12-07 18:53:18',0,24000,'L',9),(28,NULL,'admin','2021-12-07 18:55:13','admin','2021-12-07 18:55:13',0,25000,'S',10),(29,NULL,'admin','2021-12-07 18:55:13','admin','2021-12-07 18:55:13',0,30000,'M',10),(30,NULL,'admin','2021-12-07 18:55:13','admin','2021-12-07 18:55:13',0,32000,'L',10),(31,NULL,'admin','2021-12-07 18:56:09','admin','2021-12-07 18:56:09',0,25000,'S',11),(32,NULL,'admin','2021-12-07 18:56:09','admin','2021-12-07 18:56:09',0,30000,'M',11),(33,NULL,'admin','2021-12-07 18:56:09','admin','2021-12-07 18:56:09',0,32000,'L',11),(34,NULL,'admin','2021-12-07 18:57:14','admin','2021-12-07 18:57:14',0,25000,'S',12),(35,NULL,'admin','2021-12-07 18:57:14','admin','2021-12-07 18:57:14',0,30000,'M',12),(36,NULL,'admin','2021-12-07 18:57:14','admin','2021-12-07 18:57:14',0,32000,'L',12),(37,NULL,'admin','2021-12-07 18:58:08','admin','2021-12-07 18:58:08',0,25000,'S',13),(38,NULL,'admin','2021-12-07 18:58:08','admin','2021-12-07 18:58:08',0,30000,'M',13),(39,NULL,'admin','2021-12-07 18:58:08','admin','2021-12-07 18:58:08',0,32000,'L',13),(40,NULL,'admin','2021-12-07 18:59:16','admin','2021-12-07 18:59:16',0,25000,'S',14),(41,NULL,'admin','2021-12-07 18:59:16','admin','2021-12-07 18:59:16',0,30000,'M',14),(42,NULL,'admin','2021-12-07 18:59:16','admin','2021-12-07 18:59:16',0,32000,'L',14);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time_close` varchar(255) DEFAULT NULL,
  `time_open` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'AT_THUDUC','anonymousUser','2021-12-04 21:33:45','anonymousUser','2021-12-04 21:33:45',1,'Th??? ?????c, HCM','A&T Coffee','23:00','8:00'),(2,'AT_DISTRICT2','anonymousUser','2021-12-04 21:33:45','anonymousUser','2021-12-04 21:33:45',1,'Qu???n 2, H??? Ch?? Minh','A&T Coffee','23:00','8:00');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_product`
--

DROP TABLE IF EXISTS `store_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_product` (
  `store_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  KEY `FKd91qk8cbmboomritdwn351tak` (`product_id`),
  KEY `FKdncsr7lgl9pdsq71314etuwrp` (`store_id`),
  CONSTRAINT `FKd91qk8cbmboomritdwn351tak` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKdncsr7lgl9pdsq71314etuwrp` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_product`
--

LOCK TABLES `store_product` WRITE;
/*!40000 ALTER TABLE `store_product` DISABLE KEYS */;
INSERT INTO `store_product` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,10),(2,11),(2,12),(2,13),(2,14);
/*!40000 ALTER TABLE `store_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  `point` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'BRONZE','anonymousUser','2021-12-04 21:33:45','anonymousUser','2021-12-04 21:33:45',1,'?????ng',10000),(2,'GOLD','anonymousUser','2021-12-04 21:33:45','anonymousUser','2021-12-04 21:33:45',1,'V??ng',50000),(3,'PLATINUM','anonymousUser','2021-12-04 21:33:45','anonymousUser','2021-12-04 21:33:45',1,'B???ch Kim',125000);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `accumulated_points` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `current_points` int NOT NULL,
  `dob` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `identity_card` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `role_id` bigint DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  `type_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_asr5dev2u6ub7h86bj1b5jp9m` (`identity_card`),
  UNIQUE KEY `UK_589idila9li6a4arw1t8ht1gx` (`phone`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  KEY `FK1k3x2kt9pxcmon8jhquv31qe4` (`store_id`),
  KEY `FK555mrysh748xyw2vtn5lbasw8` (`type_id`),
  CONSTRAINT `FK1k3x2kt9pxcmon8jhquv31qe4` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `FK555mrysh748xyw2vtn5lbasw8` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'VIRTUAL_USER','anonymousUser','2021-12-04 21:33:46','anonymousUser','2021-12-04 21:33:46',1,0,'Kh??ng c?? ?????a ch???',0,NULL,'virtualuser@gmail.com','Nam',NULL,'https://res.cloudinary.com/tranan2509/image/upload/v1637334237/male_d5nb3t.jpg','Virtual User','$2a$10$W/Twbzyjga53iqNpPJgsSuLbo3osqnUx90w7HV89CEyC8dLi65mui','0000000000','virtualuser',3,NULL,1),(2,'AN_TV','anonymousUser','2021-12-04 21:33:47','anonymousUser','2021-12-04 21:33:47',1,0,'9 Tr??nh Ho??i ?????c, Qu???n 9',0,'2021-12-04 21:33:46','tranan2509@gmail.com','Nam','215523098','https://res.cloudinary.com/tranan2509/image/upload/v1636107801/avatar_a9azml.png','Tr???n V??n ??n','$2a$10$rUc8Bib2Meu2hep2rhXxBeMfzvOayv9NhY2tfc6pVuJ3Lg4hHx07m','01692889894','admin',1,1,NULL),(3,'THU_NTM','anonymousUser','2021-12-04 21:33:47','anonymousUser','2021-12-04 21:33:47',1,0,'9 Tr??nh Ho??i ?????c, Qu???n 9',0,'2021-12-04 21:33:46','thuntm@gmail.com','N???','215533098','https://res.cloudinary.com/tranan2509/image/upload/v1638505322/otx0l3euew6butlst5br.jpg','Nguy???n Th??? Minh Th??','$2a$10$hhjObwqH1943kPQSavMk/eptd7zZtW2g3RBTuyjNfRc4uPzFCpJOG','01692889893','staff',2,1,NULL),(4,'YEN_NT','admin','2021-12-07 19:16:24','admin','2021-12-07 19:16:24',1,0,'52/12 Xa l??? H?? N???i, Linh Trung, Th??? ?????c',0,'2002-12-07 07:00:00','nguyenthiyen@gmail.com','N???','123456789','https://res.cloudinary.com/tranan2509/image/upload/v1638879383/thsrgtgvcdwll0pfxpuc.jpg','Nguy???n Th??? Y???n','$2a$10$wE4GuOt1hlippBC9RGRiQO6ilVxyWnZ0lQ1cBXnQomtySIQzwxnF.','0123456789','staff2',2,2,NULL),(5,'0234567891','admin','2021-12-07 19:18:42','staff2','2021-12-07 19:56:28',1,91,'20/12 Ho??ng Di???u 2, Linh Trung Th??? ?????c',91,'2004-03-13 07:00:00','nguyenvantri@gmail.com','Nam','234567891','https://res.cloudinary.com/tranan2509/image/upload/v1638879521/c5dblrhvi0yewfzs6blj.jpg','Nguy???n V??n Tr??','$2a$10$bBjU7F.AxC8jMI.T5n8VaunKNZNb/nFspRb6/LHcZDl68I8rQYCLa','0234567891','0234567891',3,NULL,1),(6,'0345678912','admin','2021-12-07 19:21:43','staff','2021-12-07 19:54:49',1,100,'12 V?? V??n Ng??n, Linh Trung , Th??? ?????c',100,'2003-04-12 07:00:00','lethihongtham@gmail.com','N???','345678912','https://res.cloudinary.com/tranan2509/image/upload/v1638879702/glctobmtbui8bune0kgy.jpg','L?? Th??? H???ng Th???m','$2a$10$MM6l5t8NLoyqHnsCRXigzeiOk4AS./vQ5hSC.nYRsK.KG434e3f.i','0345678912','0345678912',3,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-07 20:07:12
