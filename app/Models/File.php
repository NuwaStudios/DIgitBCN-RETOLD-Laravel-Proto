<?php

namespace App\Models;

use App\Traits\NullableForeignKeys;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
  use HasFactory;

  protected $table = 'files';

  protected $fillable = [
    'name',
    'path',
  ];

  public function component()
  {
    return $this->hasOne(Component::class, 'file_id');
  }

  public function tool()
  {
    return $this->hasOne(Tool::class, 'file_id');
  }

  public function installation()
  {
    return $this->hasOne(Installation::class, 'file_id');
  }

  public function material()
  {
    return $this->hasOne(Material::class, 'file_id');
  }

  public function phase()
  {
    return $this->hasOne(Phase::class, 'file_id');
  }
}
