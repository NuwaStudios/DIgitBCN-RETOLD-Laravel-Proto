<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('E52_timespans', function (Blueprint $table) {
      $table->id();
      $table->integer('e61_timePrimitive_start')->nullable();
      $table->integer('e61_timePrimitive_end')->nullable();
      $table->date('e61_timespan_start')->nullable();
      $table->date('e61_timespan_end')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E52_timespans');
  }
};
