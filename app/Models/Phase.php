<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
  use HasFactory;

  protected $table = 'phases';

  protected $fillable = [
    'techniques',
    'time',
    'materials',
    'tools',
    'e42_video_url',
    'file_id',
  ];


  public function craft()
  {
    return $this->belongsTo(E28_Craft::class, 'e28_craft_id');
  }

  public function file()
  {
    return $this->belongsTo(File::class, 'file_id');
  }
}
