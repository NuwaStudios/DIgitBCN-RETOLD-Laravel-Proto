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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password')->nullable();
      $table->string('google_id')->nullable();
      $table->tinyInteger('is_password_reset')->default(0);
      $table->boolean('is_enabled')->default(true);
      $table->unsignedBigInteger('role_id')->nullable();
      $table->unsignedBigInteger('e74_organisation_id')->nullable(); // entityId
      $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::table('users', function (Blueprint $table) {
      $table->foreign('role_id')->references('id')->on('roles');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users');
  }
};
