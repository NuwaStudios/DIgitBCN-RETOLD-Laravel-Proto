<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\E21_Person;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Services\Crafter\CrafterService;

class CrafterController extends Controller
{
  protected CrafterService $crafterService;

  public function __construct(
    CrafterService $crafterService
  ){
    $this->crafterService = $crafterService;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $crafters = $this->crafterService->index(); // Array of crafters
    return response()->json($crafters);
  }
}
