-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2022 at 12:02 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationideas`
--
CREATE DATABASE IF NOT EXISTS `vacationideas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationideas`;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `userName` varchar(40) NOT NULL,
  `password` varchar(500) NOT NULL,
  `roleName` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `roleName`) VALUES
(46, 'Simple ', 'User', 'simpleUser', 'fde18e3e76123959525c9994e1bd4ed6b856820a8112ff659df1a9a50e2b1083143aa6deda23591557cee46bf1c54c37563f02a37272341ddc8c31c1686eec63', 'User'),
(47, 'super', 'admin', 'superAdmin', '2e5064cd88be32a226d9f3b63dcdf878179281a390f801ca6a6e4e6fd5e497029053370b8eee167833ee5a22e9a9151ba4d4faa61b55eb25f2bbde18584e7f94', 'Admin'),
(48, 'like', 'all', 'likeAll', 'fde18e3e76123959525c9994e1bd4ed6b856820a8112ff659df1a9a50e2b1083143aa6deda23591557cee46bf1c54c37563f02a37272341ddc8c31c1686eec63', 'User'),
(49, 'israel', 'israeli', 'israel', 'fde18e3e76123959525c9994e1bd4ed6b856820a8112ff659df1a9a50e2b1083143aa6deda23591557cee46bf1c54c37563f02a37272341ddc8c31c1686eec63', 'User'),
(50, 'tsuri', 'hefer', 'tsuriHefer', 'fde18e3e76123959525c9994e1bd4ed6b856820a8112ff659df1a9a50e2b1083143aa6deda23591557cee46bf1c54c37563f02a37272341ddc8c31c1686eec63', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(250) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `departDate` date NOT NULL,
  `returnDate` date NOT NULL,
  `price` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `departDate`, `returnDate`, `price`) VALUES
(1, 'Drift into a deep slumber listening to the waves lapping under your stilted bungalow. This is paradise discovered—AKA Bora Bora.', 'Bora Bora', '5136b8c2-4f89-441e-a3af-65f6ae1bab34.jpg', '0000-00-00', '0000-00-00', 1200),
(2, 'Japan is a wonderfull place, that suggest uniqe food, coloful culture, very nice people and a high level of hi tech', 'Japan', '5ca619e2-1bf9-4b31-861e-010880a65a3d.jpg', '0000-00-00', '0000-00-00', 300),
(4, 'The bright lights of the Big Apple make it an iconic destination. Cruise through our New York travel packages to find classic luxury NYC hotels', 'New york', 'efe47cc7-c3f2-42ad-9fc3-2704db296bc1.jpg', '0000-00-00', '0000-00-00', 50),
(6, 'Thailand is often called the land of smiles and rightly so. The people will make an impression on you with their gentleness and polite', 'Thailand', '9b06ca24-4d96-449a-802e-803c18d849c3.jpg', '0000-00-00', '0000-00-00', 123),
(7, 'great place molestiae quas vel sint commodi repudi molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis haru', 'Mexico', '35ec1941-eb70-40cb-a51c-07a4909ea836.jpg', '0000-00-00', '0000-00-00', 5),
(8, 'Dubai is full of contrasts. There is the glittering skyline, made up of skyscrapers so tall they defy imagination; the modern collection of stores and eateries, offering  everything', 'Dubai', 'fb2b21b5-5bd6-4787-91b4-f88125dd2d82.jpg', '0000-00-00', '0000-00-00', 547),
(9, ' it\'s no wonder Australian beaches regularly rank among the best in the world. Surf, swim, snorkel, sun-worship – there are endless ways to enjoy Australia\'s beautiful beaches and islands.', 'Australia', 'ce3f4495-9a78-4374-8f90-a8834205752f.jpg', '2022-10-05', '2022-10-28', 999),
(10, 'From the pulsating nightlife of Lagos to the stunning mountain peaks at Plateau State, this fascinating destination is begging to be explored.', 'Nigeria', 'f1acd759-510f-4af4-be0f-e585e8a1087e.jpg', '2022-12-03', '2022-12-10', 234),
(12, 'From medieval castles to glittering skyscrapers, the fairy-tale splendor of the Alps to the forest-fringed coastline of the Baltic Sea, Germanyis a sightseer’s paradise.', 'Germany', 'ad5e0386-aa8e-4f65-8ece-f8ecdb485e55.jpg', '2022-10-23', '2022-10-26', 3254),
(38, 'everyone knows Machu Picchu is great! And, of course, it certainly is. But we believe there are many more. Throughout Peru you can find everthing you ', 'Peru', 'fef73c4e-6e7d-4a8a-96ae-c68f7054f5f7.jpg', '2022-12-30', '2023-01-06', 111),
(42, 'It is this diversity of places, people and traditions that make Brazil such an unforgettable place to visit. It is certainly known for its music and food', 'Brazil', 'e26798dc-1571-4aa1-9d13-1255c750ddee.jpg', '0000-00-00', '0000-00-00', 44);

-- --------------------------------------------------------

--
-- Table structure for table `vacationsfollowers`
--

CREATE TABLE `vacationsfollowers` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacationsfollowers`
--

INSERT INTO `vacationsfollowers` (`vacationId`, `userId`) VALUES
(1, 46),
(1, 48),
(1, 49),
(1, 50),
(2, 50),
(4, 48),
(4, 49),
(4, 50),
(6, 46),
(6, 48),
(7, 48),
(7, 49),
(9, 46),
(9, 48),
(9, 49),
(10, 46),
(10, 48),
(10, 50),
(12, 48),
(12, 49),
(12, 50),
(38, 48),
(38, 50),
(42, 48);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD KEY `roleId` (`roleName`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- Indexes for table `vacationsfollowers`
--
ALTER TABLE `vacationsfollowers`
  ADD PRIMARY KEY (`vacationId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleName`) REFERENCES `roles` (`roleName`);

--
-- Constraints for table `vacationsfollowers`
--
ALTER TABLE `vacationsfollowers`
  ADD CONSTRAINT `vacationsfollowers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vacationsfollowers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
