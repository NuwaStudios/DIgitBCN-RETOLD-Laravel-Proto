<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\NullableForeignKeys;

class Crafter extends Model
{
  use HasFactory;
  use NullableForeignKeys;

  protected $table = 'crafters';

  protected $fillable = [
    'e41_appellation_contribution_role',
    'craft_isMainActivity',
    'craft_MainActivity',
    'craft_isMultiArtisan',
    'p17_motivation',
    'has_contacts',
    'contact_network_size',
    'preferred_workspace',
    'learned_from',
    'learned_person_context',
    'is_learned_apprenticeship_related',
    'learned_apprenticeship_related_subject',
    'is_learned_course_related',
    'learned_course_authority',
    'learned_course_subject',
    'is_historical_sources',
    'historical_sources_reference',
    'is_teach_craft',
    'teach_craft_where',
    'e21_person_id'
  ];

  public function getForeignKeyNames()
  {
    return [
      'e21_person_id'
    ];
  }

  public function person()
  {
    return $this->belongsTo(E21_Person::class, 'e21_person_id');
  }
}
