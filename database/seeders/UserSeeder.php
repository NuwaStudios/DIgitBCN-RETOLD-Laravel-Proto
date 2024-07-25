<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::factory()->create([
      'name' => 'manager',
      'email' => 'manager@test.org',
      'password' => '$2y$12$2oEqCrlFojCPq1t3naMafuFdk93xMZfjKDO7bLN1RSzz02MUOh3n6',
      'role_id' => 2,
      'e74_organisation_id' => 1
    ]);
    User::factory()->create([
      'name' => 'manager2',
      'email' => 'manager2@test.org',
      'password' => '$2y$12$2oEqCrlFojCPq1t3naMafuFdk93xMZfjKDO7bLN1RSzz02MUOh3n6',
      'role_id' => 2,
      'e74_organisation_id' => 2
    ]);

    User::factory()->create([
      'name' => 'admin',
      'email' => 'admin@test.org',
      'password' => '$2y$12$2oEqCrlFojCPq1t3naMafuFdk93xMZfjKDO7bLN1RSzz02MUOh3n6',
      'role_id' => 1
    ]);
  }
}
