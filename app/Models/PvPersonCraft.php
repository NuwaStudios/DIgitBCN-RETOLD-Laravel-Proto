<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;


class PvPersonCraft extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'pv_personcraft';

  protected $fillable = [
    'e21_person_id',
    'e28_craft_id',
  ];

  public function person()
  {
    return $this->belongsTo(E21_Person::class, 'e21_person_id');
  }

  public function craft()
  {
    return $this->belongsTo(E28_Craft::class, 'e28_craft_id');
  }
}
