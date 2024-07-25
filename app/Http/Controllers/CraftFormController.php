<?php

namespace App\Http\Controllers;

use App\Http\Services\FormServices\CraftFormServices\CreateCraftFormService;
use App\Http\Services\FormServices\CraftFormServices\ReadCraftFormService;
use App\Http\Services\FormServices\CraftFormServices\UpdateCraftFormService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CraftFormController extends Controller
{
  protected CreateCraftFormService $createCraftFormService;
  protected ReadCraftFormService $readCraftFormService;
  protected UpdateCraftFormService $updateCraftFormService;
  public function __construct(
    CreateCraftFormService $createCraftFormService,
    ReadCraftFormService $readCraftFormService,
    UpdateCraftFormService $updateCraftFormService
  ) {
    $this->createCraftFormService = $createCraftFormService;
    $this->readCraftFormService = $readCraftFormService;
    $this->updateCraftFormService = $updateCraftFormService;
  }

  /**
   * Display a listing of crafts.
   * @return Response
   */
  public function index(): Response
  {
    $crafts = $this->readCraftFormService->index();
    return Inertia::render('Crafts/Index', [
      'crafts' => $crafts
    ]);
  }

  /**
   * Display the specified craft.
   * @param int $id Craft ID
   * @return Response
   */
  public function show(int $id): Response
  {
    $craft = $this->readCraftFormService->show($id);
    return Inertia::render('Crafts/Show', [
      'craft' => $craft
    ]);
  }

  /**
   * Index the form for creating a new craft.
   * @return Response
   */
  public function create(): Response
  {
    return Inertia::render('Crafts/Create');
  }

  /**
   * Store a newly created craft in storage.
   * @param Request $request
   * @return Response
   */
  public function store(Request $request): Response
  {
    $craft = $this->createCraftFormService->main($request);
    return Inertia::render('Crafts/Create', [
      'craft' => $craft
    ]);
  }

  /**
   * Index the form for editing the specified craft.
   * @param  int $id Craft ID
   * @return Response
   */
  public function edit(int $id): Response
  {
    $craft = $this->readCraftFormService->show($id);
    return Inertia::render('Crafts/Edit', [
      'id' => $id,
      'craft' => $craft
    ]);
  }

  /**
   * Update the specified craft in storage.
   * @param Request $request
   * @param int $id Craft ID
   * @return Response
   */
  public function update(Request $request, int $id): Response
  {
    $craft = $this->updateCraftFormService->main($request, $id);
    return Inertia::render('Crafts/Edit', [
      'id' => $id,
      'craft' => $craft
    ]);
  }

  /**
   * Remove the specified craft from storage.
   * @param int $id Craft ID
   * @return Response
   */
  public function destroy(int $id)
  {
    //
  }
}
