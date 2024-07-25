<?php

namespace App\Repositories;

use App\Models\Notification;
use App\Repositories\Interfaces\Eloquent\BaseRepository;

class NotificationRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param Notification $model
   */
  public function __construct(Notification $model)
  {
    $this->model = $model;
  }
}
