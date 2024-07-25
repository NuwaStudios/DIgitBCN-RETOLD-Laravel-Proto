<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class E21_Person extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'E21_persons';

  protected $fillable = [
    'e41_appellation_firstname',
    'e41_appellation_middlename',
    'e41_appellation_lastname',
    'e41_appellation_occupation',
    'e42_website',
    'e61_date_of_birth',
    'e53_nationality',
    'e52_timespan_id',
    'user_id',
    'e74_organisation_id'
  ];

  public function getForeignKeyNames()
  {
    return [
      'e52_timespan_id',
      'user_id',
      'e74_organisation_id'
    ];
  }

  public function organisation()
  {
    return $this->belongsTo(E74_Organisation::class, 'e74_organisation_id');
  }

  public function documents()
  {
    return $this->hasMany(E73_Document::class, 'e74_organisation_documentalist_id');
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function timespan()
  {
    return $this->belongsTo(E52_Timespan::class, 'e52_timespan_id');
  }

  public function addresses()
  {
    return $this->hasMany(E53_Address::class, 'e21_person_id');
  }

  public function crafts()
  {
    return $this->belongsToMany(E28_Craft::class, 'craft_person', 'e21_person_id', 'e28_craft_id');
  }

  //people

  public function builder()
  {
    return $this->hasOne(Builder::class, 'e21_person_id');
  }

  public function documenter()
  {
    return $this->hasOne(Documenter::class, 'e21_person_id');
  }

  public function crafter()
  {
    return $this->hasOne(Crafter::class, 'e21_person_id');
  }

  public function dismantlingMember()
  {
    return $this->hasOne(DismantlingMember::class, 'e21_person_id');
  }
}
