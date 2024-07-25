<?php

namespace App\Http\Services\FormServices\BuildingFormServices;

use App\Repositories\AddressRepository;
use App\Repositories\BuildingRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\DocumentRepository;
use App\Repositories\FileRepository;
use App\Repositories\OrganisationRepository;
use App\Repositories\PersonRepository;
use App\Repositories\TimespanRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

class CreateBuildingFormService
{

  protected DocumentRepository $documentRepository;
  protected PersonRepository $personRepository;
  protected OrganisationRepository $organisationRepository;
  protected AddressRepository $addressRepository;
  protected BuildingRepository $buildingRepository;
  protected ComponentRepository $componentRepository;
  protected TimespanRepository $timespanRepository;
  protected FileRepository $fileRepository;

  public function __construct(
    DocumentRepository $documentRepository,
    PersonRepository $personRepository,
    OrganisationRepository $organisationRepository,
    AddressRepository $addressRepository,
    BuildingRepository $buildingRepository,
    ComponentRepository $componentRepository,
    TimespanRepository $timespanRepository,
    FileRepository $fileRepository
  ) {
    $this->documentRepository = $documentRepository;
    $this->personRepository = $personRepository;
    $this->organisationRepository = $organisationRepository;
    $this->addressRepository = $addressRepository;
    $this->buildingRepository = $buildingRepository;
    $this->componentRepository = $componentRepository;
    $this->timespanRepository = $timespanRepository;
    $this->fileRepository = $fileRepository;
  }

  public function main($data)
  {
    $documenters = $data->all()['documenters'];
    $sourceMaterial = $data->all()['sourceMaterial'];
    $inhabitants = $data->all()['inhabitants'];
    $constructionProcess = $data->all()['constructionProcess'];;
    $dModel = $data->file('dModel');

    $document = $this->createFirstPart($documenters);
    $document = $this->createSecondPart($document, $sourceMaterial);
    $document = $this->createThirdPart($document, $inhabitants);
    $document = $this->createFourthPart($document, $constructionProcess);
    $document = $this->createFifthPart($document, $dModel);

    return $document;
  }

  public function createFirstPart($documenters)
  {
    $document = $this->documentRepository->create($documenters['document']);

    $timespan = $this->timespanRepository->create($documenters['document']['timespan']);
    $document->timespan()->associate($timespan)->save();

    if(Auth::user()->role->name === 'admin') {
      if ($documenters['document']['organisationOwner']) {
        $organisationOwner = $this->organisationRepository->findById($documenters['document']['organisationOwner']['id']);
        if ($organisationOwner) {
          $document->organisationOwner()->associate($organisationOwner)->save();
        }
      }
    } else {
      $organisationOwner = $this->organisationRepository->findById(Auth::user()->organisation->id);
      if($organisationOwner) {
        $document->organisationOwner()->associate($organisationOwner)->save();
      }
    }

    return $document;
  }

  public function createSecondPart($document, $sourceMaterial)
  {
    $document->update($sourceMaterial['document']);
    $building = $this->buildingRepository->create($sourceMaterial['building']);
    $document->building()->save($building);

    $address = $this->addressRepository->create($sourceMaterial['building']['address']);
    $document->building->address()->associate($address)->save();

    if($sourceMaterial['document']['organisationDocumentalist']) {
      $organisationDocumentalist = $this->organisationRepository->findById($sourceMaterial['document']['organisationDocumentalist']['id']);
      if($organisationDocumentalist) {
        $document->organisationDocumentalist()->associate($organisationDocumentalist)->save();
      }
    }

    return $document;
  }

  public function createThirdPart($document, $inhabitants)
  {
    $document->building->update($inhabitants['building']);

    if(isset($inhabitants['notTranslocatedComponents'])) {
      $componentsDTO = $inhabitants['notTranslocatedComponents'];
      foreach ($componentsDTO as $componentDTO) {
        $component = $this->componentRepository->create($componentDTO);
        $document->building->components()->save($component);

        if(isset($componentDTO['image'])) {
          $file = $this->fileRepository->createFile($componentDTO['image'], 'images', 'component_image');
          $component->file()->associate($file)->save();
        }
      }
    }

    if(isset($inhabitants['building']['aerialPhotoWithinHouseholdOriginal'])) {
      $file = $this->fileRepository->createFile($inhabitants['building']['aerialPhotoWithinHouseholdOriginal'], 'images');
      $document->building->aerialPhotoWithinHouseholdOriginal()->associate($file)->save();
    }

    return $document;
  }

  public function createFourthPart($document, $constructionProcess)
  {
    $document->building->update($constructionProcess['building']);
    if($constructionProcess['building']['builderOrganisation']) {
      $builderOrganisation = $this->organisationRepository->findById($constructionProcess['building']['builderOrganisation']['id']);
      if($builderOrganisation) {
        $document->building->builderOrganisation()->associate($builderOrganisation)->save();
      }
    }

    if(isset($constructionProcess['building']['aerialPhotoWithinHousehold'])) {
      $file = $this->fileRepository->createFile($constructionProcess['building']['aerialPhotoWithinHousehold'], 'images');
      $document->building->aerialPhotoWithinHousehold()->associate($file)->save();
    }

    if(isset($constructionProcess['building']['aerialPhotoWithinMuseum'])) {
      $file = $this->fileRepository->createFile($constructionProcess['building']['aerialPhotoWithinMuseum'], 'images');
      $document->building->aerialPhotoWithinMuseum()->associate($file)->save();
    }

    // TODO: documentations

    return $document;
  }

  public function createFifthPart($document, $dModel)
  {
    if(isset($dModel)) {
      $file = $this->fileRepository->createFile($dModel, '3d_models');
      $document->building->dModel()->associate($file)->save();
    }

    return $document;
  }
}
