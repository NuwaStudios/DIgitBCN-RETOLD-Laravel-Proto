<?php

namespace App\Repositories;

use App\Models\NotificationType;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class NotificationTypeRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param NotificationType $model
   */
  public function __construct(NotificationType $model)
  {
    $this->model = $model;
  }
}
