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
    Schema::create('E53_countries', function (Blueprint $table) {
      $table->id();
      $table->string('name')->nullable();
      $table->string('name_local')->nullable();
      $table->string('iso3166_alpha2')->nullable();
      $table->string('iso3166_alpha3')->nullable();
      $table->string('iso3166_numeric')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E53_countries');
  }
};
