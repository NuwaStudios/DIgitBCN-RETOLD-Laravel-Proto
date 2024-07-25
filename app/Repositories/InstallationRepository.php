<?php

namespace App\Repositories;

use App\Models\Installation;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class InstallationRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param Installation $model
   */
  public function __construct(Installation $model)
  {
    $this->model = $model;
  }
}
