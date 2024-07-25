<?php

namespace App\Models;

use App\Traits\NullableForeignKeys;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    use HasFactory;
    use NullableForeignKeys;

    protected $table = 'buildings';

    protected $fillable = [
      'assessor',
      'assessment_year',
      'building_url',
      'source_type',
      'construction_year',
      'cultural_group',
      'time_period',
      'owner_name',
      'owner_occupation',
      'owner_family_history',
      'owner_society_status',
      'owner_year_of_occupation',
      'building_part_of',
      'original_environment',
      'original_environment_city',
      'original_environment_village',
      'original_environment_household',
      'original_environment_household_location',
      'surroundings',
      'soil_condition',
      'vegetation',
      'climate',
      'light_conditions',
      'original_function',
      'original_function_residential',
      'original_function_non_residential',
      'original_function_annex',
      'building_use',
      'building_use_residential',
      'building_use_non_residential',
      'building_use_annex',
      'acquisition_mode',
      'dismantling_year',
      'dismantling_description',
      'museum_reason',
      'is_built_on_site',
      'building_museum_part_of',
      'registration_number',
      'building_museum_part_of_type',
      'building_museum_part_of_name',
      'building_museum_part_of_file',
      'realisation',
      'builder_construction_year',
      'is_diversion',
      'diversion_reason',
      'is_divergent',
      'divergent_reason',
      'builder_organisation_id',
      'e53_address_id',
      'building_owner_id',
      'e73_document_id',
      'dmodel_file_id',
      'aerialPhotoWithinHouseholdOriginal_file_id',
      'aerialPhotoWithinHousehold_file_id',
      'aerialPhotoWithinMuseum_file_id',
    ];

  public function getForeignKeyNames()
  {
    return [
      'e53_address_id',
      'building_owner_id',
      'e73_document_id',
      'dmodel_file_id',
      'aerialPhotoWithinHouseholdOriginal_file_id',
      'aerialPhotoWithinHousehold_file_id',
      'aerialPhotoWithinMuseum_file_id',
    ];
  }

  public function address()
  {
    return $this->belongsTo(E53_Address::class, 'e53_address_id');
  }

  public function components()
  {
    return $this->hasMany(Component::class, 'building_id');
  }

  public function document()
  {
    return $this->belongsTo(E73_Document::class, 'e73_document_id');
  }

  public function builderOrganisation()
  {
    return $this->belongsTo(E74_Organisation::class, 'builder_organisation_id');
  }

  public function aerialPhotoWithinHouseholdOriginal()
  {
    return $this->belongsTo(File::class, 'aerialPhotoWithinHouseholdOriginal_file_id');
  }

  public function aerialPhotoWithinHousehold()
  {
    return $this->belongsTo(File::class, 'aerialPhotoWithinHousehold_file_id');
  }

  public function aerialPhotoWithinMuseum()
  {
    return $this->belongsTo(File::class, 'aerialPhotoWithinMuseum_file_id');
  }

  public function dModel()
  {
    return $this->belongsTo(File::class, 'dmodel_file_id');
  }
}
