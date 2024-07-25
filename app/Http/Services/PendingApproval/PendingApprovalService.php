<?php

namespace App\Http\Services\PendingApproval;

use App\Repositories\DocumentRepository;

class PendingApprovalService
{
  public function __construct(
    DocumentRepository $documentRepository,
  )
  {
    $this->documentRepository = $documentRepository;
  }

  public function allPendingApproval()
  {
    $documents = $this->documentRepository->getAllPendingApproval();

    return [
      'buildings' => $documents['buildingDocuments'],
      'crafts' => $documents['craftDocuments'],
    ];
  }

  public function approveDocument($id)
  {
    $document = $this->documentRepository->findById($id);
    $document->is_public = 1;
    $document->save();

    return $document;
  }

  public function rejectDocument($id)
  {
    $document = $this->documentRepository->findById($id);
    $document->delete();
  }
}
