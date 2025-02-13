<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, ...$roles): Response
  {
    $user = auth()->user();
    foreach($roles as $role) {
      if($user->role->name === $role)
        return $next($request);
    }

    return redirect('/unauthorized');
  }
}
