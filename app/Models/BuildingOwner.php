<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class BuildingOwner extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'building_owners';


  protected $fillable = [
    'occupation',
    'family_history',
    'society_status',
    'year_occupation',
    'e21_person_id'
  ];

  public function getForeignKeyNames()
  {
    return [
      'e21_person_id'
    ];
  }

  public function person()
  {
    return $this->belongsTo(E21_Person::class, 'e21_person_id');
  }
}
