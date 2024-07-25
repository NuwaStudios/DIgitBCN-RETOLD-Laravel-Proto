<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\E74_Organisation>
 */
class E74_OrganisationFactory extends Factory
{
    protected $model = \App\Models\E74_Organisation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'e41_appellation_english' => fake()->name(),
        ];
    }
}
