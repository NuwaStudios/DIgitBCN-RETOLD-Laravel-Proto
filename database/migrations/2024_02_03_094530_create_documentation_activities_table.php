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
    Schema::create('E7_documentation_activities', function (Blueprint $table) {
      $table->id();
      $table->string('p17_motivation')->nullable();
      $table->string('e53_country')->nullable();
      $table->bigInteger('e74_organisation_id')->unsigned()->nullable();
      $table->bigInteger('e73_document_id')->unsigned()->nullable();
      $table->bigInteger('e52_timespan_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E7_documentation_activities');
  }
};
