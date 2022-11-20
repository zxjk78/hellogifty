-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: hello_gifty
-- ------------------------------------------------------
-- Server version	5.7.9-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `buyer_id` bigint(20) DEFAULT NULL,
  `trade_post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2q20pxb4lx2kdckrnv9griig3` (`buyer_id`),
  KEY `FKi8euwfam9mdrlyvgql6g5xa2j` (`trade_post_id`),
  CONSTRAINT `FK2q20pxb4lx2kdckrnv9griig3` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKi8euwfam9mdrlyvgql6g5xa2j` FOREIGN KEY (`trade_post_id`) REFERENCES `trade_post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,NULL,NULL,1,1),(2,'2022-11-10 04:07:34.736362','2022-11-10 04:07:34.736362',2,2);
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `score` float DEFAULT NULL,
  `evaluatee_id` bigint(20) DEFAULT NULL,
  `evaluator_id` bigint(20) DEFAULT NULL,
  `tradehistory_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK91n1mewlucbrgd7hgafgbsmc2` (`evaluatee_id`),
  KEY `FKtrqokyvat2d5ngqt70acp2edq` (`evaluator_id`),
  KEY `FK1ryw3y4377qsimngjcob85wuw` (`tradehistory_id`),
  CONSTRAINT `FK1ryw3y4377qsimngjcob85wuw` FOREIGN KEY (`tradehistory_id`) REFERENCES `trade_history` (`id`),
  CONSTRAINT `FK91n1mewlucbrgd7hgafgbsmc2` FOREIGN KEY (`evaluatee_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKtrqokyvat2d5ngqt70acp2edq` FOREIGN KEY (`evaluator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
INSERT INTO `evaluation` VALUES (1,'2022-11-10 04:31:48.874051','2022-11-10 04:31:48.874051',NULL,2,1,1),(2,'2022-11-10 06:23:48.076221','2022-11-10 06:23:48.076221',NULL,2,1,1);
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gifticon`
--

DROP TABLE IF EXISTS `gifticon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gifticon` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `img` varchar(300) DEFAULT NULL,
  `is_used` bit(1) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `category_id` smallint(6) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5s9x8vi3iucciebaxd95jiwjn` (`category_id`),
  KEY `FKp5c6mrbo13y8s3ug01s52br2r` (`user_id`),
  CONSTRAINT `FK5s9x8vi3iucciebaxd95jiwjn` FOREIGN KEY (`category_id`) REFERENCES `small_category` (`id`),
  CONSTRAINT `FKp5c6mrbo13y8s3ug01s52br2r` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gifticon`
--

LOCK TABLES `gifticon` WRITE;
/*!40000 ALTER TABLE `gifticon` DISABLE KEYS */;
INSERT INTO `gifticon` VALUES (1,NULL,'2022-11-10 04:29:52.435871','2020-02-02','string_20221109013529711.png','\0','string','나중에연결',1,2),(2,NULL,NULL,'2020-02-02','string_20221109013538045.png','\0','stri222ng','나중에연결',2,1),(3,'2022-11-16 06:54:20.421436','2022-11-16 06:54:20.421436','2022-03-05','string_20221116155420353.sdsd','\0','newfticon','나중에연결',2,1),(4,'2022-11-16 06:56:29.997198','2022-11-16 06:56:29.997198','2022-04-05','string_20221116155629985.sdsd','\0','newfticon2','나중에연결',7,1);
/*!40000 ALTER TABLE `gifticon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `large_category`
--

DROP TABLE IF EXISTS `large_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `large_category` (
  `id` smallint(6) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `large_category`
--

LOCK TABLES `large_category` WRITE;
/*!40000 ALTER TABLE `large_category` DISABLE KEYS */;
INSERT INTO `large_category` VALUES (0,'카페'),(1,'편의점'),(2,'베이커리'),(3,'아이스크림'),(4,'외식/프렌차이즈'),(5,'상품권');
/*!40000 ALTER TABLE `large_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refresh_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `token_key` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (1,NULL,'2022-11-17 05:10:45.238031','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Njk4NzE0NDV9.SLV2keqzIE0XAHXyiYcXyRPmXXWZ7t0orm7dXcB7wZA',1),(2,'2022-11-10 04:07:15.424691','2022-11-10 06:33:21.653273','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjkyNzE2MDF9.xtdzEELmxKiMSR1S5DUfHTjg_mlevRj8RBrEMeIBesA',2),(3,'2022-11-18 12:57:06.967160','2022-11-18 12:57:06.967160','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Njk5ODU4MjZ9.jIJ8RabclWdN1fNNId3MnmwhOK3RPaEtrkF2uH3ye4A',3);
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `reportee_id` bigint(20) DEFAULT NULL,
  `reporter_id` bigint(20) DEFAULT NULL,
  `tradepost_id` bigint(20) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK958o0o0ldmer94075t30rgdve` (`reportee_id`),
  KEY `FKndpjl61ubcm2tkf7ml1ynq13t` (`reporter_id`),
  KEY `FK6mprfr8qum57mel1kkx80hjqa` (`tradepost_id`),
  CONSTRAINT `FK6mprfr8qum57mel1kkx80hjqa` FOREIGN KEY (`tradepost_id`) REFERENCES `trade_post` (`id`),
  CONSTRAINT `FK958o0o0ldmer94075t30rgdve` FOREIGN KEY (`reportee_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKndpjl61ubcm2tkf7ml1ynq13t` FOREIGN KEY (`reporter_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `small_category`
--

DROP TABLE IF EXISTS `small_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `small_category` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `brand_img_name` varchar(255) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `large_category_id` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKapy1gk2hd6bx9vsc5eveqia64` (`large_category_id`),
  CONSTRAINT `FKapy1gk2hd6bx9vsc5eveqia64` FOREIGN KEY (`large_category_id`) REFERENCES `large_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `small_category`
--

LOCK TABLES `small_category` WRITE;
/*!40000 ALTER TABLE `small_category` DISABLE KEYS */;
INSERT INTO `small_category` VALUES (1,'STARBUCKS.png','스타벅스',0),(2,'TWOSOMEPLACE.png','투썸플레이스',0),(3,'CU.png','CU',1),(4,'GS25.png','GS25',1),(5,'PARISBAGUETTE.png','파리바게트',2),(6,'TOUSLESJOURS.png','뚜레쥬르',2),(7,'BASKINROBBINS.png','배스킨라빈스',3),(8,'SEOLBING.png','설빙',3),(9,'BHC.png','BHC',4),(10,'DOMINO.png','도미노피자',4),(11,'HAPPYCON.jpg','해피콘',5),(12,'CGV.png','CGV',5);
/*!40000 ALTER TABLE `small_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_history`
--

DROP TABLE IF EXISTS `trade_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `trade_date` date DEFAULT NULL,
  `buyer_id` bigint(20) DEFAULT NULL,
  `seller_id` bigint(20) DEFAULT NULL,
  `tradepost_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8smofm9rycgtfp1oehftagqsp` (`buyer_id`),
  KEY `FKm3am0isvvlhj3qb50e7sg2888` (`seller_id`),
  KEY `FKjaf3fesi5jfvrofilyqfq370b` (`tradepost_id`),
  CONSTRAINT `FK8smofm9rycgtfp1oehftagqsp` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKjaf3fesi5jfvrofilyqfq370b` FOREIGN KEY (`tradepost_id`) REFERENCES `trade_post` (`id`),
  CONSTRAINT `FKm3am0isvvlhj3qb50e7sg2888` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_history`
--

LOCK TABLES `trade_history` WRITE;
/*!40000 ALTER TABLE `trade_history` DISABLE KEYS */;
INSERT INTO `trade_history` VALUES (1,'2022-11-10 04:29:52.395644','2022-11-10 04:29:52.395644',NULL,2,1,2);
/*!40000 ALTER TABLE `trade_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_post`
--

DROP TABLE IF EXISTS `trade_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_post` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  `img` varchar(300) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `trade_state` varchar(255) DEFAULT NULL,
  `gifticon_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk5ncvup2qc7y7bpexkvn0gsxy` (`gifticon_id`),
  KEY `FKbbsoj791jofqymfm8h0gjfv25` (`user_id`),
  CONSTRAINT `FKbbsoj791jofqymfm8h0gjfv25` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKk5ncvup2qc7y7bpexkvn0gsxy` FOREIGN KEY (`gifticon_id`) REFERENCES `gifticon` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_post`
--

LOCK TABLES `trade_post` WRITE;
/*!40000 ALTER TABLE `trade_post` DISABLE KEYS */;
INSERT INTO `trade_post` VALUES (1,NULL,NULL,'string','crop_string_20221109013538045.png',1110,'striseeeeeeeeeng',NULL,2,1),(2,'2022-11-10 04:03:47.783943','2022-11-10 04:29:52.430873','string','crop_string_20221109013529711.png',10,'stri111ng','SOLDOUT',1,1);
/*!40000 ALTER TABLE `trade_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `mms_index` bigint(20) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_gj2fy3dcix7ph7k8684gka40c` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,'string',NULL,'{bcrypt}$2a$10$9g.tFaAR8tbaMb3egbJdOujuKNOYKNIfAfFZjJioudNJD3iIih/1u',NULL,NULL),(2,'2022-11-10 04:07:11.602943','2022-11-10 04:07:11.602943','string2','string','{bcrypt}$2a$10$O2ORaA2R7ku1yybDiDkQhOSrnUKrAFHgJrTde.xV6q2EUPbnoTurC',0,'string'),(3,'2022-11-18 12:57:02.903309','2022-11-18 12:57:02.903309','user1','user1','{bcrypt}$2a$10$JVmTiHwYb2CBnBPVgPwHIu2dBT1ZPsBPHzV6q2vKtfSbEen5bVmlu',0,'string');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_evaluation`
--

DROP TABLE IF EXISTS `user_evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_evaluation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `total_score` float DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKddqk330wp4neepekvjya1k4qu` (`user_id`),
  CONSTRAINT `FKddqk330wp4neepekvjya1k4qu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_evaluation`
--

LOCK TABLES `user_evaluation` WRITE;
/*!40000 ALTER TABLE `user_evaluation` DISABLE KEYS */;
INSERT INTO `user_evaluation` VALUES (1,'2022-11-10 04:07:11.621998','2022-11-10 06:23:48.119220',120,2),(2,NULL,NULL,100,1),(3,'2022-11-18 12:57:02.974249','2022-11-18 12:57:02.974249',100,3);
/*!40000 ALTER TABLE `user_evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FK55itppkw3i07do3h7qoclqd4k` (`user_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'ROLE_USER'),(2,'ROLE_USER'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 14:36:42
