<?php

namespace Database\Factories;

use App\Models\NotificationType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NotificationType>
 */
class NotificationTypeFactory extends Factory
{
  protected $model = NotificationType::class;
  
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'type' => fake()->word()
    ];
  }
}
