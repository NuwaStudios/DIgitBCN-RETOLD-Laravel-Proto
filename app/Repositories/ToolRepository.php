<?php

namespace App\Repositories;

use App\Models\Tool;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class ToolRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param Tool $model
   */
  public function __construct(Tool $model)
  {
    $this->model = $model;
  }
}
