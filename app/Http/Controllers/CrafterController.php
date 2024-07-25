<?php

namespace App\Http\Controllers;

use App\Models\E21_Person;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Services\Crafter\CrafterService;
use Inertia\Response;

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
   * @return Response
   */
  public function index(): Response
  {
    $crafters = $this->crafterService->index(); // Array of crafters
    return Inertia::render('Crafters/Index', [
      'crafters' => $crafters
    ]);
  }

  /**
   * Display the specified resource.
   * @param int $id Crafter ID
   * @return Response
   */
  public function show(int $id)//: Response
  {
//    $crafter = $this->crafterService->show($id);
//    return Inertia::render('Crafters/Index', [
//      'crafter' => $crafter
//    ]);
  }

  /**
   * Index the form for creating a new resource.
   * @return Response
   */
  public function create(): Response
  {
    return Inertia::render('Crafters/Create');
  }

  /**
   * Store a newly created resource in storage.
   * @param Request $request
   * @return Response
   */
  public function store(Request $request): Response
  {
    $crafter = $this->crafterService->create($request);
    return Inertia::render('Crafters/Create',[
      'crafter' => $crafter
    ]);
  }

  /**
   * Index the form for editing the specified resource.
   * @param int $id
   * @return Response
   */
  public function edit(int $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   * @param Request $request
   * @param int $id Crafter ID
   * @return Response
   */
  public function update(Request $request, int $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   * @param int $id Crafter ID
   * @return Response
   */
  public function destroy(int $id)
  {
    //
  }
}
