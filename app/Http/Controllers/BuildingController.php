<?php

namespace App\Http\Controllers;

use App\Http\Services\FormServices\BuildingFormServices\CreateBuildingFormService;
use App\Http\Services\FormServices\BuildingFormServices\ReadBuildingFormService;
use App\Http\Services\FormServices\BuildingFormServices\UpdateBuildingFormService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BuildingController extends Controller
{
  protected CreateBuildingFormService $createBuildingFormService;
  protected ReadBuildingFormService $readBuildingFormService;
  protected UpdateBuildingFormService $updateBuildingFormService;
  public function __construct(
    CreateBuildingFormService $createBuildingFormService,
    ReadBuildingFormService $readBuildingFormService,
    UpdateBuildingFormService $updateBuildingFormService
  ) {
    $this->createBuildingFormService = $createBuildingFormService;
    $this->readBuildingFormService = $readBuildingFormService;
    $this->updateBuildingFormService = $updateBuildingFormService;
  }

  /**
   * Display a listing of the resource.
   * @return Response
   */
  public function index(): Response
  {
    $buildings = $this->readBuildingFormService->index();
    return Inertia::render('Buildings/Index', [
      'buildings' => $buildings
    ]);
  }

  /**
   * Display the specified resource.
   * @param int $id Building ID
   * @return Response
   */
  public function show(int $id): Response
  {
    $building = $this->readBuildingFormService->show($id);
    return Inertia::render('Buildings/Show', [
      'building' => $building,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   * @return Response
   */
  public function create(): Response
  {
    return Inertia::render('Buildings/Create');
  }

  /**
   * Store a newly created resource in storage.
   * @param Request $request
   * @return Response
   */
  public function store(Request $request): Response
  {
    $building = $this->createBuildingFormService->main($request);
    return Inertia::render('Buildings/Create', [
      'building' => $building,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   * @param int $id Building ID
   * @return Response
   */
  public function edit(int $id): Response
  {
    $building = $this->readBuildingFormService->show($id);
    return Inertia::render('Buildings/Edit', [
      'id' => $id,
      'building' => $building,
    ]);
  }

  /**
   * Update the specified resource in storage.
   * @param Request $request
   * @param int $id Building ID
   * @return Response
   */
  public function update(Request $request, int $id): Response
  {
    $building = $this->updateBuildingFormService->main($request, $id);
    return Inertia::render('Buildings/Edit', [
      'id' => $id,
      'building' => $building,
    ]);
  }

  /**
   * Remove the specified resource from storage.
   * @param int $id Building ID
   * @return Response
   */
  public function destroy(int $id)
  {
    //
  }
}
