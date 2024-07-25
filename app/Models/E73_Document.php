<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;
use Illuminate\Database\Eloquent\SoftDeletes;

class E73_Document extends Model
{
  use HasFactory;
  use NullableForeignKeys;
  use SoftDeletes;

  protected $table = 'E73_documents';

  protected $fillable = [
    'name',
    'description',
    'e35_title',
    'e35_title_english',
    'e35_title_translated',
    'e56_language',
    'e53_country',
    'attached_type',
    'is_public',
    'p17_motivation',
    'e73_self_document',
    'e74_organisation_owner_id',
    'e74_organisation_documentalist_id',
    'e52_timespan_id',
  ];

  public function getForeignKeyNames()
  {
    return [
      'e74_organisation_owner_id',
      'e74_organisation_documentalist_id',
      'e52_timespan_id',
    ];
  }

  public function organisationDocumentalist()
  {
    return $this->belongsTo(E74_Organisation::class, 'e74_organisation_documentalist_id');
  }

  public function organisationOwner()
  {
    return $this->belongsTo(E74_Organisation::class, 'e74_organisation_owner_id');
  }

  public function timespan()
  {
    return $this->belongsTo(E52_Timespan::class, 'e52_timespan_id');
  }

  public function craft()
  {
    return $this->hasOne(E28_Craft::class, 'e73_document_id');
  }

  public function building()
  {
    return $this->hasOne(Building::class, 'e73_document_id');
  }

  //  protected static function boot()
  //  {
  //    parent::boot();
  //
  //    static::creating(function ($model) {
  //      $model->setDefaultValues();
  //    });
  //  }
  //
  //  protected function setDefaultValues()
  //  {
  //    $this->attributes['field1'] = $this->attributes['field1'] ?? 'default_value1';
  //    $this->attributes['field2'] = $this->attributes['field2'] ?? 42;
  //    $this->attributes['field3'] = $this->attributes['field3'] ?? true;
  //  }
}
