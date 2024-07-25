<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class DismantlingMember extends Model
{

  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'dismantling_members';


  protected $fillable = [
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
