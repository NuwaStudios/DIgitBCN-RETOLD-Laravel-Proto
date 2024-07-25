<?php

namespace App\Http\Services\File;

use App\Models\File;
use App\Repositories\FileRepository;

class FileService
{
  protected FileRepository $fileRepository;

  public function __construct(
    FileRepository $fileRepository
  ) {
    $this->fileRepository = $fileRepository;
  }

  public function index()
  {
    return $this->fileRepository->all();
  }

  public function store($data)
  {
    return $this->fileRepository->create($data);
  }

  public function show($id)
  {
    return $this->fileRepository->findById($id);
  }

  public function update($data, $id)
  {
    return $this->fileRepository->findById($id)->update($data);
  }

  public function destroy($id)
  {
    return $this->fileRepository->findById($id)->delete();
  }
}
