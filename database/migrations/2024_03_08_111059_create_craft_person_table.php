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
    Schema::create('craft_person', function (Blueprint $table) {
      $table->id();
      $table->BigInteger('e21_person_id')->unsigned()->nullable();
      $table->BigInteger('e28_craft_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('craft_person');
  }
};
