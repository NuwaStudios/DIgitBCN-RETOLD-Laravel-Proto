<?php

namespace App\Repositories;

use App\Models\PvPersonCraft;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class PvPersonCraftRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param PvPersonCraft $model
   */
  public function __construct(PvPersonCraft $model)
  {
    $this->model = $model;
  }
}
