<?php

namespace App\Http\Controllers;

use App\Repositories\FileRepository;
use Illuminate\Http\Request;

class FileController extends Controller
{
  protected $fileRepository;

  public function __construct(FileRepository $fileRepository)
  {
    $this->fileRepository = $fileRepository;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      return response()->json($this->fileRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Files: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Display a specified resource.
   */
  public function show(Request $request)
  {
    try {
      $file = $this->fileRepository->findById($request->id);

      if (!$file) {
        return response()->json([
          'error' => 'File not found'
        ], 404);
      }

      return response()->json($file, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the File: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      $validated = $request->validate([
        'name' => 'required|string',
        'type' => 'string|in:image,video,audio,document'
        // 'type' => 'required|string'
      ]);

      $file = $this->fileRepository->create($validated);

      return response()->json($file, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to store the File: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request)
  {
    try {
      $validated = $request->validate([
        'name' => 'string',
        'type' => 'string|in:image,video,audio,document'
        // 'type' => 'string'
      ]);

      $file = $this->fileRepository->update($request->id, $validated);

      if (!$file) {
        return response()->json([
          'error' => 'File not found'
        ], 404);
      }

      return response()->json($file, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the File: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    try {
      $file = $this->fileRepository->deleteById($request->id);

      if (!$file) {
        return response()->json([
          'error' => 'File not found'
        ], 404);
      }

      return response()->json($file, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the File: ' . $th->getMessage()
      ], 500);
    }
  }
}
