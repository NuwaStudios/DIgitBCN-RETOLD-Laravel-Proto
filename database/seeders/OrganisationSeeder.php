<?php

namespace Database\Seeders;

use App\Models\E74_Organisation;
use Illuminate\Database\Seeder;

class OrganisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        E74_Organisation::factory()->create([
            'e41_appellation_english' => 'Test Organisation 1',
            'e53_address_id' => 1
        ]);
        E74_Organisation::factory()->create([
            'e41_appellation_english' => 'Test Organisation 2',
            'e53_address_id' => 2
        ]);
    }
}
