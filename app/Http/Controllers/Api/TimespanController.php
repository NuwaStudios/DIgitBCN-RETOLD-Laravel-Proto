<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\TimespanRepository;

class TimespanController extends Controller
{
  protected $timespanRepository;

  public function __construct(TimespanRepository $timespanRepository)
  {
    $this->timespanRepository = $timespanRepository;
  }

  public function index()
  {
    try {
      return response()->json($this->timespanRepository->all(), 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get all Timespans: ' . $th->getMessage()
      ], 500);
    }
  }

  public function show(Request $request)
  {
    try {
      $timespan = $this->timespanRepository->findById($request->id);

      if (!$timespan) {
        return response()->json([
          'error' => 'Timespan not found'
        ], 404);
      }

      return response()->json($timespan, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to get the Timespan: ' . $th->getMessage()
      ], 500);
    }
  }

  public function store(Request $request)
  {
    try {
      $validated = $request->validate([
        'start_date' => 'required|date',
        'end_date' => 'required|date',
      ]);

      $timespan = $this->timespanRepository->create($validated);

      return response()->json($timespan, 201);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to store the Timespan: ' . $th->getMessage()
      ], 500);
    }
  }

  public function update(Request $request)
  {
    try {
      $validated = $request->validate([
        'start_date' => 'date',
        'end_date' => 'date',
      ]);

      $timespan = $this->timespanRepository->update($request->id, $validated);

      if (!$timespan) {
        return response()->json([
          'error' => 'Timespan not found'
        ], 404);
      }

      return response()->json($timespan, 200);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to update the Timespan: ' . $th->getMessage()
      ], 500);
    }
  }

  public function destroy(Request $request)
  {
    try {
      $timespan = $this->timespanRepository->deleteById($request->id);

      if (!$timespan) {
        return response()->json([
          'error' => 'Timespan not found'
        ], 404);
      }

      return response()->json($timespan, 204);
    } catch (\Throwable $th) {
      return response()->json([
        'error' => 'An error occurred while trying to delete the Timespan: ' . $th->getMessage()
      ], 500);
    }
  }
}
