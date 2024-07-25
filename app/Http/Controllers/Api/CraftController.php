<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CraftRepository;

class CraftController extends Controller
{
  protected $craftRepository;

  public function __construct(CraftRepository $craftRepository)
  {
    $this->craftRepository = $craftRepository;
  }

  public function index()
  {
    try {
      return response()->json($this->craftRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Crafts: ' . $th->getMessage()
      ], 500);
    }
  }

  public function show(Request $request)
  {
    try {
      $craft = $this->craftRepository->findById($request->id);

      if (!$craft) {
        return response()->json([
          'error' => 'Craft not found'
        ], 404);
      }

      return response()->json($craft, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Craft: ' . $th->getMessage()
      ], 500);
    }
  }

  public function store(Request $request)
  {
    try {
      $validated = $request->validate([
        'craft_type_id' => 'required|integer',
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:255'
      ]);

      $craft = $this->craftRepository->create($validated);

      return response()->json($craft, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to store the Craft: ' . $th->getMessage()
      ], 500);
    }
  }

  public function update(Request $request)
  {
    try {
      $validated = $request->validate([
        'craft_type_id' => 'integer',
        'name' => 'string|max:255',
        'description' => 'string|max:255'
      ]);

      $craft = $this->craftRepository->update($request->id, $validated);

      if (!$craft) {
        return response()->json([
          'error' => 'Craft not found'
        ], 404);
      }

      return response()->json($craft, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the Craft: ' . $th->getMessage()
      ], 500);
    }
  }

  public function destroy(Request $request)
  {
    try {
      $craft = $this->craftRepository->deleteById($request->id);

      if (!$craft) {
        return response()->json([
          'error' => 'Craft not found'
        ], 404);
      }

      return response()->json($craft, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the Craft: ' . $th->getMessage()
      ], 500);
    }
  }
}
