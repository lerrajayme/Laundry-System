<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'register',
    'login',
    'logout',
    'forgot-password',
    'reset-password',
    'email/verification-notification',
    'verify-email/*'],

    'allowed_methods' => ['POST', 'GET', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Authorization'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
