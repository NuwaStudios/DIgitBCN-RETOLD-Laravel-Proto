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
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('material')->nullable();
            $table->string('manufacturing_technique')->nullable();
            $table->string('dimensions')->nullable();
            $table->bigInteger('building_id')->unsigned()->nullable();
            $table->bigInteger('file_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('components');
    }
};
