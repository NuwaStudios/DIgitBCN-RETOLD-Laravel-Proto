<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\DocumentRepository;

class DocumentController extends Controller
{

  protected $documentRepository;

  public function __construct(DocumentRepository $documentRepository)
  {
    $this->documentRepository = $documentRepository;
  }
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      return response()->json($this->documentRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Actors: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Display a specified resource.
   */
  public function show(Request $request)
  {
    try {
      $actor = $this->documentRepository->findById($request->id);

      if (!$actor) {
        return response()->json([
          'error' => 'Actor not found'
        ], 404);
      }

      return response()->json($actor, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Actor: ' . $th->getMessage()
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
        'actor_type_id' => 'required|integer',
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:255'
      ]);

      $actor = $this->documentRepository->create($validated);

      return response()->json($actor, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to store the Actor: ' . $th->getMessage()
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
        'actor_type_id' => 'integer',
        'name' => 'string|max:255',
        'description' => 'string|max:255'
      ]);

      $actor = $this->documentRepository->update($request->id, $validated);

      if (!$actor) {
        return response()->json([
          'error' => 'Actor not found'
        ], 404);
      }

      return response()->json($actor, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the Actor: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    try {
      $actor = $this->documentRepository->deleteById($request->id);

      if (!$actor) {
        return response()->json([
          'error' => 'Actor not found'
        ], 404);
      }

      return response()->json($actor, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the Actor: ' . $th->getMessage()
      ], 500);
    }
  }
}
