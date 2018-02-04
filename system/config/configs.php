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
    'cache' => [
        'type' => 'file',
        'options' => [
            'ttl' => 3600,
            'prefix' => '',
            'dir' => __DIR__ . '/../storage/cache'
        ]
    ],
    'session' => [
        'name' => 'PHPSESSID',
        'path' => __DIR__ . '/../storage/session'
    ],
    'log' => [
        'filename' => 'error.log',
        'path' => __DIR__ . '/../storage/log'
    ],
    'config' => [
        'config_modification' => true,
        'config_error_log' => true,
        'config_error_display' => true,
        'config_view_theme' => 'default',
        'config_compression' => 0
    ],
    'image' => [
        'directory' => __DIR__ . '/../../public/img',
    ],
    'url' => [
        'base' => 'http://pulsar-public/',
    ]
];
