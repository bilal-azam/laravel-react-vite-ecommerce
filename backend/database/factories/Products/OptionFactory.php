<?php

declare(strict_types=1);

namespace Database\Factories\Products;

use App\Models\Products\Option;
use App\Models\Products\Variant;
use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

final class OptionFactory extends Factory
{
    protected $model = Option::class;

    public function definition(): array
    {
        return [
            'variant_id' => Variant::inRandomOrder()->pluck('id')->first(),
            'size_id' => Size::inRandomOrder()->pluck('id')->first(),
            'quantity' => $this->faker->numberBetween(0, 10),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
