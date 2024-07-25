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
    Schema::create('E73_documents', function (Blueprint $table) {
      $table->id();
      $table->string('name')->nullable();
      $table->string('description')->nullable();
      $table->string('e35_title')->nullable();
      $table->string('e35_title_english')->nullable();
      $table->string('e35_title_translated')->nullable();
      $table->string('e56_language')->nullable();
      $table->string('e53_country')->nullable();
      $table->string('attached_type')->default('');
      $table->boolean('is_public')->nullable();
      $table->string('p17_motivation')->nullable();
      $table->bigInteger('e73_self_document')->unsigned()->nullable();
      $table->bigInteger('e74_organisation_owner_id')->unsigned()->nullable();
      $table->bigInteger('e74_organisation_documentalist_id')->unsigned()->nullable();
      $table->bigInteger('e52_timespan_id')->unsigned()->nullable();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E73_documents');
  }
};
