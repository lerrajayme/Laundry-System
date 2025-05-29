<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Since you're not using cookies or CSRF with Sanctum anymore,
    | this array can be left empty.
    |
    */
    'stateful' => [],

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | Change this to use 'api' instead of 'web', since you're using token-based
    | authentication via the API guard and not sessions or cookies.
    |
    */
    'guard' => ['api'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | Set to null for non-expiring tokens, or set a number if you want them
    | to auto-expire after some time (like 60 for 1 hour).
    |
    */
    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Optional prefix for tokens, mostly useful for secret scanning tools.
    |
    */
    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | You can safely remove or ignore session and CSRF middleware since
    | you're not using cookies or browser sessions.
    |
    */
    'middleware' => [
        // Don't include these if you're not using cookies/sessions:
        'authenticate_session' => null,
        'encrypt_cookies' => null,
        'validate_csrf_token' => null,
    ],

];
