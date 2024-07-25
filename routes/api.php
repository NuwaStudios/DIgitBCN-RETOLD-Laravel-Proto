<?php

use App\Http\Controllers\Api\PendingApprovalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FileController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotificationTypeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CraftFormController;
use App\Http\Controllers\Api\CrafterController;
use App\Http\Controllers\Api\OrganisationsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::prefix('/files')->group(function () {
  Route::get('/', [FileController::class, 'index']);
  Route::get('/{id}', [FileController::class, 'show']);
  Route::post('/', [FileController::class, 'store']);
  Route::patch('/{id}', [FileController::class, 'update']);
  Route::delete('/{id}', [FileController::class, 'destroy']);
});

Route::prefix('/notification-types')->group(function () {
  Route::get('/', [NotificationTypeController::class, 'index']);
  Route::get('/{id}', [NotificationTypeController::class, 'show']);
  Route::post('/', [NotificationTypeController::class, 'store']);
  Route::patch('/{id}', [NotificationTypeController::class, 'update']);
  Route::delete('/{id}', [NotificationTypeController::class, 'destroy']);
});

Route::prefix('/notifications')->group(function () {
  Route::get('/', [NotificationController::class, 'index']);
  Route::get('/{id}', [NotificationController::class, 'show']);
  Route::post('/', [NotificationController::class, 'store']);
  Route::patch('/{id}', [NotificationController::class, 'update']);
  Route::delete('/{id}', [NotificationController::class, 'destroy']);
});

Route::prefix('/roles')->group(function () {
  Route::get('/', [RoleController::class, 'index']);
  Route::get('/{id}', [RoleController::class, 'show']);
  Route::post('/', [RoleController::class, 'store']);
  Route::patch('/{id}', [RoleController::class, 'update']);
  Route::delete('/{id}', [RoleController::class, 'destroy']);
});

Route::prefix('/users')->group(function () {
  Route::get('/', [UserController::class, 'index']);
  Route::get('/{id}', [UserController::class, 'show']);
  Route::post('/', [UserController::class, 'store']);
  Route::patch('/{id}', [UserController::class, 'update']);
  Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::prefix('/crafts')->group(function () {
  Route::get('/{id}/get', [CraftFormController::class, 'show']);
});

Route::prefix('/crafters')->group(function () {
  Route::get('/', [CrafterController::class, 'index']);
});

Route::prefix('/organisations')->group(function () {
  Route::get('/', [OrganisationsController::class, 'index']);
});

Route::prefix('/pending')->group(function () {
  Route::post('/approve/{id}', [PendingApprovalController::class, 'approveDocument']);
  Route::post('/reject/{id}', [PendingApprovalController::class, 'rejectDocument']);
});
