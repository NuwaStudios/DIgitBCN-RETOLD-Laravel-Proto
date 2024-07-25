<?php

namespace App\Http\Services\FormServices\BuildingFormServices;

use App\Repositories\AddressRepository;
use App\Repositories\BuildingRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\DocumentRepository;
use App\Repositories\OrganisationRepository;
use App\Repositories\PersonRepository;

class ReadBuildingFormService
{
  protected DocumentRepository $documentRepository;
  protected PersonRepository $personRepository;
  protected OrganisationRepository $organisationRepository;
  protected AddressRepository $addressRepository;
  protected BuildingRepository $buildingRepository;
  protected ComponentRepository $componentRepository;

  public function __construct(
    DocumentRepository $documentRepository,
    PersonRepository $personRepository,
    OrganisationRepository $organisationRepository,
    AddressRepository $addressRepository,
    BuildingRepository $buildingRepository,
    ComponentRepository $componentRepository
  ) {
    $this->documentRepository = $documentRepository;
    $this->personRepository = $personRepository;
    $this->organisationRepository = $organisationRepository;
    $this->addressRepository = $addressRepository;
    $this->buildingRepository = $buildingRepository;
    $this->componentRepository = $componentRepository;
  }

  public function index()
  {
    return $this->documentRepository->getAllBuildingDocuments();
  }

  public function show($id)
  {
    $document = $this->documentRepository->findById($id);
//    $buildingForm = $document->load(
//      'timespan',
//      'building',
//      'building.address',
//      'building.components',
//      'building.dModel',
//      'building.aerialPhotoWithinHouseholdOriginal',
//      'building.aerialPhotoWithinHousehold',
//      'building.aerialPhotoWithinMuseum',
//    );
    // TODO: 'building.builderOrganisation', 'building.documentations', 'organisationDocumentalist'
    return $this->mapToContext($document);
  }

  public function mapToContext($buildingForm)
  {
    $aerialPhotoWithinHouseholdOriginal = $buildingForm['building']['aerialPhotoWithinHouseholdOriginal'] ? $buildingForm['building']['aerialPhotoWithinHouseholdOriginal']['name'] : null;
    $aerialPhotoWithinHousehold = $buildingForm['building']['aerialPhotoWithinHousehold'] ? $buildingForm['building']['aerialPhotoWithinHousehold']['name'] : null;
    $aerialPhotoWithinMuseum = $buildingForm['building']['aerialPhotoWithinMuseum'] ? $buildingForm['building']['aerialPhotoWithinMuseum']['name'] : null;
    $dModel = $buildingForm['building']['dModel'] ? $buildingForm['building']['dModel']['name'] : null;

    return [
      'documenters' => [
        'document' => [
          'e35_title_english' => $buildingForm['e35_title_english'],
          'e35_title_translated' => $buildingForm['e35_title_translated'],
          'e56_language' => $buildingForm['e56_language'],
          'e53_country' => $buildingForm['e53_country'],
          'timespan' => [
            'e61_timespan_start' => $buildingForm['timespan']['e61_timespan_start'],
            'e61_timespan_end' => $buildingForm['timespan']['e61_timespan_end']
          ],
          'organisationOwner' => $buildingForm['organisationOwner'],
          'is_public' => $buildingForm['is_public'] == 1,
        ],
      ],
      'sourceMaterial' => [
        'document' => [
          'organisationDocumentalist' => $buildingForm['organisationDocumentalist']
        ],
        'building' => [
          'address' => [
            'e41_street' => $buildingForm['building']['address']['e41_street'],
            'e41_county' => $buildingForm['building']['address']['e41_county'],
            'e41_city' => $buildingForm['building']['address']['e41_city'],
            'e41_postcode' => $buildingForm['building']['address']['e41_postcode'],
            'e53_country' => $buildingForm['building']['address']['e53_country'],
            'coordinates_lat' => $buildingForm['building']['address']['coordinates_lat'],
            'coordinates_lng' => $buildingForm['building']['address']['coordinates_lng']
          ],
          'assessor' => $buildingForm['building']['assessor'],
          'assessment_year' => $buildingForm['building']['assessment_year'],
          'source_type' => $buildingForm['building']['source_type'],
          'building_url' => $buildingForm['building']['building_url'],
        ],
      ],
      'inhabitants' => [
        'building' => [
          'construction_year' => $buildingForm['building']['construction_year'],
          'cultural_group' => $buildingForm['building']['cultural_group'],
          'time_period' => $buildingForm['building']['time_period'],
          'owner_name' => $buildingForm['building']['owner_name'],
          'owner_occupation' => $buildingForm['building']['owner_occupation'],
          'owner_family_history' => $buildingForm['building']['owner_family_history'],
          'owner_society_status' => $buildingForm['building']['owner_society_status'],
          'owner_year_of_occupation' => $buildingForm['building']['owner_year_of_occupation'],
          'building_part_of' => $buildingForm['building']['building_part_of'],
          'original_environment' => $buildingForm['building']['original_environment'],
          'original_environment_city' => $buildingForm['building']['original_environment_city'],
          'original_environment_village' => $buildingForm['building']['original_environment_village'],
          'original_environment_household' => $buildingForm['building']['original_environment_household'],
          'original_environment_household_location' => $buildingForm['building']['original_environment_household_location'],
          'aerialPhotoWithinHouseholdOriginal' => $aerialPhotoWithinHouseholdOriginal,
          'surroundings' => $buildingForm['building']['surroundings'],
          'soil_condition' => $buildingForm['building']['soil_condition'],
          'vegetation' => $buildingForm['building']['vegetation'],
          'climate' => $buildingForm['building']['climate'],
          'light_conditions' => $buildingForm['building']['light_conditions'],
          'original_function' => $buildingForm['building']['original_function'],
          'original_function_residential' => $buildingForm['building']['original_function_residential'],
          'original_function_non_residential' => $buildingForm['building']['original_function_non_residential'],
          'original_function_annex' => $buildingForm['building']['original_function_annex'],
          'building_use' => $buildingForm['building']['building_use'],
          'building_use_residential' => $buildingForm['building']['building_use_residential'],
          'building_use_non_residential' => $buildingForm['building']['building_use_non_residential'],
          'building_use_annex' => $buildingForm['building']['building_use_annex'],
          'acquisition_mode' => $buildingForm['building']['acquisition_mode'],
          'dismantling_year' => $buildingForm['building']['dismantling_year'],
          'dismantling_description' => $buildingForm['building']['dismantling_description'],
        ],
        'notTranslocatedComponents' => $buildingForm['building']['components'],
        'removed_components' => []
      ],
      'constructionProcess' => [
        'building' => [
          'museum_reason' => $buildingForm['building']['museum_reason'],
          'is_built_on_site' => $buildingForm['building']['is_built_on_site'] == 1,
          'building_museum_part_of' => $buildingForm['building']['building_museum_part_of'],
          'building_museum_part_of_type' => $buildingForm['building']['building_museum_part_of_type'],
          'building_museum_part_of_name' => $buildingForm['building']['building_museum_part_of_name'],
          'aerialPhotoWithinHousehold' => $aerialPhotoWithinHousehold,
          'aerialPhotoWithinMuseum' => $aerialPhotoWithinMuseum,
          'registration_number' => $buildingForm['building']['registration_number'],
          'realisation' => $buildingForm['building']['realisation'],
          'documentations' => [], // TODO
          'builder_construction_year' => $buildingForm['building']['builder_construction_year'],
          'builderOrganisation' => $buildingForm['building']['builderOrganisation'],
          'is_diversion' => $buildingForm['building']['is_diversion'] == 1,
          'diversion_reason' => $buildingForm['building']['diversion_reason'],
          'is_divergent' => $buildingForm['building']['is_divergent'] == 1,
          'divergent_reason' => $buildingForm['building']['divergent_reason'],
        ],
      ],
      'dModel' => $dModel
    ];
  }
}
