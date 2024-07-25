<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\NotificationType;
use App\Repositories\NotificationRepository;
use App\Repositories\NotificationTypeRepository;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
  protected $notificationRepository;
  protected $notificationTypeRepository;

  public function __construct(NotificationRepository $notificationRepository, NotificationTypeRepository $notificationTypeRepository)
  {
    $this->notificationRepository = $notificationRepository;
    $this->notificationTypeRepository = $notificationTypeRepository;
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    try {
      return response()->json($this->notificationRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Notifications: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Request $request)
  {
    try {
      $notification = $this->notificationRepository->findById($request->id);

      if (!$notification) {
        return response()->json([
          'error' => 'Notification not found'
        ], 404);
      }

      return response()->json($notification, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Notification: ' . $th->getMessage()
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
        'organization_name' => 'required|string',
        'requester_name' => 'required|string',
        'requester_surname' => 'required|string',
        'requester_email' => 'required|email',
        'requester_observations' => 'required|string',
        'notification_type_id' => 'required|integer'
      ]);

      $notificationType = $this->notificationTypeRepository->findById($request->notification_type_id);

      if (!$notificationType) {
        return response()->json([
          'error' => 'Notification Type not found'
        ], 404);
      }

      $notification = $this->notificationRepository->create($validated);

      return response()->json($notification, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Notification: ' . $th->getMessage()
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
        'organization_name' => 'string',
        'requester_name' => 'string',
        'requester_surname' => 'string',
        'requester_email' => 'email',
        'requester_observations' => 'string',
        'notification_type_id' => 'integer'
      ]);

      $notificationType = $this->notificationTypeRepository->findById($request->notification_type_id);

      if (!$notificationType) {
        return response()->json([
          'error' => 'Notification Type not found'
        ], 404);
      }

      $notification = $this->notificationRepository->update($request->id, $validated);

      return response()->json($notification, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Notification: ' . $th->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    try {
      $notification = Notification::find($request->id);

      if (!$notification) {
        return response()->json([
          'error' => 'Notification not found'
        ], 404);
      }

      $notification->delete();

      return response()->json($notification, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Notification: ' . $th->getMessage()
      ], 500);
    }
  }
}
