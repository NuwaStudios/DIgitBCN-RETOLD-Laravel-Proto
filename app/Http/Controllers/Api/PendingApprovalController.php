<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\PendingApproval\PendingApprovalService;
use Illuminate\Http\Request;

class PendingApprovalController extends Controller
{
    public function __construct(
        PendingApprovalService $pendingApprovalService
    )
    {
        $this->pendingApprovalService = $pendingApprovalService;
    }

    public function approveDocument($id)
    {
        $this->pendingApprovalService->approveDocument($id);

        return response()->json(['message' => 'Document approved']);
    }

    public function rejectDocument($id)
    {
        $this->pendingApprovalService->rejectDocument($id);

        return response()->json(['message' => 'Document rejected']);
    }
}
