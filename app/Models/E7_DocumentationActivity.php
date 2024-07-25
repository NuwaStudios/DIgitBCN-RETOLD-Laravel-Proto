<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class E7_DocumentationActivity extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'E7_documentation_activities';

  protected $fillable = [
    'p17_motivation',
    'e53_country',
    'e74_organisation_id',
    'e73_document_id',
    'e52_timespan_id',
  ];

  public function getForeignKeyNames()
  {
    return [
      'e74_organisation_id',
      'e73_document_id',
      'e52_timespan_id',
    ];
  }

  public function document()
  {
    return $this->belongsTo(E73_Document::class, 'e73_document_id');
  }

  public function timespan()
  {
    return $this->belongsTo(E52_Timespan::class, 'e52_timespan_id');
  }

  public function crafts()
  {
    return $this->hasMany(E28_Craft::class, 'e7_documentation_activity_id');
  }

  public function organisation()
  {
    return $this->belongsTo(E74_Organisation::class, 'e74_organisation_id');
  }
}
