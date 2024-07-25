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
    Schema::create('E28_crafts', function (Blueprint $table) {
      $table->id();
      $table->string('e62_short_description')->nullable();
      $table->string('e53_historical')->nullable();
      $table->string('e53_contemporary')->nullable();
      $table->string('e42_video_url')->nullable();
      $table->string('e55_craft_type_category')->nullable();
      $table->string('e55_craft_type_nature')->nullable();
      $table->string('tools_obtained')->nullable();
      $table->string('installations_obtained')->nullable();
      $table->string('materials_obtained')->nullable();
      $table->string('materials_obtained_natural')->nullable();
      $table->string('materials_obtained_bought')->nullable();
      $table->string('raw_material_description')->nullable();
      $table->string('reparation_description')->nullable();
      $table->string('process_working_area')->nullable();
      $table->string('process_layout')->nullable();
      $table->string('working_techniques')->nullable();
      $table->boolean('is_decoration')->nullable();
      $table->string('decoration_techniques')->nullable();
      $table->string('decoration_motifs')->nullable();
      $table->string('e42_image_url_decoration')->nullable();
      $table->string('e42_video_url_decoration')->nullable();
      $table->boolean('is_diverged')->nullable();
      $table->string('diverged_changes')->nullable();
      $table->string('diverged_reasons')->nullable();
      $table->boolean('is_evolved')->nullable();
      $table->string('evolved_process')->nullable();
      $table->string('evolved_product')->nullable();
      $table->string('evolved_reasons')->nullable();
      $table->boolean('is_gaps')->nullable();
      $table->string('gaps_basis')->nullable();
      $table->string('gaps_process')->nullable();
      $table->string('gaps_reasons')->nullable();
      $table->string('best_practices')->nullable();
      $table->string('best_practices_disposal_of_waste')->nullable();
      $table->string('best_practices_use_after_disposal')->nullable();
      $table->string('e35_title_english')->nullable();
      $table->string('e35_title_translated')->nullable();
      $table->string('finished_product_description')->nullable();
      $table->boolean('is_finished_product_practical_use')->nullable();
      $table->string('finished_product_practical_use_description')->nullable();
      $table->boolean('is_finished_product_decorative_use')->nullable();
      $table->string('finished_product_decorative_use_description')->nullable();
      $table->boolean('is_finished_product_experimental_use')->nullable();
      $table->string('finished_product_experimental_use_description')->nullable();
      $table->boolean('is_finished_product_educational_use')->nullable();
      $table->string('finished_product_educational_use_description')->nullable();
      $table->string('finished_product_durability')->nullable();
      $table->string('finished_product_distributed')->nullable();
      $table->string('finished_product_reachability')->nullable();
      $table->bigInteger('cover_image_file_id')->unsigned()->nullable();
      $table->bigInteger('e52_timespan_id')->unsigned()->nullable();
      $table->bigInteger('e73_document_id')->unsigned()->nullable();
      $table->bigInteger('finished_product_file_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('E28_crafts');
  }
};
