<?php

namespace App\Repositories;

use App\Enums\PersonType;
use App\Models\E21_Person;
use App\Models\Builder;
use App\Models\BuildingOwner;
use App\Models\Crafter;
use App\Models\DismantlingMember;
use App\Repositories\Interfaces\Eloquent\BaseRepository;
use Illuminate\Support\Facades\DB;

class PersonRepository extends BaseRepository
{

  protected $model, $builder, $buildingOwner, $crafter, $dismantlingMember;

  /**
   * UserRepository constructor.
   *
   * @param E21_Person $model
   */
  public function __construct(E21_Person $model, Builder $builder, BuildingOwner $buildingOwner, Crafter $crafter, DismantlingMember $dismantlingMember)
  {
    $this->model = $model;
    $this->builder = $builder;
    $this->buildingOwner = $buildingOwner;
    $this->crafter = $crafter;
    $this->dismantlingMember = $dismantlingMember;
  }

  public function getRelatedPersonTypeById(PersonType $type, $id)
  {
    switch ($type) {
      case PersonType::BUILDER:
        return $this->model->with(PersonType::BUILDER->value)->find('e21_person_id', $id);
        break;
      case PersonType::BUILDINGOWNER:
        return $this->model->with(PersonType::BUILDINGOWNER->value)->find('e21_person_id', $id);
        break;
      case PersonType::CRAFTER:
        return $this->model->with(PersonType::CRAFTER->value)->find('e21_person_id', $id);
        break;
      case PersonType::DISMANTLINGMEMBER:
        return $this->model->with(PersonType::DISMANTLINGMEMBER->value)->find('e21_person_id', $id);
        break;
      default:
        return null;
    }
  }

  public function getRelatedPersonsByType(PersonType $type)
  {
    switch ($type) {
      case PersonType::BUILDER:
        return $this->model->has(PersonType::BUILDER->value)->with(PersonType::BUILDER->value)->get();
        break;
      case PersonType::BUILDINGOWNER:
        return $this->model->has(PersonType::BUILDINGOWNER->value)->with(PersonType::BUILDINGOWNER->value)->get();
        break;
      case PersonType::CRAFTER:
        return $this->model->has(PersonType::CRAFTER->value)->with(PersonType::CRAFTER->value)->get();
        break;
      case PersonType::DISMANTLINGMEMBER:
        return $this->model->has(PersonType::DISMANTLINGMEMBER->value)->with(PersonType::DISMANTLINGMEMBER->value)->get();
        break;
      default:
        return null;
    }
  }

  public function createRelatedPersonByType(PersonType $type, $attributes)
  {
    $newPerson = $this->model->create($attributes);

    switch ($type) {
      case PersonType::BUILDER:
        $associatedType = $this->builder->create($attributes);
        $newPerson->builder()->save($associatedType);
        break;
      case PersonType::BUILDINGOWNER:
        $associatedType = $this->buildingOwner->create($attributes);
        $newPerson->buildingOwner()->save($associatedType);
        break;
      case PersonType::CRAFTER:
        $associatedType = $this->crafter->create($attributes);
        $newPerson->crafter()->save($associatedType);
        break;
      case PersonType::DISMANTLINGMEMBER:
        $associatedType = $this->dismantlingMember->create($attributes);
        $newPerson->dismantlingMember()->save($associatedType);
        break;
      default:
        return null;
    }
    return $newPerson;
  }
}
