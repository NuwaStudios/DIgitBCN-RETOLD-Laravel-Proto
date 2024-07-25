<?php

namespace Database\Seeders;

use App\Models\E53_Address;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        E53_Address::factory()->count(2)->create();
    }
}
