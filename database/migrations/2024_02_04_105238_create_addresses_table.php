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
    Schema::create('E53_addresses', function (Blueprint $table) {
      $table->id();
      $table->string('e41_street')->nullable();
      $table->string('e41_city')->nullable();
      $table->string('e41_postcode')->nullable();
      $table->string('e41_county')->nullable();
      $table->string('e42_phone')->nullable();
      $table->string('e42_email')->nullable();
      $table->string('e53_country')->nullable();
      $table->string('coordinates_lat')->nullable();
      $table->string('coordinates_lng')->nullable();
      $table->bigInteger('e21_person_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E53_addresses');
  }
};
