<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;

class RoleController extends Controller
{
  protected $roleRepository;

  public function __construct(RoleRepository $roleRepository)
  {
    $this->roleRepository = $roleRepository;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      return response()->json($this->roleRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Roles: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Request $request)
  {
    try {
      $role = $this->roleRepository->findById($request->id);

      if (!$role) {
        return response()->json([
          'error' => 'Role not found'
        ], 404);
      }

      return response()->json($role, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Role: ' . $th->getMessage()
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
        'name' => 'required|string'
      ]);

      $role = $this->roleRepository->create($validated);

      return response()->json($role, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to create the Role: ' . $th->getMessage()
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
        'name' => 'string'
      ]);

      $role = $this->roleRepository->update($request->id, $validated);

      if (!$role) {
        return response()->json([
          'error' => 'Role not found'
        ], 404);
      }

      return response()->json($role, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the Role: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    try {
      $role = $this->roleRepository->deleteById($request->id);

      if (!$role) {
        return response()->json([
          'error' => 'Role not found'
        ], 404);
      }

      return response()->json($role, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the Role: ' . $th->getMessage()
      ], 500);
    }
  }
}
