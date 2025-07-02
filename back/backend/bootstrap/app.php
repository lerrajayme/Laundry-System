<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Only registering what's needed for API token-based auth (Bearer tokens)

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'auth' => \App\Http\Middleware\Authenticate::class, // ✅ Custom auth middleware to avoid login redirect error
        ]);

        $middleware->group('api', [
            HandleCors::class,
            'auth:sanctum',
            'throttle:api',
            SubstituteBindings::class,
        ]);

        $middleware->group('web', [
            // Empty since you are not using session-based web routes
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // You can customize global exception handling here
    })
    ->create();
