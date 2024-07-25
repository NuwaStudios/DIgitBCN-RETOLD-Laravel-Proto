<?php

namespace App\Http\Services\FormServices\CraftFormServices;

use App\Repositories\AddressRepository;
use App\Repositories\CraftRepository;
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

class CreateCraftFormService
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
  protected FileRepository $fileRepository;

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
    CraftRepository $craftRepository,
    FileRepository $fileRepository
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
    $this->fileRepository = $fileRepository;
  }

  public function main($data)
  {
    $summary = $data->all()['summary'];
    $crafters = $data->input(['crafters']);
    $documenters = $data->all()['documenters'];
    $toolsAndMaterials = $data->all()['toolsAndMaterials'];
    $productionProcess = $data->all()['productionProcess'];
    $finishedProduct = $data->all()['finishedProduct'];

    $document = $this->createFirstPart($summary);
    $document = $this->createSecondPart($document, $crafters);
    $document = $this->createThirdPart($document, $documenters);
    $document = $this->createFourthPart($document, $toolsAndMaterials);
    $document = $this->createFifthPart($document, $productionProcess);
    $document = $this->createSixthPart($document, $finishedProduct);

    return $document;
  }

  public function createFirstPart($summary)
  {
    $document = $this->documentRepository->create($summary['document']);

    $craft = $this->craftRepository->create($summary['craft']);
    $timespan = $this->timespanRepository->create($summary['craft']['timespan']);

    $document->timespan()->associate($timespan)->save();

    $document->craft()->save($craft);
    $document->craft->timespan()->associate($timespan)->save();

    if(isset($summary['craft']['e42_image_url'])) {
      $file = $this->fileRepository->createFile($summary['craft']['e42_image_url'], 'images', 'cover_image');
      $document->craft->coverImage()->associate($file)->save();
    }

    return $document;
  }

  public function createSecondPart($document, $crafters)
  {
    if(isset($crafters)) {
      foreach ($crafters as $crafter) {
        $person = $this->personRepository->findById($crafter['person']['id']);

        // Bidirectional relationship between Crafter and Craft
        if ($person) {
          $document->craft->persons()->save($person);
        }
      }
    }

    return $document;
  }

  public function createThirdPart($document, $documenters)
  {
    $document->update($documenters['document']);
    $document->timespan->update($documenters['document']['timespan']);

    if(Auth::user()->role->name === 'admin') {
      if($documenters['document']['organisationOwner']) {
        $organisationOwner = $this->organisationRepository->findById($documenters['document']['organisationOwner']['id']);
        if($organisationOwner) {
          $document->organisationOwner()->associate($organisationOwner)->save();
        }
      }
    } else {
      $organisation = $this->organisationRepository->findById(Auth::user()->organisation->id);
      if($organisation) {
        $document->organisationOwner()->associate($organisation)->save();
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

  public function createFourthPart($document, $toolsAndMaterials)
  {
    $document->craft->update($toolsAndMaterials);

    if (isset($toolsAndMaterials['tools'])) {
      $toolsDTO = $toolsAndMaterials['tools'];
      foreach ($toolsDTO as $toolDTO) {
        $tool = $this->toolRepository->create($toolDTO);
        $document->craft->tools()->save($tool);
      }
    }

    if (isset($toolsAndMaterials['installations'])) {
      $installationsDTO = $toolsAndMaterials['installations'];
      foreach ($installationsDTO as $installationDTO) {
        $installation = $this->installationRepository->create($installationDTO);
        $document->craft->installations()->save($installation);
      }
    }

    if (isset($toolsAndMaterials['materials'])) {
      $materialsDTO = $toolsAndMaterials['materials'];
      foreach ($materialsDTO as $materialDTO) {
        $material = $this->materialRepository->create($materialDTO);
        $document->craft->materials()->save($material);
      }
    }

    return $document;
  }

  public function createFifthPart($document, $productionProcess)
  {
    $document->craft->update($productionProcess['craft']);

    if (isset($productionProcess['craft']['phases'])) {
      $phasesDTO = $productionProcess['craft']['phases'];
      foreach ($phasesDTO as $phaseDTO) {
        $phase = $this->phaseRepository->create($phaseDTO);
        $document->craft->phases()->save($phase);
      }
    }

    return $document;
  }

  public function createSixthPart($document, $finishedProduct)
  {
    $document->craft->update($finishedProduct['craft']);

    if(isset($finishedProduct['craft']['e42_image_url'])) {
      $file = $this->fileRepository->createFile($finishedProduct['craft']['e42_image_url'], 'images', 'finished_product_image');
      $document->craft->finishedProductImage()->associate($file)->save();
    }

    return $document;
  }
}
