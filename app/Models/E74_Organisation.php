<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;


class E74_Organisation extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'E74_organisations';

  protected $fillable = [
    'e41_appellation_english',
    'e41_appellation_local',
    'e41_appellation_legal_local',
    'e42_website',
    'e53_address_id',
    //    'e27_site_id',
    'institution_id',
  ];

  public function getForeignKeyNames()
  {
    return [
//      'e53_address_id',
      //      'e27_site_id',
      'institution_id',
    ];
  }

  public function address()
  {
    return $this->belongsTo(E53_Address::class, 'e53_address_id');
  }

  public function documents()
  {
    return $this->hasMany(E73_Document::class, 'e74_organisation_owner_id');
  }

  public function documentsAsDocumentalist()
  {
    return $this->hasMany(E73_Document::class, 'e74_organisation_documentalist_id');
  }

  // public function site()
  // {
  //   return $this->belongsTo(E27_Site::class, 'e27_site_id');
  // }

  public function institution()
  {
    return $this->belongsTo(Institution::class, 'institution_id');
  }

  public function users()
  {
    return $this->hasMany(User::class, 'e74_organisation_id');
  }
}
