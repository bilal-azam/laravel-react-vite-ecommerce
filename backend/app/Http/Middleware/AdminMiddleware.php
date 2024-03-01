<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

final class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated and has is_admin set to true
        if ($request->user() && $request->user()->is_admin) {
            return $next($request);
        }

        // Redirect or handle unauthorized access
        return response('You don\'t have permission to access this page.', 403);
    }
}
