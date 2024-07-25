<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
  protected $userRepository;

  public function __construct(UserRepository $userRepository)
  {
    $this->userRepository = $userRepository;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      return response()->json($this->userRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Users: ' . $th->getMessage()
      ], 501);
    }
  }

  /**
   * Display a specified resource.
   */
  public function show(Request $request)
  {
    try {
      $user = $this->userRepository->findById($request->id);

      if (!$user) {
        return response()->json([
          'error' => 'User not found'
        ], 404);
      }

      return response()->json($user, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the User: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    // try {
    //   $validated = $request->validate([
    //     'name' => 'required|string',
    //     'birth_date' => 'required|date',
    //     'death_date' => 'nullable|date',
    //     'group_id' => 'nullable|integer',
    //     'parent_id' => 'nullable|integer'
    //   ]);

    //   $user = $this->userRepository->create($validated);

    //   return response()->json($user, 201);
    // } catch (\Throwable $th) {
    //   return response()->json([
    //     'error' => 'An error occurred while trying to store the User: ' . $th->getMessage()
    //   ], 500);
    // }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request)
  {
    try {
      $validated = $request->validate([
        'name' => 'string',
        'email' => 'string',
        'role_id' => 'integer',
        'is_enabled' => 'nullable|boolean'
      ]);

      $user = $this->userRepository->update($request->id, $validated);

      if (!$user) {
        return response()->json([
          'error' => 'User not found'
        ], 404);
      }

      return response()->json($user, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the User: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    try {
      $user = $this->userRepository->deleteById($request->id);

      if (!$user) {
        return response()->json([
          'error' => 'User not found'
        ], 404);
      }

      return response()->json($user, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the User: ' . $th->getMessage()
      ], 500);
    }
  }
}
