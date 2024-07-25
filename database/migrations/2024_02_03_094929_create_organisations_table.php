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
    Schema::create('E74_organisations', function (Blueprint $table) {
      $table->id();
      $table->string('e41_appellation_english')->nullable();
      $table->string('e41_appellation_local')->nullable();
      $table->string('e41_appellation_legal_local')->nullable();
      $table->string('e42_website')->nullable();
      $table->bigInteger('e53_address_id')->unsigned()->nullable();
      $table->bigInteger('e27_site_id')->unsigned()->nullable();
      $table->bigInteger('institution_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E74_organisations');
  }
};
