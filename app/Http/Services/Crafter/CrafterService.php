<?php

namespace App\Http\Services\Crafter;

use App\Enums\PersonType;
use App\Repositories\AddressRepository;
use App\Repositories\PersonRepository;
use App\Repositories\TimespanRepository;

class CrafterService
{
  protected PersonRepository $personRepository;
  protected TimespanRepository $timespanRepository;
  protected AddressRepository $addressRepository;

  public function __construct(
    PersonRepository   $crafterRepository,
    TimespanRepository $timespanRepository,
    AddressRepository  $addressRepository,
  ) {
    $this->personRepository = $crafterRepository;
    $this->timespanRepository = $timespanRepository;
    $this->addressRepository = $addressRepository;
  }

  public function index()
  {
    $craftersArr = $this->personRepository->getRelatedPersonsByType(PersonType::CRAFTER);

    $craftersObj = [];
    foreach ($craftersArr as $crafter) {
      $crafterObj = (object) [
        'person' => [
          'id' => $crafter['id'],
          'e41_appellation_firstname' => $crafter['e41_appellation_firstname'],
          'e41_appellation_middlename' => $crafter['e41_appellation_middlename'],
          'e41_appellation_lastname' => $crafter['e41_appellation_lastname'],
          'e61_date_of_birth' => $crafter['e61_date_of_birth'],
          'address' => [
            'e42_email' => $crafter['addresses'][0]['e42_email'],
            'e42_phone' => $crafter['addresses'][0]['e42_phone'],
            'e41_street' => $crafter['addresses'][0]['e41_street'],
            'e41_city' => $crafter['addresses'][0]['e41_city'],
            'e41_postcode' => $crafter['addresses'][0]['e41_postcode'],
            'e53_country' => [
              'id' => $crafter['addresses'][0]['e53_country']
            ]
          ],
          'e53_nationality' => [
            'id' => $crafter['e53_nationality']
          ],
          'e42_website' => $crafter['e42_website'],
          'timespan' => [
            'e61_timespan_start' => $crafter['timespan']['e61_timespan_start'],
            'e61_timespan_end' => $crafter['timespan']['e61_timespan_end']
          ],
          'e41_appellation_occupation' => $crafter['e41_appellation_occupation'],
          'e41_appellation_contribution_role' => $crafter['crafter']['e41_appellation_contribution_role'],
          'craft_isMainActivity' => $crafter['crafter']['craft_isMainActivity'] == 1,
          'craft_MainActivity' => $crafter['crafter']['craft_MainActivity'],
          'craft_isMultiArtisan' => $crafter['crafter']['craft_isMultiArtisan'] == 1,
          'p17_motivation' => $crafter['crafter']['p17_motivation'],
          'has_contacts' => $crafter['crafter']['has_contacts'] == 1,
          'contact_network_size' => $crafter['crafter']['contact_network_size'],
          'preferred_workspace' => $crafter['crafter']['preferred_workspace'],
          'learned_from' => $crafter['crafter']['learned_from'],
          'learned_person_context' => $crafter['crafter']['learned_person_context'],
          'is_learned_apprenticeship_related' => $crafter['crafter']['is_learned_apprenticeship_related'] == 1,
          'learned_apprenticeship_related_subject' => $crafter['crafter']['learned_apprenticeship_related_subject'],
          'is_learned_course_related' => $crafter['crafter']['is_learned_course_related'] == 1,
          'learned_course_authority' => $crafter['crafter']['learned_course_authority'],
          'learned_course_subject' => $crafter['crafter']['learned_course_subject'],
          'is_historical_sources' => $crafter['crafter']['is_historical_sources'] == 1,
          'historical_sources_reference' => $crafter['crafter']['historical_sources_reference'],
          'is_teach_craft' => $crafter['crafter']['is_teach_craft'] == 1,
          'teach_craft_where' => $crafter['crafter']['teach_craft_where'],
          'e21_person_id' => $crafter['crafter']['e21_person_id']
        ]
      ];
      array_push($craftersObj, $crafterObj);
    }
    return $craftersObj;
  }

  public function create($crafter)
  {
    $crafterDTO = $crafter['person'];

    $crafter = $this->personRepository->createRelatedPersonByType(PersonType::CRAFTER, $crafterDTO);

    $address = $this->addressRepository->create($crafterDTO['address']);

    $timespan = $this->timespanRepository->create($crafterDTO['timespan']);

    // Crafter related objects
    $crafter->addresses()->save($address);
    $crafter->timespan()->associate($timespan)->save();

    return $crafter;
  }
}
