<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(ShipmentSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(BrandSeeder::class);
        $this->call(ColorSeeder::class);
        $this->call(SizeSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(VariantSeeder::class);
        $this->call(OptionSeeder::class);
        $this->call(RatingSeeder::class);
    }
}
