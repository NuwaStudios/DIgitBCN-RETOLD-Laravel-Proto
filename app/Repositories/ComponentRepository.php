<?php

namespace App\Repositories;

use App\Models\Component;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class ComponentRepository extends BaseRepository
{

  protected $model;

  /**
   * @param Component $model
   */
  public function __construct(Component $model)
  {
    $this->model = $model;
  }
}
