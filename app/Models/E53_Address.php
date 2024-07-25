<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class E53_Address extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'E53_addresses';

  protected $fillable = [
    'e41_street',
    'e41_city',
    'e41_postcode',
    'e41_county',
    'e42_phone',
    'e42_email',
    'e53_country',
    'e21_person_id',
    'coordinates_lat',
    'coordinates_lng'
  ];

  public function getForeignKeyNames()
  {
    return [
      'e21_person_id',
    ];
  }
  public function person()
  {
    return $this->belongsTo(E21_Person::class, 'e21_person_id');
  }

  public function organisation()
  {
    return $this->belongsTo(E74_Organisation::class, 'e74_organisation_id');
  }

  public function building()
  {
    return $this->hasOne(Building::class, 'e53_address_id');
  }
}
