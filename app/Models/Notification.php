<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
  use HasFactory;

  protected $table='notifications';

  protected $fillable = [
    'organization_name',
    'requester_name',
    'requester_surname',
    'requester_email',
    'requester_observations'
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function notificationType()
  {
    return $this->belongsTo(NotificationType::class, 'notification_type_id');
  }
}
