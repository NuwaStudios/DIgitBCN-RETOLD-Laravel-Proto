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
        Schema::create('buildings', function (Blueprint $table) {
            $table->id();
            $table->string('assessor')->nullable();
            $table->integer('assessment_year')->nullable();
            $table->string('building_url')->nullable();
            $table->string('source_type')->nullable();
            $table->integer('construction_year')->nullable();
            $table->string('cultural_group')->nullable();
            $table->string('time_period')->nullable();
            $table->string('owner_name')->nullable();
            $table->string('owner_occupation')->nullable();
            $table->string('owner_family_history')->nullable();
            $table->string('owner_society_status')->nullable();
            $table->integer('owner_year_of_occupation')->nullable();
            $table->string('building_part_of')->nullable();
            $table->string('original_environment')->nullable();
            $table->string('original_environment_city')->nullable();
            $table->string('original_environment_village')->nullable();
            $table->string('original_environment_household')->nullable();
            $table->string('original_environment_household_location')->nullable();
            $table->string('surroundings')->nullable();
            $table->string('soil_condition')->nullable();
            $table->string('vegetation')->nullable();
            $table->string('climate')->nullable();
            $table->string('light_conditions')->nullable();
            $table->string('original_function')->nullable();
            $table->string('original_function_residential')->nullable();
            $table->string('original_function_non_residential')->nullable();
            $table->string('original_function_annex')->nullable();
            $table->string('building_use')->nullable();
            $table->string('building_use_residential')->nullable();
            $table->string('building_use_non_residential')->nullable();
            $table->string('building_use_annex')->nullable();
            $table->string('acquisition_mode')->nullable();
            $table->integer('dismantling_year')->nullable();
            $table->string('dismantling_description')->nullable();
            $table->string('museum_reason')->nullable();
            $table->boolean('is_built_on_site')->nullable();
            $table->string('building_museum_part_of')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('building_museum_part_of_type')->nullable();
            $table->string('building_museum_part_of_name')->nullable();
            $table->string('building_museum_part_of_file')->nullable();
            $table->string('realisation')->nullable();
            $table->string('builder_construction_year')->nullable();
            $table->boolean('is_diversion')->nullable();
            $table->string('diversion_reason')->nullable();
            $table->boolean('is_divergent')->nullable();
            $table->string('divergent_reason')->nullable();
            $table->bigInteger('builder_organisation_id')->unsigned()->nullable();
            $table->bigInteger('e53_address_id')->unsigned()->nullable();
            $table->bigInteger('building_owner_id')->unsigned()->nullable();
            $table->bigInteger('e73_document_id')->unsigned()->nullable();
            $table->bigInteger('aerialPhotoWithinHouseholdOriginal_file_id')->unsigned()->nullable();
            $table->bigInteger('aerialPhotoWithinHousehold_file_id')->unsigned()->nullable();
            $table->bigInteger('aerialPhotoWithinMuseum_file_id')->unsigned()->nullable();
            $table->bigInteger('dmodel_file_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buildings');
    }
};
