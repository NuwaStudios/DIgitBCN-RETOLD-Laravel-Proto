<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class E52_Timespan extends Model
{
  use HasFactory;

  protected $table = 'E52_timespans';

  protected $fillable = [
    'e61_timePrimitive_start',
    'e61_timePrimitive_end',
    'e61_timespan_start',
    'e61_timespan_end',
  ];

  public function documentationActivities()
  {
    return $this->hasMany(E7_DocumentationActivity::class, 'e52_timespan_id');
  }
  public function crafts()
  {
    return $this->hasMany(E28_Craft::class, 'e52_timespan_id');
  }
}
