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

class UpdateBuildingFormService
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

  public function main($data, $id)
  {
    $document = $this->documentRepository->findById($id);

    $documenters = $data->all()['documenters'];
    $sourceMaterial = $data->all()['sourceMaterial'];
    $inhabitants = $data->all()['inhabitants'];
    $constructionProcess = $data->all()['constructionProcess'];;
    $dModel = $data->file('dModel');

    $document = $this->updateFirstPart($document, $documenters);
    $document = $this->updateSecondPart($document, $sourceMaterial);
    $document = $this->updateThirdPart($document, $inhabitants);
    $document = $this->updateFourthPart($document, $constructionProcess);
    $document = $this->updateFifthPart($document, $dModel);

    return $document;
  }

  public function updateFirstPart($document, $documenters)
  {
    $this->documentRepository->update($document->id, $documenters['document']);
    $this->timespanRepository->update($document->timespan->id, $documenters['document']['timespan']);

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

  public function updateSecondPart($document, $sourceMaterial)
  {
    $this->documentRepository->update($document->id, $sourceMaterial['document']);
    $this->buildingRepository->update($document->building->id, $sourceMaterial['building']);
    $this->addressRepository->update($document->building->address->id, $sourceMaterial['building']['address']);

    if($sourceMaterial['document']['organisationDocumentalist']) {
      $organisationDocumentalist = $this->organisationRepository->findById($sourceMaterial['document']['organisationDocumentalist']['id']);
      if($organisationDocumentalist) {
        $document->organisationDocumentalist()->associate($organisationDocumentalist)->save();
      }
    }

    return $document;
  }

  public function updateThirdPart($document, $inhabitants)
  {
    $this->buildingRepository->update($document->building->id, $inhabitants['building']);

    if(isset($inhabitants['removed_components'])){
      $componentsIdToRemove = $inhabitants['removed_components'];
      foreach ($componentsIdToRemove as $componentId) {
        $component = $this->componentRepository->findById($componentId);

        $oldFile = $component->file();
        if ($oldFile) {
          $this->fileRepository->deleteFile($oldFile);
        }

        $component->delete();
      }
    }

    if(isset($inhabitants['notTranslocatedComponents'])) {
      $componentsDTO = $inhabitants['notTranslocatedComponents'];
      foreach ($componentsDTO as $componentDTO) {
        if (isset($componentDTO['id'])) {
          $this->componentRepository->update($componentDTO['id'], $componentDTO);

          if(isset($componentDTO['image'])) {
            $oldFile = $this->componentRepository->findById($componentDTO['id'])->file()->first();

            if ($oldFile) {
              $this->fileRepository->deleteFile($oldFile);
            }

            $file = $this->fileRepository->createFile($componentDTO['image'], 'images', 'component_image');
            $component->file()->associate($file)->save();
          }
        } else {
          $component = $this->componentRepository->create($componentDTO);
          $document->building->components()->save($component);

          if(isset($componentDTO['image'])) {
            $file = $this->fileRepository->createFile($componentDTO['image'], 'images', 'component_image');
            $component->file()->associate($file)->save();
          }
        }
      }
    }

    if(isset($inhabitants['building']['aerialPhotoWithinHouseholdOriginal'])) {
      $oldFile = $document->building->aerialPhotoWithinHouseholdOriginal;

      if($oldFile) {
        $document->building->aerialPhotoWithinHouseholdOriginal()->dissociate();
        $document->building->save();
        $this->fileRepository->deleteFile($oldFile);
      }

      $file = $this->fileRepository->createFile($inhabitants['building']['aerialPhotoWithinHouseholdOriginal'], 'images');
      $document->building->aerialPhotoWithinHouseholdOriginal()->associate($file)->save();
    }

    return $document;
  }

  public function updateFourthPart($document, $constructionProcess)
  {
    $this->buildingRepository->update($document->building->id, $constructionProcess['building']); // TODO: documentations

    if($constructionProcess['building']['builderOrganisation']) {
      $builderOrganisation = $this->organisationRepository->findById($constructionProcess['building']['builderOrganisation']['id']);
      if($builderOrganisation) {
        $document->building->builderOrganisation()->associate($builderOrganisation)->save();
      }
    }

    if(isset($constructionProcess['building']['aerialPhotoWithinHousehold'])) {
      $oldFile = $document->building->aerialPhotoWithinHousehold;

      if($oldFile) {
        $document->building->aerialPhotoWithinHousehold()->dissociate();
        $document->building->save();
        $this->fileRepository->deleteFile($oldFile);
      }

      $file = $this->fileRepository->createFile($constructionProcess['building']['aerialPhotoWithinHousehold'], 'images');
      $document->building->aerialPhotoWithinHousehold()->associate($file)->save();
    }

    if(isset($constructionProcess['building']['aerialPhotoWithinMuseum'])) {
      $oldFile = $document->building->aerialPhotoWithinMuseum;

      if($oldFile) {
        $document->building->aerialPhotoWithinMuseum()->dissociate();
        $document->building->save();
        $this->fileRepository->deleteFile($oldFile);
      }

      $file = $this->fileRepository->createFile($constructionProcess['building']['aerialPhotoWithinMuseum'], 'images');
      $document->building->aerialPhotoWithinMuseum()->associate($file)->save();
    }

    return $document;
  }

  public function updateFifthPart($document, $dModel)
  {
    if(isset($dModel)) {
      $oldFile = $document->building->dModel;

      if($oldFile) {
        $document->building->dModel()->dissociate();
        $document->building->save();
        $this->fileRepository->deleteFile($oldFile);
      }

      $file = $this->fileRepository->createFile($dModel, '3d_models');
      $document->building->dModel()->associate($file)->save();
    }

    return $document;
  }
}
