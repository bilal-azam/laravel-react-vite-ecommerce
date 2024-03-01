<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Favorite;
use App\Models\Price;
use App\Models\Products\Variant;
use App\Notifications\PriceChanged;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

final class VariantObserver
{
    //    public function creating(Variant $variant)
    //    {
    //        $this->generateThumbnail($variant);
    //    }
    //
    //    public function updating(Variant $variant)
    //    {
    //        $this->generateThumbnail($variant);
    //    }

    public function created(Variant $variant): void
    {
        Cache::tags('feature-products')->flush();
    }

    /**
     * Handle the Variant "updated" event.
     */
    public function updated(Variant $variant): void
    {
        if ($variant->isDirty('price')) {
            Price::create(['price' => $variant->price, 'variant_id' => $variant->id]);

            if ($variant->getOriginal('price') > $variant->price) {
                $favorites = Favorite::where('variant_id', $variant->id)->with('user')->get();

                $variant->load('product.brand', 'color');

                foreach ($favorites as $favorite) {
                    $favorite->user->notify(new PriceChanged($variant));
                }
            }
        }

        //        Cache::tags('feature-products')->flush();
    }

    /**
     * Handle the Variant "deleted" event.
     */
    public function deleted(Variant $variant): void {}

    /**
     * Handle the Variant "restored" event.
     */
    public function restored(Variant $variant): void {}

    /**
     * Handle the Variant "force deleted" event.
     */
    public function forceDeleted(Variant $variant): void {}

    private function generateThumbnail(Variant $variant): void
    {
        //        $manager = new ImageManager('gd');
        //
        //        $image = $manager->read(json_decode($variant->images, true)[0]);
        //        $image->resize(320, 240);
        //
        //        // Save the image to a temporary location
        //        $tempPath = tempnam(sys_get_temp_dir(), 'thumbnail');
        //        $image->save($tempPath);
        //
        //        // Store the image in the 'thumbnails' disk as a new file
        //        $imagePath = Storage::disk('public')->putFile('thumbnails', new File($tempPath));
        //
        //        // Delete the temporary file
        //        unlink($tempPath);

        // Set the full URL to $variant->thumbnail
        //        $variant->thumbnail = '';
    }
}
