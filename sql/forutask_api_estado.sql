-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 18-10-2024 a las 04:53:56
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `4utask`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_estado`
--

DROP TABLE IF EXISTS `forutask_api_estado`;
CREATE TABLE IF NOT EXISTS `forutask_api_estado` (
  `idEstado` int NOT NULL AUTO_INCREMENT,
  `descripcionEstado` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_estado`
--

INSERT INTO `forutask_api_estado` (`idEstado`, `descripcionEstado`) VALUES
(1, 'Por hacer'),
(2, 'En proceso'),
(3, 'Terminado');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
