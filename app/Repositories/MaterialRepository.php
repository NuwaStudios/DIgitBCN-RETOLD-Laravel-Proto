<?php

namespace App\Repositories;

use App\Models\Material;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class MaterialRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param Material $model
   */
  public function __construct(Material $model)
  {
    $this->model = $model;
  }
}
