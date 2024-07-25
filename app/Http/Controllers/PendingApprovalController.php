<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\PendingApproval\PendingApprovalService;
use Inertia\Inertia;

class PendingApprovalController extends Controller
{
    public function __construct(
      PendingApprovalService $pendingApprovalService,
    )
    {
      $this->pendingApprovalService = $pendingApprovalService;
    }

    public function index ()
    {
        $pendingApproval = $this->pendingApprovalService->allPendingApproval();

        return Inertia::render('PendingApproval/Index', [
          'buildings' => $pendingApproval['buildings'],
          'crafts' => $pendingApproval['crafts'],
        ]);
    }
}
