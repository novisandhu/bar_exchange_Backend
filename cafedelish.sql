-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2021 at 09:33 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barxchange`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `fullname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='admin details';

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `email`, `password`, `mobile`, `fullname`) VALUES
('admin', 'admin@gmail.com', '123', 6969696969, 'Admin Kumar');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryname` varchar(60) NOT NULL,
  `categorydescription` varchar(150) NOT NULL,
  `supercategory` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryname`, `categorydescription`, `supercategory`) VALUES
('Indian cuisine', 'consists of a variety of regional and traditional cuisines native to the Indian subcontinent.', ''),
('Italian cuisine', 'A Mediterranean cuisine consisting of the ingredients, recipes and cooking techniques developed across the Italian Peninsula since antiquity.', '');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `detailid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `discount` float NOT NULL,
  `netprice` float NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `orderid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`detailid`, `productid`, `price`, `qty`, `discount`, `netprice`, `status`, `orderid`) VALUES
(8, 10, 179, 3, 10, 161.1, 'served', 12),
(9, 11, 250, 2, 0, 250, 'served', 12);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `amount` float NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `paymentmode` varchar(50) NOT NULL,
  `mobileno` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `staffusername` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderid`, `amount`, `datetime`, `paymentmode`, `mobileno`, `status`, `staffusername`) VALUES
(12, 2699, '2021-05-13 10:34:42', 'Cash', '9876543213', 'paid', 'abc');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productid` int(11) NOT NULL,
  `productname` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL,
  `photo` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `subcategoryid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productid`, `productname`, `price`, `discount`, `photo`, `description`, `subcategoryid`) VALUES
(7, 'Special Punjabi Thali', 209, 19, 'images/Special Punjabi Thali.jpg', 'extra delicious thali with punjabi chicken curry, onion-mint pulao, whole wheat laccha paratha and a tawa mix subzi cooked with traditional spice mix.\nINGREDIENTS :\nChicken Tikka, Rice, Indian Spices, Onion, Tomato,Fresh Cream, Curd, Potato, Sweet Corn, Carrot, Tri Bell Peppers, Beans, Chilli, Mint Chutney, Butter, Paratha.', 12),
(9, 'Kadhai Paneer-Thali', 180, 0, 'images/Kadhai Paneer-Thali.jpg', 'cooked with rich in-house spices, which is accompanied with whole wheat laccha paratha, jeera flavoured basmati rice, dal makhani, pickle and boondi raita. INGREDIENTS : Dal Makhani, Kadhai Paneer, Jeera Rice, Pickle, Raita, Paratha.', 12),
(10, 'Homestyle Thali', 179, 10, 'images/Homestyle Thali.jpg', 'Dal makhani cooked in a rich buttery gravy is accompanied with jeera flavoured basmati rice, paratha, homemade aloo-carrot-beans dry veg, boondi raita and pickle. INGREDIENTS: Jeera Rice, Dal Makhani, Pickle, Aloo-Carrot-Beans Veg, Paratha, Boondi Raita.', 12),
(11, 'Ghee-Roast Chicken Thali', 250, 0, 'images/Ghee-Roast Chicken Thali.jpg', 'Begin your meal with a DELISH mangalorean ghee roast chicken starter, rich dal makhani accompanied with whole wheat laccha paratha, jeera flavoured rice, boondi raita and pickle. Hot-selling and delicious!. INGREDIENTS: Ghee-Roast Chicken, Paratha, Jeera Rice,, Dal Makhni, Pickle, Boondi Raita.', 12),
(12, 'Rajma-Masala Thali', 179, 25, 'images/Rajma-Masala Thali.jpg', 'Delicious and flavourful rajma curry accompanied with a whole wheat paratha, jeera flavoured rice, mixed veg subzi, boondi raita and a yummy pickle. INGREDIENTS: Rajma,Basmati Rice, Mixed Veg, Salad, Pickle, Boondi Raita, Paratha', 12),
(13, 'Vegetable Korma & Malabari Paratha', 179, 19, 'images/Vegetable Korma & Malabari Paratha.jpg', 'The delicious fresh veggies in this dish, makes it a winner by choice. Bite into this dish that comes with paneer, cauliflower, beans, green peas and carrot cooked in a rich gravy. The dish is finished with cashewnuts and raisins. Served with two fresh Malabari parathas. INGREDIENTS: Malabari Paratha, Paneer, Beans, Carrot, Cauliflower, Green Peas, Onion, Curd, Fresh Cream, Green Chilli, Garlic, Spices, Cashewnut,, Raisins', 12);

-- --------------------------------------------------------

--
-- Table structure for table `product_stock`
--

CREATE TABLE `product_stock` (
  `stockid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `vendorname` varchar(50) NOT NULL,
  `stockdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_stock`
--

INSERT INTO `product_stock` (`stockid`, `productid`, `qty`, `vendorname`, `stockdate`) VALUES
(2, 7, 50, 'Rakesh', '2021-04-30'),
(3, 9, 60, 'Rohan Bhatia', '2021-05-09'),
(4, 10, 80, 'Rohan Bhatia', '2021-05-09'),
(5, 11, 50, 'Sohan Lal', '2021-05-09'),
(6, 12, 80, 'Rakesh', '2021-05-09'),
(7, 13, 60, 'Rakesh', '2021-05-09');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staffusername` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staffusername`, `password`, `email`, `mobile`, `status`, `type`) VALUES
('abc', '123', 'abc@gmail.com', '9876543212', 'active', 'Captain'),
('mno', '123', 'mno@gmail.com', '9876543213', 'active', 'Kitchen'),
('xyz', '123', 'xyz@gmail.com', '1234564328', 'active', 'Cashier');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `subcategoryid` int(11) NOT NULL,
  `subcategoryname` varchar(60) NOT NULL,
  `subcategorydescription` varchar(150) NOT NULL,
  `categoryname` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`subcategoryid`, `subcategoryname`, `subcategorydescription`, `categoryname`) VALUES
(11, 'Soft Drinks', 'Artificial flavoring drinks that contains carbonated water, fruit juice, sugar substitute, etc..', 'Indian cuisine'),
(12, 'Thali', 'Thali (meaning \"plate\") or Bhojanam (meaning \"full meal\") is a round platter used to serve food in the Indian subcontinent and Southeast Asia.', 'Indian cuisine');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryname`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`detailid`),
  ADD KEY `product_fk` (`productid`),
  ADD KEY `order_fk` (`orderid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `staff_fk` (`staffusername`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productid`),
  ADD KEY `foreignkey` (`subcategoryid`);

--
-- Indexes for table `product_stock`
--
ALTER TABLE `product_stock`
  ADD PRIMARY KEY (`stockid`),
  ADD KEY `fk` (`productid`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staffusername`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subcategoryid`),
  ADD KEY `foreign_key` (`categoryname`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `detailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_stock`
--
ALTER TABLE `product_stock`
  MODIFY `stockid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subcategoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `order_fk` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`),
  ADD CONSTRAINT `product_fk` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `staff_fk` FOREIGN KEY (`staffusername`) REFERENCES `staff` (`staffusername`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `foreignkey` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`);

--
-- Constraints for table `product_stock`
--
ALTER TABLE `product_stock`
  ADD CONSTRAINT `fk` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`);

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `foreign_key` FOREIGN KEY (`categoryname`) REFERENCES `category` (`categoryname`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
