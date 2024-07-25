<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    use HasFactory;

    protected $table = 'components';

    protected $fillable = [
        'name',
        'material',
        'manufacturing_technique',
        'dimensions',
        'building_id',
        'file_id',
    ];

  public function getForeignKeyNames()
  {
    return [
      'building_id',
      'file_id'
    ];
  }

    public function building()
    {
        return $this->belongsTo(Building::class, 'building_id');
    }

    public function file()
    {
        return $this->belongsTo(File::class, 'file_id');
    }
}
