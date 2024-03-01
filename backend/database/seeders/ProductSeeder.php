<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Products\Product;
use Illuminate\Database\Seeder;

final class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory(100)->create();
    }
}
