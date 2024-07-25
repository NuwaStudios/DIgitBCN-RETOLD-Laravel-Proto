<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\Organisations\OrganisationService;

class OrganisationsController extends \App\Http\Controllers\Controller
{
  protected OrganisationService $organisationService;

  public function __construct(
    OrganisationService $organisationService
  ){
    $this->organisationService = $organisationService;
  }
  public function index()
  {
    $organisations = $this->organisationService->index(['id', 'e41_appellation_english']);
    return response()->json($organisations);
  }
}
