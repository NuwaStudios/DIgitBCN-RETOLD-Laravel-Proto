<?php

namespace App\Http\Controllers;

use App\Http\Services\Organisations\OrganisationService;
use App\Models\E74_Organisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganisationsController extends Controller
{
  protected OrganisationService $organisationService;

  public function __construct(
    OrganisationService $organisationService
  ){
    $this->organisationService = $organisationService;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $organisations = $this->organisationService->index(['id', 'e41_appellation_english']);
    return Inertia::render('Organisations/Index', [
      'organisations' => $organisations
    ]);
  }

  /**
   * Index the form for creating a new resource.
   */
  public function create(): Response
  {
      return Inertia::render('Organisations/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request): Response
  {
    $organisation = $this->organisationService->create($request);
    return Inertia::render('Organisations/Create', [
      'organisation' => $organisation
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Request $request, int $id)
  {
    $organisation = $this->organisationService->show($id);
    return Inertia::render('Organisations/Show', [
      'organisation' => $organisation
    ]);
  }

  /**
   * Index the form for editing the specified resource.
   */
  public function edit(int $id)
  {
      $organisation = $this->organisationService->show($id);
      return Inertia::render('Organisations/Edit', [
        'id' => $id,
        'organisation' => $organisation
      ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, int $id)
  {
    $this->organisationService->update($request, $id);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(E74_Organisation $e74_Organisation)
  {
      //
  }
}
