-- MySQL dump 10.16  Distrib 10.1.19-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.1.19-MariaDB

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
-- Table structure for table `Tb_Acabamento`
--

DROP TABLE IF EXISTS `Tb_Acabamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Acabamento` (
  `nome` varchar(50) DEFAULT NULL,
  `disponivel` tinyint(1) DEFAULT NULL,
  `imagem` varchar(100) DEFAULT NULL,
  `idTipoAcabamento` int(11) DEFAULT NULL,
  `IdAcabamento` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IdAcabamento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Acabamento`
--

LOCK TABLES `Tb_Acabamento` WRITE;
/*!40000 ALTER TABLE `Tb_Acabamento` DISABLE KEYS */;
INSERT INTO `Tb_Acabamento` VALUES ('A',1,'dfbd3d3827d41c9547d9531bcfc51ef1',1,1),('Asd',1,'37359be6a8edd40e4b55b4506a832a3b',2,2);
/*!40000 ALTER TABLE `Tb_Acabamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Ambience`
--

DROP TABLE IF EXISTS `Tb_Ambience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Ambience` (
  `IdAmbience` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(300) DEFAULT NULL,
  `mainImage` varchar(150) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IdAmbience`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Ambience`
--

LOCK TABLES `Tb_Ambience` WRITE;
/*!40000 ALTER TABLE `Tb_Ambience` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tb_Ambience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Category`
--

DROP TABLE IF EXISTS `Tb_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Category` (
  `IdCategory` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Category`
--

LOCK TABLES `Tb_Category` WRITE;
/*!40000 ALTER TABLE `Tb_Category` DISABLE KEYS */;
INSERT INTO `Tb_Category` VALUES (1,'Aluminio','ADS'),(2,'Fibra','fb');
/*!40000 ALTER TABLE `Tb_Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Image`
--

DROP TABLE IF EXISTS `Tb_Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Image` (
  `IdImage` int(11) NOT NULL AUTO_INCREMENT,
  `IdProduct` int(11) NOT NULL,
  `path` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`IdImage`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Image`
--

LOCK TABLES `Tb_Image` WRITE;
/*!40000 ALTER TABLE `Tb_Image` DISABLE KEYS */;
INSERT INTO `Tb_Image` VALUES (1,0,'af8cb47e303f6906dde205b9578e4a7a'),(3,1,'61bf8fc628dc4d1f5a54715dbfa4703b');
/*!40000 ALTER TABLE `Tb_Image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Product`
--

DROP TABLE IF EXISTS `Tb_Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Product` (
  `IdProduct` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `mainImage` varchar(100) DEFAULT NULL,
  `destaque` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IdProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Product`
--

LOCK TABLES `Tb_Product` WRITE;
/*!40000 ALTER TABLE `Tb_Product` DISABLE KEYS */;
INSERT INTO `Tb_Product` VALUES (1,'Chaise','sfd',3000,'8cb9a3cdd0a71ff17a5266a3ce8dbb12',1),(2,'ASD','sdadsa',1200,'9189e6973e86cd868218d4b7c09a4945',0),(3,'asddsa','dsadsa',1233,'e12fdf8aa0d5c53f2f8136ec14d49d0f',0);
/*!40000 ALTER TABLE `Tb_Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Product_Category`
--

DROP TABLE IF EXISTS `Tb_Product_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Product_Category` (
  `IdCategory` int(11) NOT NULL,
  `IdProduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Product_Category`
--

LOCK TABLES `Tb_Product_Category` WRITE;
/*!40000 ALTER TABLE `Tb_Product_Category` DISABLE KEYS */;
INSERT INTO `Tb_Product_Category` VALUES (0,0),(1,2),(1,3),(2,1);
/*!40000 ALTER TABLE `Tb_Product_Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Sale`
--

DROP TABLE IF EXISTS `Tb_Sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Sale` (
  `IdSale` int(11) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `subdescription` varchar(300) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `link` varchar(150) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`IdSale`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Sale`
--

LOCK TABLES `Tb_Sale` WRITE;
/*!40000 ALTER TABLE `Tb_Sale` DISABLE KEYS */;
INSERT INTO `Tb_Sale` VALUES (0,'ASDASD','ASDASD','1233',1,'231321','1dd0dc30c414485bf1c3ca9aacf52aeb');
/*!40000 ALTER TABLE `Tb_Sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_Tipo_Acabamento`
--

DROP TABLE IF EXISTS `Tb_Tipo_Acabamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_Tipo_Acabamento` (
  `IdTipoAcabamento` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdTipoAcabamento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_Tipo_Acabamento`
--

LOCK TABLES `Tb_Tipo_Acabamento` WRITE;
/*!40000 ALTER TABLE `Tb_Tipo_Acabamento` DISABLE KEYS */;
INSERT INTO `Tb_Tipo_Acabamento` VALUES (1,'Fibra'),(2,'Tela');
/*!40000 ALTER TABLE `Tb_Tipo_Acabamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tb_User`
--

DROP TABLE IF EXISTS `Tb_User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tb_User` (
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tb_User`
--

LOCK TABLES `Tb_User` WRITE;
/*!40000 ALTER TABLE `Tb_User` DISABLE KEYS */;
INSERT INTO `Tb_User` VALUES ('admin','cthulhu1');
/*!40000 ALTER TABLE `Tb_User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-26 13:16:35
