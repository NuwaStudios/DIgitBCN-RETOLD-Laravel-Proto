<?php

namespace App\Repositories;

use App\Models\E53_Address;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class AddressRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param E53_Address $model
   */
  public function __construct(E53_Address $model)
  {
    $this->model = $model;
  }
}
