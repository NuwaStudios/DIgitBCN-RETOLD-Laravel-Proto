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
    Schema::table('E73_documents', function (Blueprint $table) {
      //self_reference
      $table->foreign('e73_self_document')->references('id')->on('E73_documents');
      $table->foreign('e74_organisation_owner_id')->references('id')->on('E74_organisations');
      $table->foreign('e74_organisation_documentalist_id')->references('id')->on('E74_organisations');
      $table->foreign('e52_timespan_id')->references('id')->on('E52_timespans');
    });

    Schema::table('E28_crafts', function (Blueprint $table) {
      $table->foreign('e52_timespan_id')->references('id')->on('E52_timespans');
      $table->foreign('e73_document_id')->references('id')->on('E73_documents');
      $table->foreign('cover_image_file_id')->references('id')->on('files');
      $table->foreign('finished_product_file_id')->references('id')->on('files');
    });

    Schema::table('E74_organisations', function (Blueprint $table) {
      //$table->foreign('e27_site_id')->references('id')->on('?');
      $table->foreign('institution_id')->references('id')->on('institutions');
      $table->foreign('e53_address_id')->references('id')->on('E53_addresses');
    });

    Schema::table('E53_addresses', function (Blueprint $table) {
      $table->foreign('e21_person_id')->references('id')->on('E21_persons');
    });

    Schema::table('E21_persons', function (Blueprint $table) {
      $table->foreign('e52_timespan_id')->references('id')->on('E52_timespans');
      $table->foreign('e74_organisation_id')->references('id')->on('E74_organisations');
      $table->foreign('user_id')->references('id')->on('users');
    });

    Schema::table('users', function (Blueprint $table) {
      $table->foreign('e74_organisation_id')->references('id')->on('E74_organisations');
    });

    Schema::table('tools', function (Blueprint $table) {
      $table->foreign('e28_craft_id')->references('id')->on('E28_crafts');
      $table->foreign('file_id')->references('id')->on('files');
    });

    Schema::table('materials', function (Blueprint $table) {
      $table->foreign('e28_craft_id')->references('id')->on('E28_crafts');
      $table->foreign('file_id')->references('id')->on('files');
    });

    Schema::table('installations', function (Blueprint $table) {
      $table->foreign('e28_craft_id')->references('id')->on('E28_crafts');
      $table->foreign('file_id')->references('id')->on('files');
    });

    Schema::table('phases', function (Blueprint $table) {
      $table->foreign('e28_craft_id')->references('id')->on('E28_crafts');
      $table->foreign('file_id')->references('id')->on('files');
    });

    Schema::table('craft_person', function (Blueprint $table) {
      $table->foreign('e21_person_id')->references('id')->on('E21_persons');
      $table->foreign('e28_craft_id')->references('id')->on('E28_crafts');
    });

    Schema::table('documenters', function (Blueprint $table) {
      $table->foreign('e21_person_id')->references('id')->on('E21_persons');
    });

    Schema::table('crafters', function (Blueprint $table) {
      $table->foreign('e21_person_id')->references('id')->on('E21_persons');
    });

    Schema::table('dismantling_members', function (Blueprint $table) {
      $table->foreign('e21_person_id')->references('id')->on('E21_persons');
    });

    Schema::table('builders', function (Blueprint $table) {
      $table->foreign('e21_person_id')->references('id')->on('E21_persons');
    });

    Schema::table('buildings', function (Blueprint $table) {
      $table->foreign('e53_address_id')->references('id')->on('E53_addresses');
      $table->foreign('e73_document_id')->references('id')->on('E73_documents');
      $table->foreign('builder_organisation_id')->references('id')->on('E74_organisations');
      $table->foreign('aerialPhotoWithinHouseholdOriginal_file_id')->references('id')->on('files');
      $table->foreign('aerialPhotoWithinHousehold_file_id')->references('id')->on('files');
      $table->foreign('aerialPhotoWithinMuseum_file_id')->references('id')->on('files');
      $table->foreign('dmodel_file_id')->references('id')->on('files');
    });

    Schema::table('components', function (Blueprint $table) {
      $table->foreign('building_id')->references('id')->on('buildings');
      $table->foreign('file_id')->references('id')->on('files');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    //
  }
};
