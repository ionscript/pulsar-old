<?php

return [
    'db' => [
        'driver' => 'mysqli',
        'hostname' => 'localhost',
        'username' => 'root',
        'password' => 'toor',
        'database' => 'pulsar-public',
        'port' => 3306,
        'charset' => 'utf8',
        'options' => []
    ],
    'config' => [
        'config_modification' => true,
        'config_error_log' => true,
        'config_error_display' => true,
        'config_view_theme' => 'default',
        'config_compression' => 0
    ],
    'url' => [
        'path' => 'admin/'
    ],
    'router' => include 'routes.php',
];
