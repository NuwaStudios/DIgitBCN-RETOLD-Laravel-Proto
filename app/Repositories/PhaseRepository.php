<?php

namespace App\Repositories;

use App\Models\Phase;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class PhaseRepository extends BaseRepository
{

  protected $model;

  /**
   * Phase constructor.
   *
   * @param Phase $model
   */
  public function __construct(Phase $model)
  {
    $this->model = $model;
  }
}
