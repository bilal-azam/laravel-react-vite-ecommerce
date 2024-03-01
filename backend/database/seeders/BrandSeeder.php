<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

final class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = ['nike', 'adidas', "levi's", 'guess', 'tommy hilfiger', 'emporio armani', 'calvin klein', 'polo ralph lauren'];

        foreach ($brands as $brand) {
            Brand::factory()->create(['name' => $brand]);
        }
    }
}
