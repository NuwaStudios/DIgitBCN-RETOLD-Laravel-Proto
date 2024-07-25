<?php

namespace Database\Factories;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
  protected $model = Notification::class;

  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'notification_type_id' => fake()->numberBetween(1, 10),
      'organization_name' => fake()->word(),
      'requester_name' => fake()->word(),
      'requester_surname' => fake()->word(),
      'requester_email' => fake()->email(),
      'requester_observations' => fake()->text(),
      'user_id' => fake()->numberBetween(1, 10)
    ];
  }
}
