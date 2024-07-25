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
    Schema::create('E21_persons', function (Blueprint $table) {
      $table->id();
      $table->string('e41_appellation_firstname')->nullable();
      $table->string('e41_appellation_middlename')->nullable();
      $table->string('e41_appellation_lastname')->nullable();
      $table->string('e41_appellation_occupation')->nullable();
      $table->string('e42_website')->nullable();
      $table->date('e61_date_of_birth')->nullable();
      $table->string('person_role')->nullable();
      $table->string('e53_nationality')->nullable();
      $table->bigInteger('e52_timespan_id')->unsigned()->nullable();
      $table->bigInteger('e74_organisation_id')->unsigned()->nullable();
      $table->bigInteger('user_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E21_persons');
  }
};
