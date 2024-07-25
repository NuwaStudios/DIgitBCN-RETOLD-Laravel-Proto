<?php

namespace App\Repositories;

use App\Models\E28_Craft;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class CraftRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param E28_Craft $model
   */
  public function __construct(E28_Craft $model)
  {
    $this->model = $model;
  }


  public function getAllWithDocuments(array $columns = ['*'], array $relations = [])
  {
    return $this->model->select($columns)->with($relations)->get()->filter(function ($craft) {
      return $craft->document->is_public;
    });
  }
}
