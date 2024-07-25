<?php

namespace App\Http\Services\FormServices\CraftFormServices;

use App\Repositories\AddressRepository;
use App\Repositories\CraftRepository;
use App\Repositories\DocumentRepository;
use App\Repositories\InstallationRepository;
use App\Repositories\MaterialRepository;
use App\Repositories\OrganisationRepository;
use App\Repositories\PersonRepository;
use App\Repositories\PhaseRepository;
use App\Repositories\TimespanRepository;
use App\Repositories\ToolRepository;

class ReadCraftFormService
{

  protected DocumentRepository $documentRepository;
  protected PersonRepository $personRepository;
  protected ToolRepository $toolRepository;
  protected MaterialRepository $materialRepository;
  protected InstallationRepository $installationRepository;
  protected TimespanRepository $timespanRepository;
  protected OrganisationRepository $organisationRepository;
  protected AddressRepository $addressRepository;
  protected PhaseRepository $phaseRepository;
  protected CraftRepository $craftRepository;

  public function __construct(
    DocumentRepository $documentRepository,
    PersonRepository $personRepository,
    ToolRepository $toolRepository,
    MaterialRepository $materialRepository,
    InstallationRepository $installationRepository,
    TimespanRepository $timespanRepository,
    OrganisationRepository $organisationRepository,
    AddressRepository $addressRepository,
    PhaseRepository $phaseRepository,
    CraftRepository $craftRepository
  ) {
    $this->documentRepository = $documentRepository;
    $this->personRepository = $personRepository;
    $this->toolRepository = $toolRepository;
    $this->materialRepository = $materialRepository;
    $this->installationRepository = $installationRepository;
    $this->timespanRepository = $timespanRepository;
    $this->organisationRepository = $organisationRepository;
    $this->addressRepository = $addressRepository;
    $this->phaseRepository = $phaseRepository;
    $this->craftRepository = $craftRepository;
  }

  public function index()
  {
    return $this->documentRepository->getAllCraftDocuments();
  }

  public function show($id)
  {
    $document = $this->documentRepository->findById($id);
//    $craftForm = $document->load(
//      'organisationDocumentalist',
//      'timespan',
//      'organisationOwner',
//      'organisationOwner.address',
//      'craft',
//      'craft.materials',
//      'craft.tools',
//      'craft.installations',
//      'craft.timespan',
//      'craft.phases',
//      'craft.persons',
//      'craft.persons.crafter',
//      'craft.persons.addresses',
//      'craft.persons.timespan',
//    );
    return $this->mapToContext($document);
  }

  public function mapToContext($laravelObject)
  {
    $craftersObj = [];
    if (isset($laravelObject['craft']['persons'])) {
      foreach ($laravelObject['craft']['persons'] as $person) {
        $crafterObj = [
          'person' => [
            'id' => $person['id'],
            'e41_appellation_firstname' => $person['e41_appellation_firstname'],
            'e41_appellation_middlename' => $person['e41_appellation_middlename'],
            'e41_appellation_lastname' => $person['e41_appellation_lastname'],
            'e61_date_of_birth' => $person['e61_date_of_birth'],
            'address' => [
              'e42_email' => $person['addresses'][0]['e42_email'],
              'e42_phone' => $person['addresses'][0]['e42_phone'],
              'e41_street' => $person['addresses'][0]['e41_street'],
              'e41_city' => $person['addresses'][0]['e41_city'],
              'e41_postcode' => $person['addresses'][0]['e41_postcode'],
              'e53_country' => [
                'id' => $person['addresses'][0]['e53_country']
              ]
            ],
            'e53_nationality' => [
              'id' => $person['e53_nationality']
            ],
            'e42_website' => $person['e42_website'],
            'timespan' => [
              'e61_timePrimitive_start' => $person['timespan']['e61_timePrimitive_start'],
              'e61_timePrimitive_end' => $person['timespan']['e61_timePrimitive_end']
            ],
            'e41_appellation_occupation' => $person['e41_appellation_occupation'],
            'e41_appellation_contribution_role' => $person['crafter']['e41_appellation_contribution_role'],
            'craft_isMainActivity' => $person['crafter']['craft_isMainActivity'] == 1,
            'craft_MainActivity' => $person['crafter']['craft_MainActivity'],
            'craft_isMultiArtisan' => $person['crafter']['craft_isMultiArtisan'] == 1,
            'p17_motivation' => $person['crafter']['p17_motivation'],
            'has_contacts' => $person['crafter']['has_contacts'] == 1,
            'contact_network_size' => $person['crafter']['contact_network_size'],
            'preferred_workspace' => $person['crafter']['preferred_workspace'],
            'learned_from' => $person['crafter']['learned_from'],
            'learned_person_context' => $person['crafter']['learned_person_context'],
            'is_learned_apprenticeship_related' => $person['crafter']['is_learned_apprenticeship_related'] == 1,
            'learned_apprenticeship_related_subject' => $person['crafter']['learned_apprenticeship_related_subject'],
            'is_learned_course_related' => $person['crafter']['is_learned_course_related'] == 1,
            'learned_course_authority' => $person['crafter']['learned_course_authority'],
            'learned_course_subject' => $person['crafter']['learned_course_subject'],
            'is_historical_sources' => $person['crafter']['is_historical_sources'] == 1,
            'historical_sources_reference' => $person['crafter']['historical_sources_reference'],
            'is_teach_craft' => $person['crafter']['is_teach_craft'] == 1,
            'teach_craft_where' => $person['crafter']['teach_craft_where'],
            'e21_person_id' => $person['crafter']['e21_person_id']
          ]
        ];
        array_push($craftersObj, $crafterObj);
      }
    }

    $toolsObj = [];
    if (isset($laravelObject['craft']['tools'])) {
      foreach ($laravelObject['craft']['tools'] as $tool) {
        $toolObj = [
          'id' => $tool['id'],
          'e35_title_english' => $tool['e35_title_english'],
          'e35_title_translated' => $tool['e35_title_translated'],
          'e42_image_url' => $tool['e42_image_url'],
          'purpose' => $tool['purpose'],
          'usage' => $tool['usage']
        ];
        array_push($toolsObj, $toolObj);
      }
    }

    $installationsObj = [];
    if (isset($laravelObject['craft']['installations'])) {
      foreach ($laravelObject['craft']['installations'] as $installation) {
        $installationObj = [
          'id' => $installation['id'],
          'e35_title_english' => $installation['e35_title_english'],
          'e35_title_translated' => $installation['e35_title_translated'],
          'e42_image_url' => $installation['e42_image_url'],
          'purpose' => $installation['purpose'],
          'usage' => $installation['usage']
        ];
        array_push($installationsObj, $installationObj);
      }
    }

    $materialsObj = [];
    if (isset($laravelObject['craft']['materials'])) {
      foreach ($laravelObject['craft']['materials'] as $material) {
        $materialObj = [
          'id' => $material['id'],
          'e35_title_english' => $material['e35_title_english'],
          'e35_title_translated' => $material['e35_title_translated'],
          'e42_image_url' => $material['e42_image_url'],
          'description' => $material['description']
        ];
        array_push($materialsObj, $materialObj);
      }
    }

    $processPhasesObj = [];
    if (isset($laravelObject['craft']['phases'])) {
      foreach ($laravelObject['craft']['phases'] as $phase) {
        $phaseObj = [
          'id' => $phase['id'],
          'techniques' => $phase['techniques'],
          'time' => $phase['time'],
          'materials' => $phase['materials'],
          'tools' => $phase['tools'],
          'e42_image_url' => $phase['e42_image_url'],
          'e42_video_url' => $phase['e42_video_url']
        ];
        array_push($processPhasesObj, $phaseObj);
      }
    }

    $coverImage = $laravelObject['craft']['coverImage'] ? $laravelObject['craft']['coverImage']['name'] : null;
    $finishedProductImage = $laravelObject['craft']['finishedProductImage'] ? $laravelObject['craft']['finishedProductImage']['name'] : null;

    $reactContextObj = [
      'id' => $laravelObject['id'],
      'summary' => [
        'document' => [
          'e35_title' => $laravelObject['e35_title'],
          'e35_title_english' => $laravelObject['e35_title_english'],
          'e35_title_translated' => $laravelObject['e35_title_translated'],
          'e56_language' => $laravelObject['e56_language']
        ],

        'craft' => [
          'e55_craft_type_nature' => $laravelObject['craft']['e55_craft_type_nature'],
          'e55_craft_type_category' => $laravelObject['craft']['e55_craft_type_category'],
          'e62_short_description' => $laravelObject['craft']['e62_short_description'],
          'e53_historical' => $laravelObject['craft']['e53_historical'],
          'e53_contemporary' => $laravelObject['craft']['e53_contemporary'],
          'e42_image_url' => $coverImage,
          'e42_video_url' => $laravelObject['craft']['e42_video_url'],

          'timespan' => [
            'e61_timePrimitive_start' => $laravelObject['craft']['timespan']['e61_timePrimitive_start'],
            'e61_timePrimitive_end' => $laravelObject['craft']['timespan']['e61_timePrimitive_end'],
          ]
        ]
      ],
      'crafters' => $craftersObj,
      'documenters' => [
        'document' => [
          'timespan' => [
            'e61_timespan_start' => $laravelObject['timespan']['e61_timespan_start'],
            'e61_timespan_end' => $laravelObject['timespan']['e61_timespan_end'],
          ],
          'e53_country' => $laravelObject['e53_country'],
          'p17_motivation' => $laravelObject['p17_motivation'],
          'organisationOwner' => $laravelObject['organisationOwner'],
          'organisationDocumentalist' => $laravelObject['organisationDocumentalist'],
        ]
      ],
      'toolsAndMaterials' => [
        'tools' => $toolsObj,
        'tools_obtained' => $laravelObject['craft']['tools_obtained'],
        'tools_removed' => [],

        'installations' => $installationsObj,
        'installations_obtained' => $laravelObject['craft']['installations_obtained'],
        'installations_removed' => [],

        'materials' => $materialsObj,
        'materials_obtained' => $laravelObject['craft']['materials_obtained'],
        'materials_removed' => [],
        'materials_obtained_natural' => $laravelObject['craft']['materials_obtained_natural'],
        'materials_obtained_bought' => $laravelObject['craft']['materials_obtained_bought'],
      ],
      'productionProcess' => [
        'craft' => [
          'raw_material_description' => $laravelObject['craft']['raw_material_description'],
          'reparation_description' => $laravelObject['craft']['reparation_description'],
          'process_layout' => $laravelObject['craft']['process_layout'],
          'process_working_area' => $laravelObject['craft']['process_working_area'],
          'is_decoration' => $laravelObject['craft']['is_decoration'] == 1,
          'decoration_techniques' => $laravelObject['craft']['decoration_techniques'],
          'decoration_motifs' => $laravelObject['craft']['decoration_motifs'],
          'e42_image_url_decoration' => $laravelObject['craft']['e42_image_url_decoration'],
          'e42_video_url_decoration' => $laravelObject['craft']['e42_video_url_decoration'],
          'is_diverged' => $laravelObject['craft']['is_diverged'] == 1,
          'diverged_changes' => $laravelObject['craft']['diverged_changes'],
          'diverged_reasons' => $laravelObject['craft']['diverged_reasons'],
          'is_evolved' => $laravelObject['craft']['is_evolved'] == 1,
          'evolved_process' => $laravelObject['craft']['evolved_process'],
          'evolved_product' => $laravelObject['craft']['evolved_product'],
          'evolved_reasons' => $laravelObject['craft']['evolved_reasons'],
          'is_gaps' => $laravelObject['craft']['is_gaps'] == 1,
          'gaps_basis' => $laravelObject['craft']['gaps_basis'],
          'gaps_process' => $laravelObject['craft']['gaps_process'],
          'gaps_reasons' => $laravelObject['craft']['gaps_reasons'],
          'best_practices' => $laravelObject['craft']['best_practices'],
          'best_practices_disposal_of_waste' => $laravelObject['craft']['best_practices_disposal_of_waste'],
          'best_practices_use_after_disposal' => $laravelObject['craft']['best_practices_use_after_disposal'],
          'working_techniques' => $laravelObject['craft']['working_techniques'],

          'phases' => $processPhasesObj,
          'phases_removed' => [],
        ]
      ],
      'finishedProduct' => [
        'craft' => [
          'e35_title_english' => $laravelObject['craft']['e35_title_english'],
          'e35_title_translated' => $laravelObject['craft']['e35_title_translated'],
          'finished_product_description' => $laravelObject['craft']['finished_product_description'],
          'e42_image_url' => $finishedProductImage,
          'is_finished_product_practical_use' => $laravelObject['craft']['is_finished_product_practical_use'] == 1,
          'finished_product_practical_use_description' => $laravelObject['craft']['finished_product_practical_use_description'],
          'is_finished_product_decorative_use' => $laravelObject['craft']['is_finished_product_decorative_use'] == 1,
          'finished_product_decorative_use_description' => $laravelObject['craft']['finished_product_decorative_use_description'],
          'is_finished_product_experimental_use' => $laravelObject['craft']['is_finished_product_experimental_use'] == 1,
          'finished_product_experimental_use_description' => $laravelObject['craft']['finished_product_experimental_use_description'],
          'is_finished_product_educational_use' => $laravelObject['craft']['is_finished_product_educational_use'] == 1,
          'finished_product_educational_use_description' => $laravelObject['craft']['finished_product_educational_use_description'],
          'finished_product_durability' => $laravelObject['craft']['finished_product_durability'],
          'finished_product_distributed' => $laravelObject['craft']['finished_product_distributed'],
          'finished_product_reachability' => $laravelObject['craft']['finished_product_reachability'],
        ]
      ]
    ];
    return $reactContextObj;
  }
}
