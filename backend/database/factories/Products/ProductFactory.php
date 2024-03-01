<?php

declare(strict_types=1);

namespace Database\Factories\Products;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

final class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'category_id' => Category::inRandomOrder()->pluck('id')->first(),
            'brand_id' => Brand::inRandomOrder()->pluck('id')->first(),
            'name' => $this->faker->sentence(3, true),
            'description' => $this->faker->sentence(60),
            'price' => $this->faker->numberBetween(10, 1000),
        ];

    }
}
