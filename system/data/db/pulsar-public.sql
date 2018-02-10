SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pulsar`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
CREATE TABLE IF NOT EXISTS `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `name`, `status`) VALUES
  (4, 'banner', 1);

-- --------------------------------------------------------

--
-- Table structure for table `banner_image`
--

DROP TABLE IF EXISTS `banner_image`;
CREATE TABLE IF NOT EXISTS `banner_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `link` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `sort_order` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banner_image`
--

INSERT INTO `banner_image` (`id`, `banner_id`, `language_id`, `title`, `link`, `image`, `sort_order`) VALUES
  (33, 4, 1, 'Slide 3', '', '\\data/photo28@2x.jpg', 3),
  (32, 4, 1, 'Slide 2', '', '\\data/photo2.jpg', 2),
  (31, 4, 1, 'Slide 1', '', '\\data/photo1.jpg', 1),
  (34, 4, 2, 'Slide UA', '', '\\data/promo-code.png', 2),
  (35, 4, 2, 'Slide 1 UA', '', '\\data\\avatar/ion.avatar.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `image`, `parent_id`, `status`, `date_added`, `date_modified`) VALUES
  (4, '/data/photo28@2x.jpg', 0, 1, '2018-02-07 15:24:03', '2018-02-07 21:32:00');

-- --------------------------------------------------------

--
-- Table structure for table `category_description`
--

DROP TABLE IF EXISTS `category_description`;
CREATE TABLE IF NOT EXISTS `category_description` (
  `category_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`,`language_id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category_description`
--

INSERT INTO `category_description` (`category_id`, `language_id`, `name`, `description`, `meta_title`, `meta_description`, `meta_keyword`) VALUES
  (4, 2, 'cat1', '<p>cat1<br></p>', 'cat1', '', ''),
  (4, 1, 'cat1', '<p>fdfhfhjfhfdg</p>', 'cat1', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `category_path`
--

DROP TABLE IF EXISTS `category_path`;
CREATE TABLE IF NOT EXISTS `category_path` (
  `category_id` int(11) NOT NULL,
  `path_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`path_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category_path`
--

INSERT INTO `category_path` (`category_id`, `path_id`, `level`) VALUES
  (4, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cron`
--

DROP TABLE IF EXISTS `cron`;
CREATE TABLE IF NOT EXISTS `cron` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(64) NOT NULL,
  `cycle` varchar(12) NOT NULL,
  `action` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(64) NOT NULL,
  `trigger` text NOT NULL,
  `action` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `extension`
--

DROP TABLE IF EXISTS `extension`;
CREATE TABLE IF NOT EXISTS `extension` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `code` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `extension`
--

INSERT INTO `extension` (`id`, `type`, `code`) VALUES
  (70, 'module', 'banner'),
  (81, 'dashboard', 'online'),
  (78, 'theme', 'default'),
  (86, 'module', 'slideshow'),
  (87, 'module', 'html');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
CREATE TABLE IF NOT EXISTS `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `code` varchar(5) NOT NULL,
  `locale` varchar(255) NOT NULL,
  `image` varchar(64) NOT NULL,
  `directory` varchar(32) NOT NULL,
  `sort_order` int(3) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `name`, `code`, `locale`, `image`, `directory`, `sort_order`, `status`) VALUES
  (1, 'English', 'en-gb', 'en-US,en_US.UTF-8,en_US,en-gb,english', 'en-gb.png', 'english', 1, 1),
  (2, 'Ukrainian', 'uk-ua', 'uk-UA,uk_UA,uk_UA.UTF-8,ukrainian', 'uk-ua.png', 'uk-ua', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `layout`
--

DROP TABLE IF EXISTS `layout`;
CREATE TABLE IF NOT EXISTS `layout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `layout`
--

INSERT INTO `layout` (`id`, `name`) VALUES
  (14, 'Home');

-- --------------------------------------------------------

--
-- Table structure for table `layout_module`
--

DROP TABLE IF EXISTS `layout_module`;
CREATE TABLE IF NOT EXISTS `layout_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layout_id` int(11) NOT NULL,
  `code` varchar(64) NOT NULL,
  `position` varchar(14) NOT NULL,
  `sort_order` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `layout_module`
--

INSERT INTO `layout_module` (`id`, `layout_id`, `code`, `position`, `sort_order`) VALUES
  (99, 14, 'html.9', 'content_top', 2),
  (98, 14, 'slideshow.8', 'content_top', 1),
  (97, 14, 'html.10', 'content_top', 0),
  (100, 14, 'html.11', 'content_top', 3);

-- --------------------------------------------------------

--
-- Table structure for table `layout_route`
--

DROP TABLE IF EXISTS `layout_route`;
CREATE TABLE IF NOT EXISTS `layout_route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layout_id` int(11) NOT NULL,
  `route` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `layout_route`
--

INSERT INTO `layout_route` (`id`, `layout_id`, `route`) VALUES
  (75, 14, '/');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE IF NOT EXISTS `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `code` varchar(32) NOT NULL,
  `setting` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `name`, `code`, `setting`) VALUES
  (9, 'Features Top', 'html', '{\"name\":\"Features Top\",\"description\":{\"1\":{\"title\":\"\",\"description\":\"    <!-- Classic Features #1 -->\\r\\n    <div class=\\\"bg-white\\\">\\r\\n        <section class=\\\"content content-boxed\\\">\\r\\n            <!-- Section Content -->\\r\\n            <div class=\\\"row items-push-3x push-50-t nice-copy\\\">\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push-30\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-rocket\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Bootstrap Powered<\\/h3>\\r\\n                    <p>Bootstrap is a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development. OneUI was built on top, extending it to a large degree.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-mobile\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Fully Responsive<\\/h3>\\r\\n                    <p>The User Interface will adjust to any screen size. It will look great on mobile devices and desktops at the same time. No need to worry about the UI, just stay focused on the development.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-clock-o\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Save time<\\/h3>\\r\\n                    <p>OneUI will save you hundreds of hours of extra development. Start right away coding your functionality and watch your project come to life months sooner.<\\/p>\\r\\n                <\\/div>\\r\\n            <\\/div>\\r\\n            <div class=\\\"row items-push-3x nice-copy\\\">\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-check\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Frontend Pages<\\/h3>\\r\\n                    <p>Premium and fully responsive frontend pages are included in OneUI package, too. They use the same resources with the backend, so you can build your web application in one go, using all available components wherever you like.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push-30\\\">\\r\\n                        <span class=\\\"item item-2x item-circle border\\\">{less}<\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-center push-10\\\">LessCSS<\\/h3>\\r\\n                    <p>OneUI was built from scratch with LessCSS. Completely modular design with components, variables and mixins that will help you customize and extend your framework to the maximum.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-github\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Grunt Tasks<\\/h3>\\r\\n                    <p>Grunt tasks will make your life easier. You can use them to live-compile your Less files to CSS as you work or build your custom color themes and framework.<\\/p>\\r\\n                <\\/div>\\r\\n            <\\/div>\\r\\n            <!-- END Section Content -->\\r\\n        <\\/section>\\r\\n    <\\/div>\\r\\n    <!-- END Classic Features #1 -->\"},\"2\":{\"title\":\"\",\"description\":\"<p><br><\\/p>    <!-- Classic Features #1 -->\\r\\n    <div class=\\\"bg-white\\\">\\r\\n        <section class=\\\"content content-boxed\\\">\\r\\n            <!-- Section Content -->\\r\\n            <div class=\\\"row items-push-3x push-50-t nice-copy\\\">\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push-30\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-rocket\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Bootstrap Powered<\\/h3>\\r\\n                    <p>Bootstrap is a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development. OneUI was built on top, extending it to a large degree.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-mobile\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Fully Responsive<\\/h3>\\r\\n                    <p>The User Interface will adjust to any screen size. It will look great on mobile devices and desktops at the same time. No need to worry about the UI, just stay focused on the development.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-clock-o\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Save time<\\/h3>\\r\\n                    <p>OneUI will save you hundreds of hours of extra development. Start right away coding your functionality and watch your project come to life months sooner.<\\/p>\\r\\n                <\\/div>\\r\\n            <\\/div>\\r\\n            <div class=\\\"row items-push-3x nice-copy\\\">\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-check\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Frontend Pages<\\/h3>\\r\\n                    <p>Premium and fully responsive frontend pages are included in OneUI package, too. They use the same resources with the backend, so you can build your web application in one go, using all available components wherever you like.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push-30\\\">\\r\\n                        <span class=\\\"item item-2x item-circle border\\\">{less}<\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-center push-10\\\">LessCSS<\\/h3>\\r\\n                    <p>OneUI was built from scratch with LessCSS. Completely modular design with components, variables and mixins that will help you customize and extend your framework to the maximum.<\\/p>\\r\\n                <\\/div>\\r\\n                <div class=\\\"col-sm-4\\\">\\r\\n                    <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-github\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                    <\\/div>\\r\\n                    <h3 class=\\\"h5 font-w600 text-uppercase text-center push-10\\\">Grunt Tasks<\\/h3>\\r\\n                    <p>Grunt tasks will make your life easier. You can use them to live-compile your Less files to CSS as you work or build your custom color themes and framework.<\\/p>\\r\\n                <\\/div>\\r\\n            <\\/div>\\r\\n            <!-- END Section Content -->\\r\\n        <\\/section>\\r\\n    <\\/div>\\r\\n    <!-- END Classic Features #1 -->\"}},\"status\":\"1\"}'),
  (8, 'Home Slideshow', 'slideshow', '{\"name\":\"Home Slideshow\",\"banner_id\":\"4\",\"width\":\"1140\",\"height\":\"380\",\"status\":\"1\"}'),
  (10, 'Hero Content', 'html', '{\"name\":\"Hero Content\",\"description\":{\"1\":{\"title\":\"\",\"description\":\"    <!-- Hero Content -->\\r\\n    <div class=\\\"bg-image\\\" style=\\\"background-image: url(\'img\\/data\\/hero1.jpg\');\\\">\\r\\n        <div class=\\\"bg-primary-dark-op\\\">\\r\\n            <section class=\\\"content content-full content-boxed overflow-hidden\\\">\\r\\n                <!-- Section Content -->\\r\\n                <div class=\\\"push-100-t push-50 text-center\\\">\\r\\n                    <h1 class=\\\"h2 text-white push-10 visibility-hidden\\\" data-toggle=\\\"appear\\\" data-class=\\\"animated fadeInDown\\\">Build your Web Application with One.<\\/h1>\\r\\n                    <h2 class=\\\"h5 text-white-op push-50 visibility-hidden\\\" data-toggle=\\\"appear\\\" data-class=\\\"animated fadeInDown\\\">Powerful, flexible and reliable UI framework that just works. Your valuable feedback made it happen.<\\/h2>\\r\\n                    <a class=\\\"btn btn-rounded btn-noborder btn-lg btn-primary visibility-hidden\\\" data-toggle=\\\"appear\\\" data-class=\\\"animated bounceIn\\\" data-timeout=\\\"800\\\" href=\\\"frontend_pricing.html\\\">Purchase Today<\\/a>\\r\\n                <\\/div>\\r\\n\\r\\n                <!-- END Section Content -->\\r\\n            <\\/section>\\r\\n        <\\/div>\\r\\n    <\\/div>\\r\\n    <!-- END Hero Content -->\"},\"2\":{\"title\":\"\",\"description\":\"    <!-- Hero Content -->\\r\\n    <div class=\\\"bg-image\\\" style=\\\"background-image: url(\'img\\/data\\/hero1.jpg\');\\\">\\r\\n        <div class=\\\"bg-primary-dark-op\\\">\\r\\n            <section class=\\\"content content-full content-boxed overflow-hidden\\\">\\r\\n                <!-- Section Content -->\\r\\n                <div class=\\\"push-100-t push-50 text-center\\\">\\r\\n                    <h1 class=\\\"h2 text-white push-10 visibility-hidden\\\" data-toggle=\\\"appear\\\" data-class=\\\"animated fadeInDown\\\">Build your Web Application with One.<\\/h1>\\r\\n                    <h2 class=\\\"h5 text-white-op push-50 visibility-hidden\\\" data-toggle=\\\"appear\\\" data-class=\\\"animated fadeInDown\\\">Powerful, flexible and reliable UI framework that just works. Your valuable feedback made it happen.<\\/h2>\\r\\n                    <a class=\\\"btn btn-rounded btn-noborder btn-lg btn-primary visibility-hidden\\\" data-toggle=\\\"appear\\\" data-class=\\\"animated bounceIn\\\" data-timeout=\\\"800\\\" href=\\\"frontend_pricing.html\\\">Purchase Today<\\/a>\\r\\n                <\\/div>\\r\\n\\r\\n                <!-- END Section Content -->\\r\\n            <\\/section>\\r\\n        <\\/div>\\r\\n    <\\/div>\\r\\n    <!-- END Hero Content -->\"}},\"status\":\"1\"}'),
  (11, 'Features Bottom', 'html', '{\"name\":\"Features Bottom\",\"description\":{\"1\":{\"title\":\"\",\"description\":\"    <!-- Features Bottom -->\\r\\n    <div class=\\\"bg-image\\\" style=\\\"background-image: url(\'img\\/data\\/photo28@2x.jpg\');\\\">\\r\\n        <div class=\\\"bg-primary-dark-op\\\">\\r\\n            <section class=\\\"content content-full content-boxed\\\">\\r\\n                <!-- Section Content -->\\r\\n                <div class=\\\"row items-push-2x push-50-t text-center\\\">\\r\\n                    <div class=\\\"col-sm-4 visibility-hidden text-white-op\\\" data-toggle=\\\"appear\\\" data-offset=\\\"-150\\\">\\r\\n                        <div class=\\\"text-center push-30\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-wrench\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                        <\\/div>\\r\\n                        <h3 class=\\\"h5 font-w600 text-warning  text-uppercase text-center push-10\\\">Components<\\/h3>\\r\\n                        <p>OneUI comes packed with so many unique components. Carefully picked and integrated to enhance and enrich your project with great functionality. Use them anywhere you want.<\\/p>\\r\\n\\r\\n                    <\\/div>\\r\\n                    <div class=\\\"col-sm-4 visibility-hidden  text-white-op\\\" data-toggle=\\\"appear\\\" data-offset=\\\"-150\\\" data-timeout=\\\"150\\\">\\r\\n                        <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-support\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                        <\\/div>\\r\\n                        <h3 class=\\\"h5 font-w600  text-warning text-uppercase text-center push-10\\\">Support<\\/h3>\\r\\n                        <p>By purchasing a license of OneUI, you are eligible to email support. Should you get stuck somewhere or come accross any issue, don\\u2019t worry because I am here to provide assistance.<\\/p>\\r\\n                    <\\/div>\\r\\n                    <div class=\\\"col-sm-4 visibility-hidden  text-white-op\\\" data-toggle=\\\"appear\\\" data-offset=\\\"-150\\\" data-timeout=\\\"300\\\">\\r\\n                        <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-sitemap\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                        <\\/div>\\r\\n                        <h3 class=\\\"h5 font-w600  text-warning text-uppercase text-center push-10\\\">Grunt Tasks<\\/h3>\\r\\n                        <p>Grunt tasks will make your life easier. You can use them to live-compile your Less files to CSS as you work or build your custom color themes and framework.<\\/p>\\r\\n                    <\\/div>\\r\\n                <\\/div>\\r\\n                <!-- END Section Content -->\\r\\n            <\\/section>\\r\\n        <\\/div>\\r\\n    <\\/div>\\r\\n    <!-- END Features Bottom -->\"},\"2\":{\"title\":\"\",\"description\":\"<p><br><\\/p>    <!-- Features Bottom -->\\r\\n    <div class=\\\"bg-image\\\" style=\\\"background-image: url(\'img\\/data\\/photo28@2x.jpg\');\\\">\\r\\n        <div class=\\\"bg-primary-dark-op\\\">\\r\\n            <section class=\\\"content content-full content-boxed\\\">\\r\\n                <!-- Section Content -->\\r\\n                <div class=\\\"row items-push-2x push-50-t text-center\\\">\\r\\n                    <div class=\\\"col-sm-4 visibility-hidden text-white-op\\\" data-toggle=\\\"appear\\\" data-offset=\\\"-150\\\">\\r\\n                        <div class=\\\"text-center push-30\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-wrench\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                        <\\/div>\\r\\n                        <h3 class=\\\"h5 font-w600 text-warning  text-uppercase text-center push-10\\\">Components<\\/h3>\\r\\n                        <p>OneUI comes packed with so many unique components. Carefully picked and integrated to enhance and enrich your project with great functionality. Use them anywhere you want.<\\/p>\\r\\n\\r\\n                    <\\/div>\\r\\n                    <div class=\\\"col-sm-4 visibility-hidden  text-white-op\\\" data-toggle=\\\"appear\\\" data-offset=\\\"-150\\\" data-timeout=\\\"150\\\">\\r\\n                        <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-support\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                        <\\/div>\\r\\n                        <h3 class=\\\"h5 font-w600  text-warning text-uppercase text-center push-10\\\">Support<\\/h3>\\r\\n                        <p>By purchasing a license of OneUI, you are eligible to email support. Should you get stuck somewhere or come accross any issue, don\\u2019t worry because I am here to provide assistance.<\\/p>\\r\\n                    <\\/div>\\r\\n                    <div class=\\\"col-sm-4 visibility-hidden  text-white-op\\\" data-toggle=\\\"appear\\\" data-offset=\\\"-150\\\" data-timeout=\\\"300\\\">\\r\\n                        <div class=\\\"text-center push\\\">\\r\\n                                    <span class=\\\"item item-2x item-circle border\\\">\\r\\n                                        <i class=\\\"fa fa-sitemap\\\"><\\/i>\\r\\n                                    <\\/span>\\r\\n                        <\\/div>\\r\\n                        <h3 class=\\\"h5 font-w600  text-warning text-uppercase text-center push-10\\\">Grunt Tasks<\\/h3>\\r\\n                        <p>Grunt tasks will make your life easier. You can use them to live-compile your Less files to CSS as you work or build your custom color themes and framework.<\\/p>\\r\\n                    <\\/div>\\r\\n                <\\/div>\\r\\n                <!-- END Section Content -->\\r\\n            <\\/section>\\r\\n        <\\/div>\\r\\n    <\\/div>\\r\\n    <!-- END Features Bottom -->\"}},\"status\":\"1\"}');

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `top` tinyint(1) NOT NULL,
  `bottom` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `viewed` int(5) NOT NULL DEFAULT '0',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `top`, `bottom`, `status`, `viewed`, `date_added`, `date_modified`) VALUES
  (4, 1, 0, 1, 17, '2018-02-07 15:19:29', '2018-02-09 13:35:58'),
  (5, 0, 0, 1, 1, '2018-02-07 15:21:03', '2018-02-07 15:21:48');

-- --------------------------------------------------------

--
-- Table structure for table `page_description`
--

DROP TABLE IF EXISTS `page_description`;
CREATE TABLE IF NOT EXISTS `page_description` (
  `page_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`page_id`,`language_id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `page_description`
--

INSERT INTO `page_description` (`page_id`, `language_id`, `name`, `description`, `meta_title`, `meta_description`, `meta_keyword`) VALUES
  (4, 2, 'some page 3', '<p>rshrdh</p>', 'reyre', 'ry', ''),
  (4, 1, 'Blog', '<p>segreyf</p>', 'ryhrteh', 'sryreyh', ''),
  (5, 2, 'page some uk', '<p>dfgfdhfr</p>', 'thyrtu', 'tuytruj', ''),
  (5, 1, 'page some', '<p>fgfdhfdh</p>', 'ghfgj', 'gjhgk', '');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_available` date NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `viewed` int(5) NOT NULL DEFAULT '0',
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `user_id`, `image`, `date_available`, `sort_order`, `status`, `viewed`, `date_added`, `date_modified`) VALUES
  (6, 1, '\\data/promo-code.png', '2018-02-07', 0, 1, 6, '2018-02-07 15:30:44', '2018-02-08 08:44:51');

-- --------------------------------------------------------

--
-- Table structure for table `post_description`
--

DROP TABLE IF EXISTS `post_description`;
CREATE TABLE IF NOT EXISTS `post_description` (
  `post_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `tag` text NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`post_id`,`language_id`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_description`
--

INSERT INTO `post_description` (`post_id`, `language_id`, `name`, `description`, `tag`, `meta_title`, `meta_description`, `meta_keyword`) VALUES
  (6, 2, 'fgjfgj', '<p>fgjfgj</p>', '', 'fgjfgj', 'gfjfgj', ''),
  (6, 1, 'gfhjfghj', '<p>gfjhfgj</p>', '', 'gfhfgh', 'fghjfgj', '');

-- --------------------------------------------------------

--
-- Table structure for table `post_related`
--

DROP TABLE IF EXISTS `post_related`;
CREATE TABLE IF NOT EXISTS `post_related` (
  `post_id` int(11) NOT NULL,
  `related_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`related_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_related`
--

INSERT INTO `post_related` (`post_id`, `related_id`) VALUES
  (9, 6),
  (10, 6),
  (11, 6);

-- --------------------------------------------------------

--
-- Table structure for table `post_to_category`
--

DROP TABLE IF EXISTS `post_to_category`;
CREATE TABLE IF NOT EXISTS `post_to_category` (
  `post_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`category_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_to_category`
--

INSERT INTO `post_to_category` (`post_id`, `category_id`) VALUES
  (6, 4);

-- --------------------------------------------------------

--
-- Table structure for table `seo_url`
--

DROP TABLE IF EXISTS `seo_url`;
CREATE TABLE IF NOT EXISTS `seo_url` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language_id` int(11) NOT NULL,
  `query` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `push` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `query` (`query`),
  KEY `keyword` (`keyword`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seo_url`
--

INSERT INTO `seo_url` (`id`, `language_id`, `query`, `keyword`, `push`) VALUES
  (8, 1, 'cfhbfdgh', 'gjg', 'tdjyf');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `data` text NOT NULL,
  `expire` datetime NOT NULL,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `name`, `data`, `expire`) VALUES
  ('t9t8bfttp7kpe7jb4kjlvbtof5', 'PHPSESSID', 'token|s:32:\"A1Xc2YMXjSvcjCIPsX7C7ujPg8A2SzEp\";language|s:5:\"en-gb\";', '2018-02-09 19:30:48');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(32) NOT NULL,
  `key` varchar(64) NOT NULL,
  `value` text NOT NULL,
  `serialized` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `code`, `key`, `value`, `serialized`) VALUES
  (627, 'config', 'config_mail_smtp_port', '', 0),
  (626, 'config', 'config_mail_smtp_hostname', '', 0),
  (625, 'config', 'config_mail_parameter', '', 0),
  (624, 'config', 'config_mail_secure', '-- None --', 0),
  (623, 'config', 'config_mail_engine', 'mail', 0),
  (622, 'config', 'config_login_attempts', '5', 0),
  (621, 'config', 'config_user_group_display', '[\"1\"]', 1),
  (620, 'config', 'config_user_group', '1', 0),
  (619, 'config', 'config_user_search', '1', 0),
  (618, 'config', 'config_user_activity', '1', 0),
  (617, 'config', 'config_user_online', '1', 0),
  (616, 'config', 'config_theme', 'default', 0),
  (615, 'config', 'config_admin_language', 'en-gb', 0),
  (614, 'config', 'config_language', 'en-gb', 0),
  (613, 'config', 'config_limit', '20', 0),
  (612, 'config', 'config_meta_keyword', 'pulsar', 0),
  (611, 'config', 'config_meta_description', 'pulsar', 0),
  (610, 'config', 'config_meta_title', 'pulsar', 0),
  (609, 'config', 'config_email', 'admin@admin.com', 0),
  (608, 'config', 'config_name', 'Pulsar', 0),
  (651, 'theme_default', 'theme_default_theme', '', 0),
  (652, 'theme_default', 'theme_default_status', '1', 0),
  (655, 'dashboard_online', 'dashboard_online_status', '1', 0),
  (654, 'dashboard_online', 'dashboard_online_sort_order', '', 0),
  (653, 'dashboard_online', 'dashboard_online_width', '3', 0),
  (628, 'config', 'config_mail_smtp_username', '', 0),
  (629, 'config', 'config_mail_smtp_password', '', 0),
  (630, 'config', 'config_mail_smtp_timeout', '', 0),
  (631, 'config', 'config_compression', '0', 0),
  (632, 'config', 'config_error_display', '1', 0),
  (633, 'config', 'config_error_log', '1', 0),
  (634, 'config', 'config_error_filename', 'error.log', 0),
  (650, 'theme_default', 'theme_default_class', 'header-navbar-fixed sidebar-o sidebar-l', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `lastname` varchar(32) NOT NULL,
  `email` varchar(96) NOT NULL,
  `image` varchar(255) NOT NULL,
  `ip` varchar(40) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `group_id`, `username`, `password`, `firstname`, `lastname`, `email`, `image`, `ip`, `status`, `date_added`) VALUES
  (1, 1, 'admin', '$2y$10$ioZ8GNFwM06/Drh8uWIqre2UkBvdDR/k8vZYzO1amy2K62gwkeGXu', 'John', 'Parker', 'admin@admin.com', '/data/avatar/ion.avatar.png', '::1', 1, '2018-02-04 00:00:00'),
  (3, 2, 'user', '$2y$10$VoOCvCbbX8oEflycfkWvYOe6LbPIivfQB3DeNFbH.0cNRyF6typwW', 'john', 'smith', 'admin@rfert.jtyii', '\\data/promo-code.png', '::1', 1, '2018-02-09 14:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
CREATE TABLE IF NOT EXISTS `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `approval` tinyint(1) NOT NULL,
  `permission` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`id`, `approval`, `permission`) VALUES
  (1, 1, '{\"access\":[\"banner\",\"extension\\/menu\\/menu\",\"extension\\/module\\/slideshow\",\"extension\\/module\\/html\",\"extension\\/module\\/category\",\"extension\\/module\\/banner\",\"extension\\/theme\\/default\",\"extension\\/dashboard\\/online\",\"extension\\/analytics\\/google\",\"extension\\/extension\\/theme\",\"extension\\/extension\\/report\",\"extension\\/extension\\/menu\",\"extension\\/extension\\/dashboard\",\"extension\\/extension\\/analytics\",\"extension\\/extension\\/module\",\"online\",\"language\",\"seo\",\"layout\",\"post\",\"page\",\"category\",\"user-group\",\"user\",\"backup\",\"log\",\"setting\",\"admin\\/extension\\/module\\/html\"],\"modify\":[\"banner\",\"extension\\/menu\\/menu\",\"extension\\/module\\/slideshow\",\"extension\\/module\\/html\",\"extension\\/module\\/category\",\"extension\\/module\\/banner\",\"extension\\/theme\\/default\",\"extension\\/dashboard\\/online\",\"extension\\/analytics\\/google\",\"extension\\/extension\\/theme\",\"extension\\/extension\\/report\",\"extension\\/extension\\/menu\",\"extension\\/extension\\/dashboard\",\"extension\\/extension\\/analytics\",\"extension\\/extension\\/module\",\"online\",\"language\",\"seo\",\"layout\",\"post\",\"page\",\"category\",\"user-group\",\"user\",\"backup\",\"log\",\"setting\",\"admin\\/extension\\/module\\/html\"]}'),
  (2, 1, '{\"access\":[],\"modify\":[]}'),
  (5, 1, 'null');

-- --------------------------------------------------------

--
-- Table structure for table `user_group_description`
--

DROP TABLE IF EXISTS `user_group_description`;
CREATE TABLE IF NOT EXISTS `user_group_description` (
  `group_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`group_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_group_description`
--

INSERT INTO `user_group_description` (`group_id`, `language_id`, `name`, `description`) VALUES
  (1, 2, 'Администратор', ''),
  (2, 1, 'Demonstration', ''),
  (2, 2, 'Демонстрация', ''),
  (1, 1, 'Administrator', ''),
  (5, 1, 'dtrgyerhy', 'rherherh'),
  (5, 2, 'sdrhydrh', 'srhyerhuerh');

-- --------------------------------------------------------

--
-- Table structure for table `user_ip`
--

DROP TABLE IF EXISTS `user_ip`;
CREATE TABLE IF NOT EXISTS `user_ip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ip` varchar(40) NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ip` (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_ip`
--

INSERT INTO `user_ip` (`id`, `user_id`, `ip`, `date_added`) VALUES
  (3, 1, '::1', '2018-02-04 01:57:01'),
  (4, 3, '::1', '2018-02-09 17:14:31');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
CREATE TABLE IF NOT EXISTS `user_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(96) NOT NULL,
  `ip` varchar(40) NOT NULL,
  `total` int(4) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `ip` (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_online`
--

DROP TABLE IF EXISTS `user_online`;
CREATE TABLE IF NOT EXISTS `user_online` (
  `ip` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `referer` text NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_online`
--

INSERT INTO `user_online` (`ip`, `user_id`, `url`, `referer`, `date_added`) VALUES
  ('::1', 0, 'http://pulsar-public/', '', '2018-02-09 19:06:48');
