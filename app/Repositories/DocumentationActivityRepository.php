<?php

namespace App\Repositories;

use App\Models\E7_DocumentationActivity;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class DocumentationActivityRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param E7_DocumentationActivity $model
   */
  public function __construct(E7_DocumentationActivity $model)
  {
    $this->model = $model;
  }
}
