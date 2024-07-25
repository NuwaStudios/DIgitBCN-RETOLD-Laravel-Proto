<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class E28_Craft extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'E28_crafts';

  protected $fillable = [
    'e62_short_description',
    'e53_historical',
    'e53_contemporary',
    'e42_video_url',
    'e55_craft_type_category',
    'e55_craft_type_nature',
    'tools_obtained',
    'installations_obtained',
    'materials_obtained',
    'materials_obtained_natural',
    'materials_obtained_bought',
    'raw_material_description',
    'reparation_description',
    'process_working_area',
    'process_layout',
    'working_techniques',
    'is_decoration',
    'decoration_techniques',
    'decoration_motifs',
    'e42_image_url_decoration',
    'e42_video_url_decoration',
    'is_diverged',
    'diverged_changes',
    'diverged_reasons',
    'is_evolved',
    'evolved_process',
    'evolved_product',
    'evolved_reasons',
    'is_gaps',
    'gaps_basis',
    'gaps_process',
    'gaps_reasons',
    'best_practices',
    'best_practices_disposal_of_waste',
    'best_practices_use_after_disposal',
    'e35_title_english',
    'e35_title_translated',
    'finished_product_description',
    'is_finished_product_practical_use',
    'finished_product_practical_use_description',
    'is_finished_product_decorative_use',
    'finished_product_decorative_use_description',
    'is_finished_product_experimental_use',
    'finished_product_experimental_use_description',
    'is_finished_product_educational_use',
    'finished_product_educational_use_description',
    'finished_product_durability',
    'finished_product_distributed',
    'finished_product_reachability',
    'cover_image_file_id',
    'e52_timespan_id',
    'e73_document_id',
    'finished_product_file_id'
  ];

  public function getForeignKeyNames()
  {
    return [
      'cover_image_file_id',
      'e52_timespan_id',
      'e73_document_id',
      'finished_product_file_id'
    ];
  }


  public function timespan()
  {
    return $this->belongsTo(E52_Timespan::class, 'e52_timespan_id');
  }

  public function document()
  {
    return $this->belongsTo(E73_Document::class, 'e73_document_id');
  }

  public function persons()
  {
    return $this->belongsToMany(E21_Person::class, 'craft_person', 'e28_craft_id', 'e21_person_id');
  }

  public function phases()
  {
    return $this->hasMany(Phase::class, 'e28_craft_id');
  }

  public function tools()
  {
    return $this->hasMany(Tool::class, 'e28_craft_id');
  }

  public function installations()
  {
    return $this->hasMany(Installation::class, 'e28_craft_id');
  }

  public function materials()
  {
    return $this->hasMany(Material::class, 'e28_craft_id');
  }

  public function coverImage()
  {
    return $this->belongsTo(File::class, 'cover_image_file_id');
  }

  public function finishedProductImage()
  {
    return $this->belongsTo(File::class, 'finished_product_file_id');
  }
}
