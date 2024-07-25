<?php

namespace App\Repositories;

use App\Models\E74_Organisation;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class OrganisationRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param E74_Organisation $model
   */
  public function __construct(E74_Organisation $model)
  {
    $this->model = $model;
  }
}
