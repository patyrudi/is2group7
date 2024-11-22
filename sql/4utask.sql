-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 22-11-2024 a las 22:37:25
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
CREATE DATABASE IF NOT EXISTS `4utask` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `4utask`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_group_id_b120cbf9` (`group_id`),
  KEY `auth_group_permissions_permission_id_84c5c92e` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  KEY `auth_permission_content_type_id_2f476e4b` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add espacio de trabajo', 6, 'add_espaciodetrabajo'),
(22, 'Can change espacio de trabajo', 6, 'change_espaciodetrabajo'),
(23, 'Can delete espacio de trabajo', 6, 'delete_espaciodetrabajo'),
(24, 'Can view espacio de trabajo', 6, 'view_espaciodetrabajo'),
(25, 'Can add estado', 7, 'add_estado'),
(26, 'Can change estado', 7, 'change_estado'),
(27, 'Can delete estado', 7, 'delete_estado'),
(28, 'Can view estado', 7, 'view_estado'),
(29, 'Can add usuario', 8, 'add_usuario'),
(30, 'Can change usuario', 8, 'change_usuario'),
(31, 'Can delete usuario', 8, 'delete_usuario'),
(32, 'Can view usuario', 8, 'view_usuario'),
(33, 'Can add tablero', 9, 'add_tablero'),
(34, 'Can change tablero', 9, 'change_tablero'),
(35, 'Can delete tablero', 9, 'delete_tablero'),
(36, 'Can view tablero', 9, 'view_tablero'),
(37, 'Can add lista', 10, 'add_lista'),
(38, 'Can change lista', 10, 'change_lista'),
(39, 'Can delete lista', 10, 'delete_lista'),
(40, 'Can view lista', 10, 'view_lista'),
(41, 'Can add tarjeta', 11, 'add_tarjeta'),
(42, 'Can change tarjeta', 11, 'change_tarjeta'),
(43, 'Can delete tarjeta', 11, 'delete_tarjeta'),
(44, 'Can view tarjeta', 11, 'view_tarjeta'),
(45, 'Can add task', 12, 'add_task'),
(46, 'Can change task', 12, 'change_task'),
(47, 'Can delete task', 12, 'delete_task'),
(48, 'Can view task', 12, 'view_task'),
(49, 'Can add usuarios asignados', 13, 'add_usuariosasignados'),
(50, 'Can change usuarios asignados', 13, 'change_usuariosasignados'),
(51, 'Can delete usuarios asignados', 13, 'delete_usuariosasignados'),
(52, 'Can view usuarios asignados', 13, 'view_usuariosasignados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_spanish_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(2, 'auth', 'permission'),
(3, 'auth', 'group'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session'),
(6, 'forutask_api', 'espaciodetrabajo'),
(7, 'forutask_api', 'estado'),
(8, 'forutask_api', 'usuario'),
(9, 'forutask_api', 'tablero'),
(10, 'forutask_api', 'lista'),
(11, 'forutask_api', 'tarjeta'),
(12, 'forutask_api', 'task'),
(13, 'forutask_api', 'usuariosasignados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'forutask_api', '0001_initial', '2024-10-18 04:52:45.468702'),
(2, 'contenttypes', '0001_initial', '2024-10-18 04:52:45.503734'),
(3, 'admin', '0001_initial', '2024-10-18 04:52:45.651387'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-10-18 04:52:45.654898'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-10-18 04:52:45.658902'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-10-18 04:52:45.705944'),
(7, 'auth', '0001_initial', '2024-10-18 04:52:45.928664'),
(8, 'auth', '0002_alter_permission_name_max_length', '2024-10-18 04:52:45.955688'),
(9, 'auth', '0003_alter_user_email_max_length', '2024-10-18 04:52:45.958691'),
(10, 'auth', '0004_alter_user_username_opts', '2024-10-18 04:52:45.962696'),
(11, 'auth', '0005_alter_user_last_login_null', '2024-10-18 04:52:45.965697'),
(12, 'auth', '0006_require_contenttypes_0002', '2024-10-18 04:52:45.966699'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2024-10-18 04:52:45.971703'),
(14, 'auth', '0008_alter_user_username_max_length', '2024-10-18 04:52:45.975706'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2024-10-18 04:52:45.978709'),
(16, 'auth', '0010_alter_group_name_max_length', '2024-10-18 04:52:46.009738'),
(17, 'auth', '0011_update_proxy_permissions', '2024-10-18 04:52:46.015743'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2024-10-18 04:52:46.019747'),
(19, 'forutask_api', '0002_rename_contrasena_usuario_password', '2024-10-18 04:52:46.035761'),
(20, 'forutask_api', '0003_usuario_groups_usuario_is_active_usuario_is_staff_and_more', '2024-10-18 04:52:46.514736'),
(21, 'forutask_api', '0004_alter_usuario_username', '2024-10-18 04:52:46.519741'),
(22, 'forutask_api', '0005_remove_tarjeta_etiqueta_tarjeta_etiquetas_and_more', '2024-10-18 04:52:46.683890'),
(23, 'sessions', '0001_initial', '2024-10-18 04:52:46.715919'),
(24, 'forutask_api', '0006_alter_tarjeta_etiquetas', '2024-10-18 05:03:17.894462');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_espaciodetrabajo`
--

DROP TABLE IF EXISTS `forutask_api_espaciodetrabajo`;
CREATE TABLE IF NOT EXISTS `forutask_api_espaciodetrabajo` (
  `idEspacio` int NOT NULL AUTO_INCREMENT,
  `nombreEspacio` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estadoEspacio` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEspacio`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_espaciodetrabajo`
--

INSERT INTO `forutask_api_espaciodetrabajo` (`idEspacio`, `nombreEspacio`, `estadoEspacio`) VALUES
(1, 'hola', 0),
(2, 'proyecto', 1),
(3, 'proyecto1', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_estado`
--

DROP TABLE IF EXISTS `forutask_api_estado`;
CREATE TABLE IF NOT EXISTS `forutask_api_estado` (
  `idEstado` int NOT NULL AUTO_INCREMENT,
  `descripcionEstado` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_estado`
--

INSERT INTO `forutask_api_estado` (`idEstado`, `descripcionEstado`) VALUES
(1, 'Por hacer'),
(2, 'En proceso'),
(3, 'Terminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_lista`
--

DROP TABLE IF EXISTS `forutask_api_lista`;
CREATE TABLE IF NOT EXISTS `forutask_api_lista` (
  `idLista` int NOT NULL AUTO_INCREMENT,
  `nombreLista` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `maxWip` int NOT NULL,
  `idEstado_id` int NOT NULL,
  `idTablero_id` int NOT NULL,
  PRIMARY KEY (`idLista`),
  KEY `forutask_api_lista_idEstado_id_a9b4f5e0` (`idEstado_id`),
  KEY `forutask_api_lista_idTablero_id_feba2b24` (`idTablero_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_lista`
--

INSERT INTO `forutask_api_lista` (`idLista`, `nombreLista`, `maxWip`, `idEstado_id`, `idTablero_id`) VALUES
(8, 'xd', 2, 1, 1),
(5, 'Prueba1', 2, 1, 1),
(7, 'Prueba3', 5, 3, 1),
(20, 'Por hacer', 5, 1, 3),
(21, 'En Proceso', 5, 2, 3),
(19, 'Finalizado', 5, 3, 3),
(25, 'Por hacer', 5, 1, 4),
(31, 'lista1', 5, 1, 5),
(32, 'lista2', 5, 2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_tablero`
--

DROP TABLE IF EXISTS `forutask_api_tablero`;
CREATE TABLE IF NOT EXISTS `forutask_api_tablero` (
  `idTablero` int NOT NULL AUTO_INCREMENT,
  `nombreTablero` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `idEspacio_id` int NOT NULL,
  PRIMARY KEY (`idTablero`),
  KEY `forutask_api_tablero_idEspacio_id_83f1dee9` (`idEspacio_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_tablero`
--

INSERT INTO `forutask_api_tablero` (`idTablero`, `nombreTablero`, `idEspacio_id`) VALUES
(1, 'is2', 1),
(2, '2', 1),
(3, 'IS2 TABLERO', 2),
(4, 'IS2 PRUEBA', 2),
(5, 'is2 tablero', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_tarjeta`
--

DROP TABLE IF EXISTS `forutask_api_tarjeta`;
CREATE TABLE IF NOT EXISTS `forutask_api_tarjeta` (
  `idTarjeta` int NOT NULL AUTO_INCREMENT,
  `nombreActividad` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcionTarjeta` longtext COLLATE utf8mb4_spanish_ci,
  `fechaCreacion` date NOT NULL,
  `fechaVencimiento` date DEFAULT NULL,
  `idLista_id` int NOT NULL,
  `idUsuarioAsignado_id` int DEFAULT NULL,
  `etiquetas` json DEFAULT NULL,
  PRIMARY KEY (`idTarjeta`),
  KEY `forutask_api_tarjeta_idLista_id_9228cfca` (`idLista_id`),
  KEY `forutask_api_tarjeta_idUsuarioAsignado_id_e4f43b50` (`idUsuarioAsignado_id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_tarjeta`
--

INSERT INTO `forutask_api_tarjeta` (`idTarjeta`, `nombreActividad`, `descripcionTarjeta`, `fechaCreacion`, `fechaVencimiento`, `idLista_id`, `idUsuarioAsignado_id`, `etiquetas`) VALUES
(34, 'cv', NULL, '2024-11-21', NULL, 8, NULL, '[]'),
(28, 'sprint', NULL, '2024-11-01', '2024-11-26', 5, 1, '[]'),
(29, 'tarea1', NULL, '2024-11-01', NULL, 7, NULL, '[{\"color\": \"#0a5408\", \"nombreEtiqueta\": \"software\"}, {\"color\": \"#d31717\", \"nombreEtiqueta\": \"hola\"}]'),
(43, 'tarea3', NULL, '2024-11-22', NULL, 19, 2, '[{\"color\": \"#0e3d9a\", \"nombreEtiqueta\": \"fpuna\"}]'),
(42, 'tarea2', NULL, '2024-11-22', NULL, 20, 1, '[{\"color\": \"#d50707\", \"nombreEtiqueta\": \"importante\"}]'),
(41, 'tarea1', '', '2024-11-22', NULL, 20, 2, '[{\"color\": \"#271f98\", \"nombreEtiqueta\": \"fpuna\"}]'),
(24, 'tarjeta1', 'hacer tarea', '2024-10-20', '2024-10-31', 7, 2, '[{\"color\": \"#e60000\", \"nombreEtiqueta\": \"pendiente\"}]'),
(26, 'tarjeta3', NULL, '2024-10-20', '2024-11-27', 7, NULL, '[]'),
(30, 'tarea2', NULL, '2024-11-01', NULL, 7, 2, '[{\"color\": \"#000000\", \"nombreEtiqueta\": \"is2\"}]'),
(31, 'tarea3', NULL, '2024-11-01', NULL, 7, NULL, '[]'),
(32, 'tarea 4', NULL, '2024-11-01', '2024-11-27', 7, NULL, '[]'),
(33, 'hjghj', NULL, '2024-11-20', NULL, 5, NULL, '[]'),
(44, 'tarea4', NULL, '2024-11-22', '2024-11-08', 20, NULL, '[]'),
(45, 'tarea5', NULL, '2024-11-22', NULL, 19, NULL, '[]'),
(46, 'tarea1', NULL, '2024-11-22', '2024-11-28', 31, 2, '[{\"color\": \"#ba5a5a\", \"nombreEtiqueta\": \"is2\"}]'),
(47, 'tarea2', NULL, '2024-11-22', NULL, 31, NULL, '[]'),
(48, 'tarea3', NULL, '2024-11-22', '2024-11-13', 32, NULL, '[]'),
(49, 'tarea4', NULL, '2024-11-22', NULL, 31, NULL, '[]'),
(50, 'tarea5', NULL, '2024-11-22', NULL, 31, NULL, '[]'),
(51, 'tarea6', NULL, '2024-11-22', NULL, 31, NULL, '[]'),
(52, 'tarea7', NULL, '2024-11-22', NULL, 31, NULL, '[]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_task`
--

DROP TABLE IF EXISTS `forutask_api_task`;
CREATE TABLE IF NOT EXISTS `forutask_api_task` (
  `idTask` int NOT NULL AUTO_INCREMENT,
  `descripcionTask` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  `estadoTask` tinyint(1) NOT NULL,
  `vencimientoTask` date NOT NULL,
  `idTarjeta_id` int NOT NULL,
  PRIMARY KEY (`idTask`),
  KEY `forutask_api_task_idTarjeta_id_d4e7912d` (`idTarjeta_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_usuario`
--

DROP TABLE IF EXISTS `forutask_api_usuario`;
CREATE TABLE IF NOT EXISTS `forutask_api_usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidoUsuario` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correoUsuario` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(140) COLLATE utf8mb4_spanish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `username` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_usuario`
--

INSERT INTO `forutask_api_usuario` (`idUsuario`, `nombreUsuario`, `apellidoUsuario`, `correoUsuario`, `password`, `is_active`, `is_staff`, `is_superuser`, `last_login`, `username`) VALUES
(1, 'rudi', 'rz', 'patyrudica@idk.com', 'pbkdf2_sha256$870000$9ag2kSDYlsNdRdghSe7B0F$USGtKjlPNrl7+s71R8CNZZmuNnpZCH+BThapMiXTfCE=', 1, 0, 0, '2024-11-22 22:18:38.034310', 'rudi'),
(2, 'Grupo7', 'Is2', 'grupo7@gmail.com', 'pbkdf2_sha256$870000$ku7To6enutOvgqfeK5mF1B$mgRT4qXfRjAPIphsk24QqyIosEUHRtnHPy7m+jsxAB4=', 1, 0, 0, NULL, 'grupo7'),
(3, 'fabian', 'montiel', 'fabian@gmail.com', 'pbkdf2_sha256$870000$bQy6xm8ifefLyu3995ii3C$S3K93u/b4FmjDzqX04R6PFbpOmwnNVk5Uu7Z8syvQHw=', 1, 0, 0, '2024-11-22 22:13:11.289860', 'fabian10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_usuariosasignados`
--

DROP TABLE IF EXISTS `forutask_api_usuariosasignados`;
CREATE TABLE IF NOT EXISTS `forutask_api_usuariosasignados` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipoUsuario` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechaAsignacion` date NOT NULL,
  `idEspacio_id` int NOT NULL,
  `idUser_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `forutask_api_usuariosasignados_idEspacio_id_c8ed8e80` (`idEspacio_id`),
  KEY `forutask_api_usuariosasignados_idUser_id_957ba965` (`idUser_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `forutask_api_usuariosasignados`
--

INSERT INTO `forutask_api_usuariosasignados` (`id`, `tipoUsuario`, `fechaAsignacion`, `idEspacio_id`, `idUser_id`) VALUES
(1, 'Owner', '2024-10-18', 1, 1),
(2, 'Invitado', '2024-10-18', 1, 2),
(3, 'Owner', '2024-11-20', 2, 1),
(4, 'Invitado', '2024-11-22', 2, 2),
(5, 'Owner', '2024-11-22', 3, 3),
(6, 'Invitado', '2024-11-22', 3, 1),
(7, 'Invitado', '2024-11-22', 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_usuario_groups`
--

DROP TABLE IF EXISTS `forutask_api_usuario_groups`;
CREATE TABLE IF NOT EXISTS `forutask_api_usuario_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forutask_api_usuario_groups_usuario_id_group_id_ccd37efb_uniq` (`usuario_id`,`group_id`),
  KEY `forutask_api_usuario_groups_usuario_id_b556e1fb` (`usuario_id`),
  KEY `forutask_api_usuario_groups_group_id_e01947d0` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forutask_api_usuario_user_permissions`
--

DROP TABLE IF EXISTS `forutask_api_usuario_user_permissions`;
CREATE TABLE IF NOT EXISTS `forutask_api_usuario_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forutask_api_usuario_use_usuario_id_permission_id_b2cf84be_uniq` (`usuario_id`,`permission_id`),
  KEY `forutask_api_usuario_user_permissions_usuario_id_b5efeb21` (`usuario_id`),
  KEY `forutask_api_usuario_user_permissions_permission_id_1fb913ed` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
