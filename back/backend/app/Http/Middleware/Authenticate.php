<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards): Response
    {
        return parent::handle($request, $next, ...$guards);
    }

    protected function redirectTo($request): ?string
    {
        if (! $request->expectsJson()) {
            abort(401, 'Unauthenticated.');
        }

        return null;
    }
}
