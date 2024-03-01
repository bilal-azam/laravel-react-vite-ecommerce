<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

final class DiscountFactory extends Factory
{
    protected $model = Discount::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'value' => $this->faker->randomNumber(),
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
