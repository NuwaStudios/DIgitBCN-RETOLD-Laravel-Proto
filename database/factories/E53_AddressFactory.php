<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class E53_AddressFactory extends Factory
{
  protected $model = \App\Models\E53_Address::class;

  /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'e41_street' => $this->faker->streetAddress,
            'e41_city' => $this->faker->city,
            'e41_postcode' => $this->faker->postcode,
            'e41_county' => $this->faker->state,
            'e42_phone' => $this->faker->phoneNumber,
            'e42_email' => $this->faker->email,
            'e53_country' => $this->faker->country,
            'coordinates_lat' => $this->faker->latitude,
            'coordinates_lng' => $this->faker->longitude,
        ];
    }
}
