-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th1 09, 2021 lúc 08:11 AM
-- Phiên bản máy phục vụ: 10.4.16-MariaDB
-- Phiên bản PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vietnails_vip`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `day_off`
--

CREATE TABLE `day_off` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `is_types` tinyint(4) DEFAULT 0 COMMENT 'loại đơn , 1 xin nghỉ',
  `begin_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0. don chưa duyet 1. don da duye',
  `user_id_admin` int(11) DEFAULT NULL,
  `user_id_nv` int(11) DEFAULT NULL,
  `created_single` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `day_off`
--

INSERT INTO `day_off` (`id`, `content`, `is_types`, `begin_date`, `end_date`, `is_status`, `user_id_admin`, `user_id_nv`, `created_single`) VALUES
(14, '444444444444', 0, '2021-01-06 00:00:00', '2021-01-06 00:00:00', 1, 1, 31, '2021-01-05 03:09:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `info_config`
--

CREATE TABLE `info_config` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `conten_config` varchar(255) DEFAULT NULL,
  `created_config` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `info_config`
--

INSERT INTO `info_config` (`id`, `title`, `conten_config`, `created_config`) VALUES
(1, 'KEY', 'h0c l0 c() viek', '2020-11-12 14:08:07'),
(2, 'notify', 'key=AAAAI03A8A0:APA91bGsIIK6IvC_0r_mkJo38wpIHuHZoNbGqNzM_17s5FSv7L8fxKCf4fLoB0t61RZb4_dbGYbBdeP2FPxTx8P2K0MAaUJcaTXde4IB00k85yvCKb8SyxnSXUKmvkyI7XjOqrGHgXAI', '2020-11-12 14:08:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL COMMENT 'người nhận',
  `sender` varchar(255) DEFAULT NULL COMMENT 'người gửi',
  `date_notification` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nails_image_service`
--

CREATE TABLE `nails_image_service` (
  `id` int(11) NOT NULL,
  `image_sl` varchar(255) DEFAULT NULL,
  `nails_service_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nails_service`
--

CREATE TABLE `nails_service` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL COMMENT 'nội dung dịch vụ',
  `moneys_sv` int(11) DEFAULT 0 COMMENT 'tiền từng dv',
  `image` varchar(255) DEFAULT NULL,
  `time_service` int(10) DEFAULT NULL COMMENT 'tgian thuhc hien dv',
  `is_status` tinyint(4) NOT NULL DEFAULT 0,
  `service_type_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nails_service`
--

INSERT INTO `nails_service` (`id`, `title`, `content`, `moneys_sv`, `image`, `time_service`, `is_status`, `service_type_id`, `created_at`) VALUES
(1, 'Cắt da tay/chân', 'content', 0, 'https://hocvienmyanh.vn/upload/sanpham/large/khoa-hoc-nail-ky-thuat-cat-da-kieu-nga-10-0.jpg,', 15, 0, 1, '2020-10-25 04:24:24'),
(8, 'asdas', '1212eww', 0, 'https://miro.medium.com/max/612/1*5Hf7rjrfaU87qAKfh_t6hA@2x.jpeg', 30, 0, 1, '2020-11-10 13:16:20'),
(9, 'Sơn gel', '1212eww', 0, 'https://vnn-imgs-f.vgcloud.vn/2019/09/19/16/su-that-it-ai-biet-ve-son-mong-tay-khong-the-tay-gay-hai-cho-suc-khoe-nhu-the-nao.jpg', 30, 0, 2, '2020-11-10 13:23:02'),
(10, 'French đầu móng', '1212eww', 70000, 'https://image-tmp.guu.vn/full/2017/05/20/4d0f99a2a8d177379a7c1a7dbfffc70861c42ce5.jpg', 80, 0, 1, '2020-11-25 16:24:50'),
(11, 'Đắp gel', '1212eww', 300000, 'https://dotobjyajpegd.cloudfront.net/photo/5ee3343f8288b063aad1064e', 80, 0, 1, '2020-11-25 16:30:36'),
(12, 'Đắp bột', '1212eww', 300000, 'https://trangbeautysalon.vn/wp-content/uploads/2020/02/dap-bot.jpg', 80, 0, 1, '2020-11-25 16:30:37'),
(13, 'Đắp bột/gel ẩn kim tuyến', '1212eww', 350000, 'https://thebamboobeauty.iamsale.vn/upload/thebamboobeauty.iamsale.vn/hinh-anh-danh-muc-san-pham/images/2018-12/8630_1545615299.jpg', 90, 0, 1, '2020-11-26 11:21:36'),
(14, 'Đắp bột đính hoa đá', '1212eww', 380000, 'https://kientrannail.com/upload/images/61.jpg', 110, 0, 1, '2020-11-26 11:27:11'),
(15, 'Tháo sơn gel', '1212eww', 30000, 'https://nailzone.vn/wp-content/uploads/2016/11/nail2-re-768x498.jpg', 20, 0, 1, '2020-11-26 11:27:23'),
(16, 'Tháo gel đắp,bột đắp', '1212eww', 50000, 'https://nailzone.vn/wp-content/uploads/2018/04/1200-175178591-acrylic-painting-on-nails-768x512.jpg', 30, 0, 2, '2020-11-26 11:31:01'),
(17, 'Tẩy tế bào chết', '1212eww', 30000, 'https://www.maihan.vn/images/_thumbs/tri_mun_1.jpg', 15, 0, 2, '2020-11-26 11:31:10'),
(18, 'Đắp mặt nạ orrganic', '1212eww', 50000, 'https://cdn.tgdd.vn/Files/2019/12/04/1224697/nhung-loi-co-ban-khi-dap-mat-na-ma-nhieu-chi-em-mac-phai-201912041024372293.jpg', 20, 0, 2, '2020-11-26 11:40:32'),
(19, 'Massage mặt chuyên sâu', '1212eww', 220000, 'https://misstram.edu.vn/wp-content/uploads/2019/10/luu-y-khi-massage-da-mat.jpg', 60, 0, 2, '2020-11-26 11:43:30'),
(20, 'Trị mụn tiêu viêm', '1212eww', 490000, 'https://suckhoe123.vn/uploads/lam-dep/tri-mun-bang-anh-sang-xanh-co-hieu-qua-khong.jpg', 75, 0, 2, '2020-11-26 12:18:16'),
(21, 'Điều trị tàn nhang', '1212eww', 1000000, 'https://dayenthaospa.com/wp-content/uploads/2015/11/tri-nam-bang-laser-co-tot-khong-2.jpg', 150, 0, 2, '2020-11-27 12:30:56'),
(89, '1', '1212eww', 100000, '', 40, 0, 2, '2020-12-07 16:54:03'),
(90, '23', '1212eww', 100000, '', 40, 0, 1, '2020-12-07 16:54:06'),
(91, '4', '1212eww', 100000, '', 40, 0, 1, '2020-12-07 16:54:08'),
(92, '5', '1212eww', 100000, '', 40, 0, 1, '2020-12-07 16:54:12'),
(93, '6', '1212eww', 100000, '', 40, 0, 1, '2020-12-07 16:54:15'),
(94, '7', '1212eww', 100000, '', 40, 0, 1, '2020-12-07 16:54:17'),
(103, 'Nguyễn Vinh', 'Hhihiihi', 300000, 'http://vietnails.cf/Image/jTk2jVs9bw00FB_IMG\r\n_1602434509061.jpg', 20, 0, 1, '2020-12-21 03:41:07'),
(104, 'triet long', 'triet long mawt', 400000, 'https://nailzone.vn/wp-content/uploads/2018/04/1200-175178591-acrylic-painting-on-nails-768x512.jpg', 30, 1, 2, '2021-01-04 14:13:01'),
(105, 'triet long', 'triet long mawt', 400000, 'https://nailzone.vn/wp-content/uploads/2018/04/1200-175178591-acrylic-painting-on-nails-768x512.jpg', 30, 1, 2, '2021-01-04 14:19:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nails_service_type`
--

CREATE TABLE `nails_service_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_st` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nails_service_type`
--

INSERT INTO `nails_service_type` (`id`, `name`, `image_st`, `created_at`) VALUES
(1, 'mong tay', 'https://hocvienmyanh.vn/upload/sanpham/large/khoa-hoc-nail-ky-thuat-cat-da-kieu-nga-10-0.jpg,', '2021-01-04 13:55:25'),
(2, 'mong chan ', 'https://hocvienmyanh.vn/upload/sanpham/large/khoa-hoc-nail-ky-thuat-cat-da-kieu-nga-10-0.jpg,', '2021-01-04 13:55:25'),
(3, 'mong tay', 'https://hocvienmyanh.vn/upload/sanpham/large/khoa-hoc-nail-ky-thuat-cat-da-kieu-nga-10-0.jpg,', '2021-01-04 13:55:27'),
(4, 'mong chan ', 'https://hocvienmyanh.vn/upload/sanpham/large/khoa-hoc-nail-ky-thuat-cat-da-kieu-nga-10-0.jpg,', '2021-01-04 13:55:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `notification_key` varchar(1000) DEFAULT NULL,
  `is_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `notification`
--

INSERT INTO `notification` (`id`, `user_id`, `notification_key`, `is_created`) VALUES
(27, 53, 'eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR', '2020-12-09 04:47:05'),
(28, 50, 'eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR', '2020-12-12 01:29:46'),
(29, 48, 'eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR', '2020-12-09 04:47:05'),
(30, 52, 'eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR', '2020-12-09 04:47:05'),
(31, 43, 'eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR', '2020-12-09 04:47:05'),
(32, 46, 'eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR', '2020-12-09 04:47:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `code_order` varchar(16) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL COMMENT 'thời gian làm',
  `end_time` datetime DEFAULT NULL COMMENT 'thời gian kết thúc',
  `content_order` varchar(1000) DEFAULT NULL,
  `moneys` int(11) NOT NULL DEFAULT 0 COMMENT 'tông tiền',
  `status` tinyint(4) DEFAULT NULL COMMENT '0. kh tạo(chơ sư lý)\r\n1. kh huỷ\r\n2. nv nhận\r\n3. nv huy don\r\n4. đơn hoàn thành\r\n5. thu ngân bxaac nhan khách hang den',
  `phone_kh` varchar(13) DEFAULT NULL,
  `name_kh` varchar(255) DEFAULT NULL,
  `user_id_kh` int(11) DEFAULT NULL,
  `created_order` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `code_order`, `start_time`, `end_time`, `content_order`, `moneys`, `status`, `phone_kh`, `name_kh`, `user_id_kh`, `created_order`) VALUES
(143, 'cJQ9acbbYC', '2021-01-06 08:00:13', '2021-01-06 09:30:13', '11sd', 900000, 2, '0987654327', 'ADC', 36, '2021-01-05 02:16:14'),
(144, 'yAXW9skRrz', '2021-01-06 08:00:13', '2021-01-06 12:30:13', '11sd', 900000, 2, '0987654328', '0987654328', 37, '2021-01-05 02:16:56'),
(145, 'ELtwB7itWO', '2021-01-06 08:00:13', '2021-01-06 09:30:13', '11sd', 900000, 2, '0987654329', 'ADC', 38, '2021-01-05 02:17:01'),
(146, '1hMgPD4bgx', '2021-01-06 08:00:13', '2021-01-06 10:30:13', '11sd', 900000, 0, '0987654330', 'bbnbbbb', 39, '2021-01-05 02:17:26'),
(147, '04ej0OgtEs', '2021-01-06 15:00:13', '2021-01-06 18:30:13', '11sd', 900000, 0, '0987654331', 'ADC', 40, '2021-01-05 02:17:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `name_tn` varchar(100) DEFAULT NULL,
  `phone_tn` varchar(13) DEFAULT NULL,
  `user_id_tn` int(11) DEFAULT NULL,
  `moneys_od` int(11) NOT NULL DEFAULT 0,
  `status_od` tinyint(4) DEFAULT 0,
  `nails_service_id` int(11) DEFAULT NULL,
  `orders_id` int(11) DEFAULT NULL,
  `created_od` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `name_tn`, `phone_tn`, `user_id_tn`, `moneys_od`, `status_od`, `nails_service_id`, `orders_id`, `created_od`) VALUES
(253, NULL, NULL, NULL, 300000, 0, 1, 143, '2021-01-05 02:16:14'),
(254, NULL, NULL, NULL, 200000, 0, 8, 143, '2021-01-05 02:16:14'),
(255, NULL, NULL, NULL, 400000, 0, 9, 143, '2021-01-05 02:16:14'),
(256, NULL, NULL, NULL, 300000, 0, 1, 144, '2021-01-05 02:16:56'),
(257, NULL, NULL, NULL, 200000, 0, 8, 144, '2021-01-05 02:16:56'),
(258, NULL, NULL, NULL, 400000, 0, 9, 144, '2021-01-05 02:16:56'),
(259, NULL, NULL, NULL, 300000, 0, 1, 145, '2021-01-05 02:17:01'),
(260, NULL, NULL, NULL, 200000, 0, 8, 145, '2021-01-05 02:17:01'),
(261, NULL, NULL, NULL, 400000, 0, 9, 145, '2021-01-05 02:17:01'),
(262, NULL, NULL, NULL, 300000, 0, 1, 146, '2021-01-05 02:17:27'),
(263, NULL, NULL, NULL, 200000, 0, 8, 146, '2021-01-05 02:17:27'),
(264, NULL, NULL, NULL, 400000, 0, 9, 146, '2021-01-05 02:17:27'),
(265, NULL, NULL, NULL, 300000, 0, 1, 147, '2021-01-05 02:17:40'),
(266, NULL, NULL, NULL, 200000, 0, 8, 147, '2021-01-05 02:17:40'),
(267, NULL, NULL, NULL, 400000, 0, 9, 147, '2021-01-05 02:17:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_staffs`
--

CREATE TABLE `order_staffs` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `is_status` tinyint(4) DEFAULT NULL COMMENT '1. nv làm đơn , 2. nv huỷ đơn',
  `user_id_nv` int(11) DEFAULT NULL,
  `orders_id` int(11) DEFAULT NULL,
  `created_staffs` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `order_staffs`
--

INSERT INTO `order_staffs` (`id`, `content`, `is_status`, `user_id_nv`, `orders_id`, `created_staffs`) VALUES
(39, '', 1, 32, 143, '2021-01-05 04:18:17'),
(44, '', 1, 33, 144, '2021-01-05 09:17:04'),
(45, '', 1, 34, 145, '2021-01-05 09:17:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otp_code`
--

CREATE TABLE `otp_code` (
  `id` int(11) NOT NULL,
  `otp` varchar(16) DEFAULT NULL,
  `status_otp` varchar(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_otp` varchar(50) DEFAULT NULL,
  `at_created` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_content`
--

CREATE TABLE `post_content` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `type_roles` tinyint(4) DEFAULT NULL COMMENT 'quyen',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `type_roles`, `created_at`) VALUES
(1, 'admin', 1, '2020-11-02 10:40:01'),
(2, 'nhân viên', 2, '2020-11-02 10:40:01'),
(3, 'Khách hàng', 3, '2020-11-02 10:40:22'),
(4, 'nhân viên kế toán', 4, '2020-11-02 10:40:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fullname` varchar(250) DEFAULT NULL,
  `roles_id` int(11) DEFAULT NULL COMMENT '1.admin, 2 NV, 3.KH',
  `avatar` varchar(255) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `is_status` tinyint(4) DEFAULT 0 COMMENT '1. thanh cong, 2. that bai',
  `is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0 mở , 1 khoá 2. xoa',
  `created_us` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `phone`, `password`, `email`, `fullname`, `roles_id`, `avatar`, `address`, `is_status`, `is_active`, `created_us`) VALUES
(1, '0975325421', '202cb962ac59075b964b07152d234b70', '0987654321', 'admin', 1, NULL, NULL, 1, 0, '2020-10-22 11:07:37'),
(31, '097395978', '202cb962ac59075b964b07152d234b70', 'vinh@gmail.com', 'Vinh', 2, NULL, 'Ha noi', 1, 0, '2020-11-10 10:18:48'),
(32, '0987654322', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 2, NULL, 'Huong Yen', 1, 0, '2020-11-10 10:21:12'),
(33, '0987654323', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 2, NULL, 'Huong Yen', 1, 0, '2020-11-10 10:23:03'),
(34, '0987654324', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 2, NULL, 'Huong Yen', 1, 0, '2020-11-10 10:30:45'),
(35, '0987654326', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 2, NULL, NULL, 1, 0, '2020-11-10 10:47:56'),
(36, '0987654327', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-10 10:49:28'),
(37, '0987654328', '202cb962ac59075b964b07152d234b70', NULL, '0987654328', 3, NULL, NULL, 1, 0, '2020-11-10 11:05:53'),
(38, '0987654329', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-10 11:07:13'),
(39, '0987654330', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'bbnbbbb', 3, '21qww', NULL, 1, 0, '2020-11-10 11:07:44'),
(40, '0987654331', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-10 11:08:47'),
(41, '0987654332', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-10 11:13:40'),
(42, '0987654337', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 2, '2020-11-10 11:44:38'),
(43, '097395912', '202cb962ac59075b964b07152d234b70', 'vinh@gmail.com', 'Vinh', 3, NULL, NULL, 1, 0, '2020-11-11 07:32:22'),
(44, '0987654333', 'b619154e8d8061bf211581aa447d33c0', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-20 14:13:05'),
(45, '0989999999', 'd5c557ff34c10a7c852c77967446f8e1', 'tuvietnails407@gmail.com', 'Nguyễn Ngọc Tú', 3, '', NULL, 1, 0, '2020-11-20 14:13:15'),
(46, '12', '964cc7216c4ac999758fbbaf5a3b4b07', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-20 14:13:25'),
(47, '0986666666', '67e4324ddfc6feb37881a452fc30a9bf', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-20 15:08:32'),
(48, '0999999999', 'b3ee54a861291e3dea579dbfd5f7c548', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-20 16:30:10'),
(49, '0912345678', '0c936e852d6d430e610963fda7bc1b1e', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-22 02:13:27'),
(50, '0987365987', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:05:08'),
(51, '0987365986', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:24:31'),
(52, '0987365982', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:27:22'),
(53, '0987365980', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:27:48'),
(54, '0987365965', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:30:21'),
(55, '0987365232', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:33:15'),
(56, '0987361111', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:33:29'),
(57, '0987363232', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:36:04'),
(58, '0987365921', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 04:37:10'),
(59, '0987361234', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-22 15:07:33'),
(60, '0987331342', '1bbd886460827015e5d605ed44252251', 'nhinhi122@gmail.com', 'Phạm Băng Nhi', 3, '', NULL, 1, 0, '2020-11-23 13:35:30'),
(61, '0981365987', '1bbd886460827015e5d605ed44252251', 'mailan063@gmail.com', 'Kiều Mai Lan', 3, '', NULL, 1, 0, '2020-11-23 13:45:27'),
(62, '0287365987', '1bbd886460827015e5d605ed44252251', 'trucquynh0605@gmail.com', 'Võ Trúc Quỳnh', 3, '', NULL, 1, 0, '2020-11-23 14:15:27'),
(63, '0968902116', '1bbd886460827015e5d605ed44252251', 'son@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-23 14:48:33'),
(64, '0328962512', '25f9e794323b453885f5181f1b624d0b', 'khanhhx251200@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-24 08:46:50'),
(65, '0987365988', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-24 10:08:01'),
(66, '0321316516', '31f09b8ced0abf9de5eccddcb4b5f2f2', 'khanh@amoa.vla', NULL, 3, NULL, NULL, 1, 0, '2020-11-25 17:06:00'),
(67, '0130123131', '175e3ac943cfd72e83de3ea4d7dc3acc', 'kh@mao.cm', NULL, 3, NULL, NULL, 1, 0, '2020-11-25 17:07:43'),
(68, '0000000000', 'a5f2528e34b3949610b2b3cde387c84c', 'hiennguyen0108@gmail.com', 'Nguyễn thị Hiền', 3, '', NULL, 1, 0, '2020-11-26 12:33:03'),
(69, '0122345992', '202cb962ac59075b964b07152d234b70', 'a3333@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-11-27 12:00:00'),
(70, '0968954569', '202cb962ac59075b964b07152d234b70', 'maihaanh1211@gmail.com', 'Mai Hà Anh', 3, NULL, NULL, 1, 0, '2020-11-27 12:41:08'),
(71, '0969896578', '202cb962ac59075b964b07152d234b70', 'minhhai1108@gmail.com', 'Trần Thị Minh Hải', 3, NULL, NULL, 1, 0, '2020-11-27 13:42:18'),
(72, '0968789908', '202cb962ac59075b964b07152d234b70', 'mylinhn908@gmail.com', 'Hà Mỹ Linh', 3, NULL, NULL, 1, 0, '2020-11-27 13:51:42'),
(73, '0966464943', 'e06c93aaff70eb49e5e6a311618b9857', 'hoatieuanh@gmail.com', 'Chu Nguyệt Ánh', 3, NULL, NULL, 1, 0, '2020-11-27 13:55:20'),
(74, '0964754794', '5369276325e3fc6cb164976c6e0d2d15', 'bichlien502@gmail.com', 'Hà Thị Bích Liên', 3, NULL, NULL, 1, 0, '2020-11-27 13:58:03'),
(75, '0978522357', '2a1fa2a86ae9d1ff24fa2c149a3931c0', 'hannail221@gmail.com', 'Trịnh Gia Hân', 3, NULL, NULL, 1, 0, '2020-11-27 13:59:53'),
(76, '0968902117', 'f4fc8a416f8be148db91d57412cc34a0', 'abc@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-11-28 06:11:15'),
(77, '0968930216', 'e24d3a6718be9dd73a94a3277c8ee6fa', 'ajvd@ffd.vn', NULL, 3, NULL, NULL, 1, 0, '2020-11-30 17:38:38'),
(78, '000123412312', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-12-01 11:13:29'),
(79, '0978522354', '232ee77ae18a96fa7d6870239b386c5b', 'hiennguyen0108@gmail.com', 'Nguyễn Thị Hiền', 3, '', NULL, 1, 0, '2020-12-01 11:33:28'),
(80, '0823576868', '1f247d1254a48870bd80c2279afb271d', 'ngocmai2212@gmail.com', 'Trần Ngọc Mai', 4, 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p240x240/120026041_1616192271894916_4365072317694759783_n.jpg?_nc_cat=101&ccb=2&_nc_sid=dbb9e7&_nc_ohc=j3O7JDlzOLkAX-Rif6e&_nc_ht=scontent.fhan2-1.fna&tp=6&oh=e7b8d006805817b924ccb6c8cd0bbb2d&oe=5FE9D5D9', NULL, 1, 0, '2020-12-01 11:43:01'),
(81, '0969568168', 'a40fcf7b45ca1278625d36706cd75aed', 'thanhthanhnail@gmail.com', 'Phạm Thanh Thanh', 4, 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-1/p240x240/125976204_189803309441613_950632039489390623_n.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=ffvVXgs76GYAX_iyLFU&_nc_ht=scontent.fhan2-4.fna&tp=6&oh=d2458218ef56d7350c1661dde911009e&oe=5FED6150', NULL, 1, 0, '2020-12-01 12:36:24'),
(82, '0981234567', '47e465a11fdea6df286e7e04d049a2d7', 'adc0981234567@gmail.com', 'ADC0981234567', 4, NULL, NULL, 1, 0, '2020-12-02 08:36:35'),
(83, '0912999999', '229c3f7e7b9c1be5bfa2f46d90c4ab00', 'abc@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-12-02 11:49:15'),
(84, '0388600323', '10420f63a82d61deeafe594b9007a212', 'toanltph08046@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-12-02 12:29:14'),
(85, '0987667897', 'c44755c3379313db173e53c3e8fb6701', 'BC@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-12-02 13:00:36'),
(86, '03298962512', '68c4efe82ad67b9c245967cba912cb0a', 'khanhhx251200@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2020-12-05 16:17:14'),
(93, '019398151', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-12-10 08:54:22'),
(94, '33333333', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 0, '2020-12-10 18:51:19'),
(95, '0987654321', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 3, NULL, NULL, 1, 2, '2020-12-17 08:35:02'),
(96, '09753254212', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', NULL, 3, NULL, NULL, 1, 0, '2021-01-09 06:53:15');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `day_off`
--
ALTER TABLE `day_off`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`user_id_nv`),
  ADD KEY `user_id_admin` (`user_id_admin`);

--
-- Chỉ mục cho bảng `info_config`
--
ALTER TABLE `info_config`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`user_id`);

--
-- Chỉ mục cho bảng `nails_image_service`
--
ALTER TABLE `nails_image_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nails_service_id` (`nails_service_id`);

--
-- Chỉ mục cho bảng `nails_service`
--
ALTER TABLE `nails_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_type_id` (`service_type_id`);

--
-- Chỉ mục cho bảng `nails_service_type`
--
ALTER TABLE `nails_service_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`user_id_kh`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`user_id_tn`),
  ADD KEY `id_Service_shop` (`nails_service_id`),
  ADD KEY `id_Schedule` (`orders_id`);

--
-- Chỉ mục cho bảng `order_staffs`
--
ALTER TABLE `order_staffs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`user_id_nv`),
  ADD KEY `id_schedule` (`orders_id`);

--
-- Chỉ mục cho bảng `otp_code`
--
ALTER TABLE `otp_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `post_content`
--
ALTER TABLE `post_content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_roles` (`type_roles`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `id_roles` (`roles_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `day_off`
--
ALTER TABLE `day_off`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `info_config`
--
ALTER TABLE `info_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `nails_image_service`
--
ALTER TABLE `nails_image_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nails_service`
--
ALTER TABLE `nails_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT cho bảng `nails_service_type`
--
ALTER TABLE `nails_service_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT cho bảng `order_staffs`
--
ALTER TABLE `order_staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `otp_code`
--
ALTER TABLE `otp_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT cho bảng `post_content`
--
ALTER TABLE `post_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `day_off`
--
ALTER TABLE `day_off`
  ADD CONSTRAINT `day_off_ibfk_1` FOREIGN KEY (`user_id_nv`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `day_off_ibfk_2` FOREIGN KEY (`user_id_admin`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `nails_image_service`
--
ALTER TABLE `nails_image_service`
  ADD CONSTRAINT `nails_image_service_ibfk_1` FOREIGN KEY (`nails_service_id`) REFERENCES `nails_service` (`id`);

--
-- Các ràng buộc cho bảng `nails_service`
--
ALTER TABLE `nails_service`
  ADD CONSTRAINT `nails_service_ibfk_1` FOREIGN KEY (`service_type_id`) REFERENCES `nails_service_type` (`id`);

--
-- Các ràng buộc cho bảng `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id_kh`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`user_id_tn`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_4` FOREIGN KEY (`nails_service_id`) REFERENCES `nails_service` (`id`);

--
-- Các ràng buộc cho bảng `order_staffs`
--
ALTER TABLE `order_staffs`
  ADD CONSTRAINT `order_staffs_ibfk_1` FOREIGN KEY (`user_id_nv`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `order_staffs_ibfk_2` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `otp_code`
--
ALTER TABLE `otp_code`
  ADD CONSTRAINT `otp_code_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `post_content`
--
ALTER TABLE `post_content`
  ADD CONSTRAINT `post_content_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
