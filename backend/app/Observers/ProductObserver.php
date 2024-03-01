<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Products\Product;
use Illuminate\Support\Facades\Cache;

final class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void {}

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        Cache::tags('feature-products')->flush();
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void {}

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void {}

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void {}
}
