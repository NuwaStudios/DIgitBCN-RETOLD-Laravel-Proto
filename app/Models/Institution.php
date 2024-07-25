<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class Institution extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'institutions';

  protected $fillable = [
    'name',
    'e74_organisation_id'
  ];

  public function getForeignKeyNames()
  {
    return [
      'e74_organisation_id'
    ];
  }

  public function organisation()
  {
    return $this->belongsTo(E74_Organisation::class, 'e74_organisation_id');
  }
}
