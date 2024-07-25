<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Event;
use App\Models\PhysicalObject;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $this->call([
      AddressesSeeder::class,
      OrganisationSeeder::class,
      RoleSeeder::class,
      UserSeeder::class,
    ]);
  }
}
