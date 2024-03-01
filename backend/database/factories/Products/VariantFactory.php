<?php

declare(strict_types=1);

namespace Database\Factories\Products;

use App\Models\Color;
use App\Models\Products\Product;
use App\Models\Products\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

final class VariantFactory extends Factory
{
    protected $model = Variant::class;

    public function definition(): array
    {
        // Download the image
        //        $imageResponse = Http::get('https://picsum.photos/640/480');
        //
        // Generate a unique filename
        //        $filename = 'mainPhoto_' . now()->timestamp . '.jpg';
        //
        // Store the image locally in the storage directory
        //        Storage::put('public/images/' . $filename, $imageResponse->body());
        //
        // Get the full HTTP link to the stored image
        //        $imageUrl = url('storage/images/' . $filename);

        return [
            'product_id' => Product::inRandomOrder()->pluck('id')->first(),
            'color_id' => Color::inRandomOrder()->pluck('id')->first(),
            'price' => $this->faker->numberBetween(10, 1000),
            'published' => $this->faker->boolean(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'thumbnail' => '',
        ];
    }
}
