<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Products\Product;
use App\Models\Products\Variant;
use Faker\Generator;
use Illuminate\Container\Container;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Seeder;

final class VariantSeeder extends Seeder
{
    protected Generator $faker;

    /**
     * Create a new seeder instance.
     *
     * @return void
     * @throws BindingResolutionException
     */
    public function __construct()
    {
        $this->faker = $this->withFaker();
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $imagesCount = 6;
        $images = [];

        for ($i = 0; $i < $imagesCount; $i++) {
            $images[] = $this->faker->imageUrl();
        }

        $count = 100;

        $products = Product::inRandomOrder()->take($count)->get(['id', 'price']);

        foreach ($products as $product) {
            $colors = Color::inRandomOrder()->take(2)->pluck('id');

            foreach ($colors as $color) {
                shuffle($images);

                Variant::factory()->create([
                    'product_id' => $product->id,
                    'color_id' => $color,
                    'price' => $product->price * 0.8,
                    'images' => json_encode($images),
                ]);
            }
        }
    }

    /**
     * Get a new Faker instance.
     *
     * @return Generator
     * @throws BindingResolutionException
     */
    protected function withFaker(): Generator
    {
        return Container::getInstance()->make(Generator::class);
    }
}
