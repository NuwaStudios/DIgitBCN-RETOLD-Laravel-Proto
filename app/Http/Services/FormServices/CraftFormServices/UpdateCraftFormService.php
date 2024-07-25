<?php

namespace App\Http\Services\FormServices\CraftFormServices;

use App\Repositories\AddressRepository;
use App\Repositories\CraftRepository;
use App\Repositories\DocumentationActivityRepository;
use App\Repositories\DocumentRepository;
use App\Repositories\FileRepository;
use App\Repositories\OrganisationRepository;
use App\Repositories\PersonRepository;
use App\Repositories\PhaseRepository;
use App\Repositories\TimespanRepository;
use App\Repositories\ToolRepository;
use App\Repositories\MaterialRepository;
use App\Repositories\InstallationRepository;
use Illuminate\Support\Facades\Auth;

class UpdateCraftFormService
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
  protected DocumentationActivityRepository $documentationActivityRepository;
  protected FileRepository $fileRepository;
  public function __construct(
    DocumentRepository     $documentRepository,
    PersonRepository       $personRepository,
    ToolRepository         $toolRepository,
    MaterialRepository     $materialRepository,
    InstallationRepository $installationRepository,
    TimespanRepository     $timespanRepository,
    OrganisationRepository $organisationRepository,
    AddressRepository      $addressRepository,
    PhaseRepository        $phaseRepository,
    CraftRepository        $craftRepository,
    DocumentationActivityRepository $documentationActivityRepository,
    FileRepository         $fileRepository
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
    $this->documentationActivityRepository = $documentationActivityRepository;
    $this->fileRepository = $fileRepository;
  }

  public function main($data, $id)
  {
    $document = $this->documentRepository->findById($id);

    $summary = $data->all()['summary'];
    $crafters = $data->input(['crafters']);
    $documenters = $data->all()['documenters'];
    $toolsAndMaterials = $data->all()['toolsAndMaterials'];
    $productionProcess = $data->all()['productionProcess'];
    $finishedProduct = $data->all()['finishedProduct'];

    $document = $this->updateFirstPart($document, $summary);
    $document = $this->updateSecondPart($document, $crafters);
    $document = $this->updateThirdPart($document, $documenters);
    $document = $this->updateFourthPart($document, $toolsAndMaterials);
    $document = $this->updateFifthPart($document, $productionProcess);
    $document = $this->updateSixthPart($document, $finishedProduct);

    return $document;
  }

  public function updateFirstPart($document, $summary)
  {
    $this->documentRepository->update($document->id, $summary['document']);
    $this->craftRepository->update($document->craft->id, $summary['craft']);
    $this->timespanRepository->update($document->craft->timespan->id, $summary['craft']['timespan']);

    if(isset($summary['craft']['e42_image_url'])) {
      $oldFile = $document->craft->coverImage;

      if($oldFile) {
        $document->craft->coverImage()->disassociate();
        $document->craft->save();
        $this->fileRepository->deleteFile($oldFile);
      }

      $file = $this->fileRepository->createFile($summary['craft']['e42_image_url'], 'images', 'cover_image');
      $document->craft->coverImage()->associate($file)->save();
    }

    return $document;
  }

  public function updateSecondPart($document, $crafters)
  {
    if (isset($crafters)) {
      foreach ($document->craft->persons as $person) {
        $document->craft->persons()->detach($person);
      }

      foreach ($crafters as $crafter) {
        $person = $this->personRepository->findById($crafter['person']['id']);
        $document->craft->persons()->save($person);
      }
    }

    return $document;
  }

  public function updateThirdPart($document, $documenters)
  {
    $this->documentRepository->update($document->id, $documenters['document']);
    $this->timespanRepository->update($document->timespan->id, $documenters['document']['timespan']);

    if(Auth::user()->role->name === 'admin') {
      if($documenters['document']['organisationOwner']) {
        $organisationOwner = $this->organisationRepository->findById($documenters['document']['organisationOwner']['id']);
        if($organisationOwner) {
          $document->organisationOwner()->associate($organisationOwner)->save();
        }
      }
    } else {
      $organisationOwner = $this->organisationRepository->findById(Auth::user()->organisation->id);
      if($organisationOwner) {
        $document->organisationOwner()->associate($organisationOwner)->save();
      }
    }

    if(Auth::user()->role->name === 'admin') {
      if($documenters['document']['organisationDocumentalist']) {
        $organisationDocumentalist = $this->organisationRepository->findById($documenters['document']['organisationDocumentalist']['id']);
        if($organisationDocumentalist) {
          $document->organisationDocumentalist()->associate($organisationDocumentalist)->save();
        }
      }
    } else {
      $organisationDocumentalist = $this->organisationRepository->findById(Auth::user()->organisation->id);
      if($organisationDocumentalist) {
        $document->organisationDocumentalist()->associate($organisationDocumentalist)->save();
      }
    }

    return $document;
  }

  public function updateFourthPart($document, $toolsAndMaterials)
  {
    $this->craftRepository->update($document->craft->id, $toolsAndMaterials);

    if (isset($toolsAndMaterials['tools_removed'])) {
      $toolsIdToRemove = $toolsAndMaterials['tools_removed'];
      foreach ($toolsIdToRemove as $toolId) {
        $tool = $this->toolRepository->findById($toolId);
        $tool->delete();
      }
    }

    if (isset($toolsAndMaterials['installations_removed'])) {
      $installationsIdToRemove = $toolsAndMaterials['installations_removed'];
      foreach ($installationsIdToRemove as $installationId) {
        $installation = $this->installationRepository->findById($installationId);
        $installation->delete();
      }
    }

    if (isset($toolsAndMaterials['materials_removed'])) {
      $materialsIdToRemove = $toolsAndMaterials['materials_removed'];
      foreach ($materialsIdToRemove as $materialId) {
        $material = $this->materialRepository->findById($materialId);
        $material->delete();
      }
    }

    if (isset($toolsAndMaterials['tools'])) {
      $tools = $toolsAndMaterials['tools'];
      foreach ($tools as $tool) {
        if (isset($tool['id'])) {
          $this->toolRepository->update($tool['id'], $tool);
        } else {
          $newTool = $this->toolRepository->create($tool);
          $document->craft->tools()->save($newTool);
        }
      }
    }

    if (isset($toolsAndMaterials['installations'])) {
      $installations = $toolsAndMaterials['installations'];
      foreach ($installations as $installation) {
        if (isset($installation['id'])) {
          $this->installationRepository->update($installation['id'], $installation);
        } else {
          $newInstallation = $this->installationRepository->create($installation);
          $document->craft->installations()->save($newInstallation);
        }
      }
    }

    if (isset($toolsAndMaterials['materials'])) {
      $materials = $toolsAndMaterials['materials'];
      foreach ($materials as $material) {
        if (isset($material['id'])) {
          $this->materialRepository->update($material['id'], $material);
        } else {
          $newMaterial = $this->materialRepository->create($material);
          $document->craft->materials()->save($newMaterial);
        }
      }
    }

    return $document;
  }

  public function updateFifthPart($document, $productionProcess)
  {
    $document->craft->update($productionProcess['craft']);

    if (isset($productionProcess['craft']['phases_removed'])) {
      $phasesIdToRemove = $productionProcess['craft']['phases_removed'];
      foreach ($phasesIdToRemove as $phaseId) {
        $phase = $this->phaseRepository->findById($phaseId);
        $phase->delete();
      }
    }

    if (isset($productionProcess['craft']['phases'])) {
      $phases = $productionProcess['craft']['phases'];
      foreach ($phases as $phase) {
        if (isset($phase['id'])) {
          $this->phaseRepository->update($phase['id'], $phase);
        } else {
          $newPhase = $this->phaseRepository->create($phase);
          $document->craft->phases()->save($newPhase);
        }
      }
    }

    return $document;
  }

  public function updateSixthPart($document, $finishedProduct)
  {
    $document->craft->update($finishedProduct['craft']);

    if(isset($finishedProduct['craft']['e42_image_url'])) {
      $oldFile = $document->craft->finishedProductImage;

      if($oldFile) {
        $document->craft->finishedProductImage()->disassociate();
        $document->craft->save();
        $this->fileRepository->deleteFile($oldFile);
      }

      $file = $this->fileRepository->createFile($finishedProduct['craft']['e42_image_url'], 'images', 'finished_product_image');
      $document->craft->finishedProductImage()->associate($file)->save();
    }

    return $document;
  }
}
