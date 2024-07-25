<?php

namespace App\Http\Services\Organisations;

use App\Models\E74_Organisation;
use App\Repositories\AddressRepository;
use App\Repositories\OrganisationRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;


class OrganisationService
{
  protected OrganisationRepository $organisationRepository;
  protected AddressRepository $addressRepository;
  protected UserRepository $userRepository;

  public function __construct(
    OrganisationRepository $organisationRepository,
    AddressRepository $addressRepository,
    UserRepository $userRepository
  )
  {
    $this->organisationRepository = $organisationRepository;
    $this->addressRepository = $addressRepository;
    $this->userRepository = $userRepository;
  }

  public function index(array $columns = ['*'])
  {
    return $this->organisationRepository->all($columns);
  }

  public function show(int $id)
  {
    $organisation = $this->organisationRepository->findById($id)->load('address', 'users');

    $users = [];
    foreach ($organisation->users as $user) {
        $userObj = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role->name
        ];
      array_push($users, $userObj);
    }

    $form = [
      'organisation' => [
        'id' => $organisation['id'],
        'e41_appellation_english' => $organisation['e41_appellation_english'],
        'e41_appellation_local' => $organisation['e41_appellation_local'],
        'e41_appellation_legal_local' => $organisation['e41_appellation_legal_local'],
        'e42_website' => $organisation['e42_website'],
        'institution' => $organisation['institution'],

        'address' => [
          'e41_street' => $organisation['address']['e41_street'],
          'e41_city' => $organisation['address']['e41_city'],
          'e41_postcode' => $organisation['address']['e41_postcode'],
          'e53_country' => $organisation['address']['e53_country'],
        ],

        'users' => $users
      ]
    ];

    return $form;
  }

  public function create(Request $request)
  {
    $organisationDTO = $request['organisation'];

    $organisation = $this->organisationRepository->create($organisationDTO);
    $address = $this->addressRepository->create($organisationDTO['address']);
    $organisation->address()->associate($address)->save();

    return $organisation;
  }

  public function update(Request $request, int $id)
  {
    $organisation = $this->organisationRepository->findById($id);

    $this->organisationRepository->update($id, $request['organisation']);
    $this->addressRepository->update($organisation->address->id, $request['organisation']['address']);

    if (isset($request['organisation']['users'])) {
      foreach ($organisation->users as $user) {
        $user->organisation()->dissociate();
        $user->save();
      }

      foreach ($request['organisation']['users'] as $user) {
        $user = $this->userRepository->findById($user['id']);
        $organisation->users()->save($user);
      }
    }

    return $organisation;
  }
}
