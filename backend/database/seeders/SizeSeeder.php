<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

final class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sizeValues = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'];
        $shoeSizeValues = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

        foreach ($sizeValues as $sizeValue) {
            Size::factory()->create(['name' => $sizeValue]);
        }
        foreach ($shoeSizeValues as $shoeSizeValue) {
            Size::factory()->create(['name' => $shoeSizeValue]);
        }
    }
}
