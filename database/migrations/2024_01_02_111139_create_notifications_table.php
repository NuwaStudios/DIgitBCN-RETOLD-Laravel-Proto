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
    Schema::create('notifications', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('notification_type_id');
      $table->string('organization_name');
      $table->string('requester_name');
      $table->string('requester_surname');
      $table->string('requester_email');
      $table->string('requester_observations');
      $table->unsignedBigInteger('user_id');
      $table->timestamps();
    });

    Schema::table('notifications', function (Blueprint $table) {
      $table->foreign('user_id')->references('id')->on('users');
      $table->foreign('notification_type_id')->references('id')->on('notification_types');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('notifications');
  }
};
