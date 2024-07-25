<?php

namespace App\Repositories;

use App\Models\E52_Timespan;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class TimespanRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param E52_Timespan $model
   */
  public function __construct(E52_Timespan $model)
  {
    $this->model = $model;
  }
}
