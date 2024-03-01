<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Products\Product;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

final class RatingFactory extends Factory
{
    protected $model = Rating::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->pluck('id')->first(),
            'product_id' => Product::inRandomOrder()->pluck('id')->first(),
            'value' => $this->faker->numberBetween(1, 5),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
