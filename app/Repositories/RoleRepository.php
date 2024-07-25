<?php

namespace App\Repositories;

use App\Models\Role;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class RoleRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param Role $model
   */
  public function __construct(Role $model)
  {
    $this->model = $model;
  }
}
