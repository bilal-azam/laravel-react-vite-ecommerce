<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

final class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colorValues = ['red', 'green', 'blue', 'black', 'white', 'yellow', 'orange', 'purple', 'brown'];

        foreach ($colorValues as $colorValue) {
            Color::factory()->create(['name' => $colorValue]);
        }
    }
}
