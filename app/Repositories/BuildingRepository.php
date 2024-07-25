<?php

namespace App\Repositories;

use App\Models\Building;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class BuildingRepository extends BaseRepository
{

  protected $model;

  /**
   * @param Building $model
   */
  public function __construct(Building $model)
  {
    $this->model = $model;
  }
}
