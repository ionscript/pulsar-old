SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

INSERT INTO `language` (`id`, `name`, `code`, `locale`, `image`, `directory`, `sort_order`, `status`) VALUES
  (1, 'English', 'en-gb', 'en-US,en_US.UTF-8,en_US,en-gb,english', 'en-gb.png', 'en-gb', 1, 1);

INSERT INTO `setting` (`code`, `key`, `value`, `serialized`) VALUES
  ('config', 'config_theme', 'default', 0),
  ('config', 'config_language', 'en-gb', 0),
  ('config', 'config_admin_language', 'en-gb', 0),
  ('config', 'config_limit', '20', 0),
  ('config', 'config_name', 'Pulsar', 0),
  ('config', 'config_email', '', 0),
  ('config', 'config_meta_title', '', 0),
  ('config', 'config_meta_description', '', 0),
  ('config', 'config_meta_keyword', '', 0),
  ('config', 'config_user_group_display', '[\"1\"]', 1),
  ('config', 'config_user_group', '1', 0),
  ('config', 'config_user_search', '1', 0),
  ('config', 'config_user_activity', '1', 0),
  ('config', 'config_user_online', '1', 0),
  ('config', 'config_login_attempts', '5', 0),
  ('config', 'config_mail_smtp_port', '', 0),
  ('config', 'config_mail_smtp_hostname', '', 0),
  ('config', 'config_mail_parameter', '', 0),
  ('config', 'config_mail_secure', '-- None --', 0),
  ('config', 'config_mail_engine', 'mail', 0),
  ('config', 'config_mail_smtp_username', '', 0),
  ('config', 'config_mail_smtp_password', '', 0),
  ('config', 'config_mail_smtp_timeout', '', 0),
  ('config', 'config_compression', '0', 0),
  ('config', 'config_error_display', '1', 0),
  ('config', 'config_error_log', '1', 0),
  ('config', 'config_error_filename', 'error.log', 0);

INSERT INTO `user` (`id`, `group_id`, `username`, `password`, `firstname`, `lastname`, `email`, `image`, `ip`, `status`, `date_added`) VALUES
  (1, 1, 'admin', '$2y$10$ioZ8GNFwM06/Drh8uWIqre2UkBvdDR/k8vZYzO1amy2K62gwkeGXu', 'John', 'Parker', 'admin@admin.com', '', '', 1, '2018-02-04 00:00:00');

INSERT INTO `user_group` (`id`, `approval`, `permission`) VALUES
  (1, 1, '{\"access\":[],\"modify\":[]}'),
  (2, 1, '{\"access\":[],\"modify\":[]}');

INSERT INTO `user_group_description` (`group_id`, `language_id`, `name`, `description`) VALUES
  (1, 1, 'Administrator', ''),
  (2, 1, 'Demonstration', '');
