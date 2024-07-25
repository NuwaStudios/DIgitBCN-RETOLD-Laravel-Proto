<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class Material extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'materials';

  protected $fillable = [
    'e35_title_english',
    'e35_title_translated',
    'description',
    'e28_craft_id',
    'file_id',
  ];

  public function getForeignKeyNames()
  {
    return [
      'e28_craft_id',
    ];
  }

  public function craft()
  {
    return $this->belongsTo(E28_Craft::class, 'e28_craft_id');
  }

  public function file()
  {
    return $this->belongsTo(File::class, 'file_id');
  }
}
