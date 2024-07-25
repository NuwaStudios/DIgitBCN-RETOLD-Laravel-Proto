<?php

namespace App\Repositories;

use App\Models\File;
use App\Repositories\Interfaces\Eloquent\BaseRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

class FileRepository extends BaseRepository
{

  protected $model;

  /**
   * UserRepository constructor.
   *
   * @param File $model
   */
  public function __construct(File $model)
  {
    $this->model = $model;
  }

  public function createFile(UploadedFile $file, string $fileFolder): Model
  {
    $extension = explode('.', $file->getClientOriginalName())[1];
    $i = 0;
    do {
      $fileName = Auth::id() . '-' . Date::now()->timestamp . '-' . $i . '.' . $extension;
      $filePath = $fileFolder . '/' . $fileName;
      $i++;
    } while (Storage::disk('public')->exists($filePath));

    $path = Storage::disk('public')->putFileAs($fileFolder, $file, $fileName);
    return $this->model->create([
      'name' => $fileName,
      'path' => $path,
      //        'size' => $aerialPhotoWithinHouseholdOriginal->getSize(), TODO
      //        'extension' => $aerialPhotoWithinHouseholdOriginal->extension(), TODO
      //        'mime' => $aerialPhotoWithinHouseholdOriginal->getMimeType(), TODO
    ]);
  }

  public function deleteFile(File $file): void
  {
    Storage::disk('public')->delete($file->path);
    $file->delete();
  }
}
