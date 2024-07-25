<?php

namespace App\Http\Middleware;

use App\Models\E73_Document;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Organisation
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $user = auth()->user();

    if ($user->role->name !== 'admin') {
      $document = E73_Document::find($request->id);
      if ($user->organisation->id !== $document->organisationOwner->id) {
        return redirect('/unauthorized');
      }
    }

    return $next($request);
  }
}
