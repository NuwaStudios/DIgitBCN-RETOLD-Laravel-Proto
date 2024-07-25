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
    Schema::create('tools', function (Blueprint $table) {
      $table->id();
      $table->string('e35_title_english')->nullable();
      $table->string('e35_title_translated')->nullable();
      $table->string('purpose')->nullable();
      $table->string('usage')->nullable();
      $table->bigInteger('e28_craft_id')->unsigned()->nullable();
      $table->bigInteger('file_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('tools');
  }
};
