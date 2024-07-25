<?php

namespace App\Http\Controllers;;

use App\Models\NotificationType;
use App\Repositories\NotificationTypeRepository;
use Illuminate\Http\Request;

class NotificationTypeController extends Controller
{
  protected $notificationTypeRepository;

  public function __construct(NotificationTypeRepository $notificationTypeRepository)
  {
    $this->notificationTypeRepository = $notificationTypeRepository;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      return response()->json($this->notificationTypeRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all NotificationTypes: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Request $request)
  {
    try {
      $notificationType = $this->notificationTypeRepository->findById($request->id);

      if (!$notificationType) {
        return response()->json([
          'error' => 'NotificationType not found'
        ], 404);
      }

      return response()->json($notificationType, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the NotificationType: ' . $th->getMessage()
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
        'type' => 'required|string'
      ]);

      $notificationType = $this->notificationTypeRepository->create($validated);

      return response()->json($notificationType, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to store the NotificationType: ' . $th->getMessage()
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
        'type' => 'string'
      ]);

      $notificationType = $this->notificationTypeRepository->update($request->id, $validated);

      return response()->json($notificationType, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the NotificationType: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    try {
      $notificationType = $this->notificationTypeRepository->deleteById($request->id);

      if (!$notificationType) {
        return response()->json([
          'error' => 'NotificationType not found'
        ], 404);
      }

      return response()->json($notificationType, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the NotificationType: ' . $th->getMessage()
      ], 500);
    }
  }
}
