-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220524.9aa859bdd3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 10:44 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baig_darbas`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `a_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `archived` int(11) NOT NULL DEFAULT 0,
  `likes` int(11) NOT NULL DEFAULT 0,
  `dislikes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`a_id`, `user_id`, `question_id`, `answer`, `archived`, `likes`, `dislikes`, `created_at`, `modified_at`) VALUES
(1, 5, 1, 'It\'s going slow. Very slow... so far xx', 1, 0, 0, '2022-08-01 17:49:49', '2022-08-02 10:36:30'),
(2, 2, 1, 'Sekasi neblogai, bet blogiau nei maniau. Bet ok', 1, 0, 0, '2022-08-01 17:53:40', '2022-08-02 11:35:21'),
(3, 3, 1, 'xxxxxxxxxxxxxxxxxx cccccccc', 1, 0, 0, '2022-08-01 17:55:53', '2022-08-01 17:59:44'),
(4, 5, 1, 'Answering the question no 1', 0, 0, 0, '2022-08-02 10:55:58', '2022-08-02 10:55:58'),
(5, 5, 2, 'ok xxxxxxxxxxxx', 1, 0, 0, '2022-08-02 11:29:53', '2022-08-02 11:40:58'),
(6, 5, 2, 'rrrrrrrrrrrrrrrrrrrrrrr', 1, 0, 0, '2022-08-02 11:30:02', '2022-08-02 11:40:58'),
(7, 5, 2, 'gggggggggggggggggggg', 0, 0, 0, '2022-08-02 11:43:38', '2022-08-02 11:43:38'),
(8, 5, 2, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhh', 0, 0, 0, '2022-08-02 11:43:42', '2022-08-02 11:43:42'),
(9, 5, 15, 'rrrrrrrrrrrrrrrrrrrrrrrrrr', 1, 0, 0, '2022-08-02 11:44:54', '2022-08-02 11:45:08'),
(10, 5, 15, 'gggggggggggggggggggggggggggggg', 1, 0, 0, '2022-08-02 11:44:58', '2022-08-02 11:45:08'),
(11, 5, 1, 'answering q no 1', 0, 0, 0, '2022-08-02 15:00:01', '2022-08-02 15:00:01'),
(12, 5, 1, 'answering again q no 1', 0, 0, 0, '2022-08-02 15:00:20', '2022-08-02 15:00:20'),
(13, 5, 4, 'Sekasi neblogai, bet galetu geriau.', 0, 0, 0, '2022-08-02 20:30:13', '2022-08-02 20:30:13'),
(14, 5, 4, 'vvvvvvvvvvvvvxxxxxxxxxxxx', 0, 0, 0, '2022-08-02 20:30:22', '2022-08-02 20:30:37'),
(15, 5, 4, 'vvvvvvvvvvvvvvvvv', 1, 0, 0, '2022-08-02 20:30:25', '2022-08-02 20:30:43'),
(16, 5, 17, 'debesuota us pragiedruliais', 1, 0, 0, '2022-08-02 20:31:46', '2022-08-02 20:33:44');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `q_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `archived` int(11) NOT NULL DEFAULT 0,
  `answers` int(11) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`q_id`, `user_id`, `question`, `archived`, `answers`, `created`, `modified`) VALUES
(1, 1, 'What\'s up?', 0, 0, '2022-07-29 14:51:05', '2022-07-29 14:56:06'),
(2, 2, 'How is your holiday?', 0, 0, '2022-07-29 14:51:05', '2022-07-29 14:56:06'),
(3, 3, 'What\'s for dinner?', 0, 0, '2022-07-29 14:51:05', '2022-07-29 14:56:06'),
(4, 4, 'Kaip sekasi?', 0, 0, '2022-07-29 19:00:02', '2022-07-29 19:00:02'),
(5, 4, 'How is it going with your course?', 0, 0, '2022-07-29 19:01:13', '2022-07-29 19:01:13'),
(6, 5, 'Ar veikia add question?', 0, 0, '2022-07-31 15:23:18', '2022-07-31 15:23:18'),
(7, 5, 'Ar veikia add question?', 1, 0, '2022-07-31 15:23:54', '2022-08-01 15:57:59'),
(8, 5, 'Ar veikia add question?', 1, 0, '2022-07-31 15:25:51', '2022-08-01 16:03:59'),
(9, 5, 'Ar veikia add question?', 1, 0, '2022-07-31 15:26:24', '2022-08-01 16:36:53'),
(10, 5, 'Ar veikia?', 1, 0, '2022-07-31 15:34:22', '2022-08-01 16:00:19'),
(11, 5, 'Ar veikia updatas is fronto dar vissssff gg bbb 7777777?', 1, 0, '2022-07-31 15:36:13', '2022-08-01 14:52:47'),
(12, 5, 'Ar veikia?', 1, 0, '2022-07-31 15:38:33', '2022-07-31 21:10:34'),
(13, 5, 'Ar veikia questions update 13?', 1, 0, '2022-07-31 15:44:10', '2022-08-01 11:59:07'),
(14, 5, 'Ar veikia questions update?', 1, 0, '2022-07-31 15:47:24', '2022-08-01 14:53:37'),
(15, 5, 'Tai kur buvot?', 1, 0, '2022-07-31 16:39:51', '2022-08-02 11:45:08'),
(16, 5, 'does it still work?', 0, 0, '2022-08-02 10:23:13', '2022-08-02 10:23:13'),
(17, 5, 'Kokie siandien bus orai?', 1, 0, '2022-08-02 20:31:12', '2022-08-02 20:33:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `archived` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `archived`) VALUES
(1, 'nitro2000', 'elizabeth@Marley.lt', '$2a$10$NkP1KH2GCmGegzdu9Arrv.v09x8tFXNw4o5dBVC0n3lSM/Ran1SA2', 0),
(2, 'knysliukas', 'john@dick.lt', '$2a$10$5eifeguhJN2sdQGh3E.0zutuw9hB5cyVONf5YCJKPzHBX2yQmk50K', 0),
(3, 'marta21', 'marta@bob.lt', '$2a$10$hkuUWDdNbDH0Yh2fm9LPMOHj225jYtvGm7tjSB9QgVrO4Asf3Ife2', 0),
(4, 'vinipuchas', 'mike@O\'Hara.lt', '$2a$10$ZciTcZoYTibAf4SFn9j9ZeHOkedVaCGWVimtyMFhVNc41dQcR19le', 0),
(5, 'james200', 'james@jojo.lt', '$2a$10$smYS5rcB7TkkW.sViWeDB.3hSVsE.uxD8la85sqTY4unjHB.sKUUe', 0),
(10, 'mykol', 'mykolas@ggg.lt', '$2a$10$gS8EhYRmbRRYRVW75OuVauk8aNZoIjtgmZ.4VDESxYK5CpQSmK0XK', 0),
(11, 'zenius', 'zenius@kk.lt', '$2a$10$TI.piDe9FY71WvfEbkzopuTCPav4fpy91lmd6fV19sV8WEQ781KR2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`q_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `q_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



