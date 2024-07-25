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
    Schema::create('crafters', function (Blueprint $table) {
      $table->id();
      $table->boolean('has_contacts')->nullable();
      $table->integer('contact_network_size')->nullable();
      $table->string('p17_motivation')->nullable();
      $table->boolean('craft_isMainActivity')->nullable();
      $table->string('craft_MainActivity')->nullable();
      $table->boolean('craft_isMultiArtisan')->nullable();
      $table->string('preferred_workspace')->nullable();
      $table->string('e41_appellation_contribution_role')->nullable();
      $table->string('learned_from')->nullable();
      $table->string('learned_person_context')->nullable();
      $table->boolean('is_learned_apprenticeship_related')->nullable();
      $table->string('learned_apprenticeship_related_subject')->nullable();
      $table->boolean('is_learned_course_related')->nullable();
      $table->string('learned_course_authority')->nullable();
      $table->string('learned_course_subject')->nullable();
      $table->boolean('is_historical_sources')->nullable();
      $table->string('historical_sources_reference')->nullable();
      $table->boolean('is_teach_craft')->nullable();
      $table->string('teach_craft_where')->nullable();
      $table->bigInteger('e21_person_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('crafters');
  }
};
