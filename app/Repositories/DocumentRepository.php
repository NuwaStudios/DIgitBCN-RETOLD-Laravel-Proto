<?php

namespace App\Repositories;

use App\Models\E73_Document;
use App\Repositories\Interfaces\Eloquent\BaseRepository;
use Illuminate\Support\Facades\App;

class DocumentRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param E73_Document $model
   */


  public function __construct(E73_Document $model)
  {
    $this->model = $model;
  }

  public function getAllBuildingDocuments()
  {
    $documents = $this->model->all();
    $buildingDocuments = [];
    foreach ($documents as $document) {
      if ($document->building) {
        array_push($buildingDocuments, $document);
      }
    }
    return $buildingDocuments;
  }

  public function getAllCraftDocuments()
  {
    $documents = $this->model->all();
    $craftDocuments = [];
    foreach ($documents as $document) {
      if ($document->craft) {
        array_push($craftDocuments, $document);
      }
    }
    return $craftDocuments;
  }

  public function getAllPendingApproval()
  {
    $documents = $this->model->where('is_public', false)->get();

    $buildingDocuments = [];
    $craftDocuments = [];

    foreach ($documents as $document) {
      if ($document->craft) {
        array_push($craftDocuments, $document);
      } elseif ($document->building) {
        array_push($buildingDocuments, $document);
      }
    }

    return [
      'buildingDocuments' => $buildingDocuments,
      'craftDocuments' => $craftDocuments,
    ];
  }

  public function createBaseDocument($summary)
  {
//    $document = $this->model->create($summary['document']);
//
//    $craft = App::make(CraftRepository::class)->create($summary['craft']);
//    $timespan = App::make(TimespanRepository::class)->create($summary['craft']['timespan']);
//    /**
//     * $document->documentationActivity devuelve el modelo, la instancia de E7_DocumentationActivity
//     * $document->documentationActivity() devuelve la relacion entre E73_Document y E7_DocumentationActivity
//     */
//    $document->timespan()->associate($timespan)->save();
//
//    $document->craft()->save($craft);
//    $document->craft->timespan()->associate($timespan)->save(); // TODO: Crear timespan especifico para el craft
//
//    return $document;
  }
}
