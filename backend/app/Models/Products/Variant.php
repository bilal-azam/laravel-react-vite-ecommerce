<?php

declare(strict_types=1);

namespace App\Models\Products;

use App\Models\Color;
use App\Models\Favorite;
use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

final class Variant extends Model
{
    use HasFactory;
    use HasSlug;

    protected $guarded = [];
    protected $appends = ['main_photo'];

    public static function getFeatureProducts()
    {
        $user = auth()->user();

        $query = Variant::query()
            ->with([
                'product' => function ($query): void {
                    $query->withAvg('ratings', 'value')->withCount('ratings');
                },
                'product.vote',
                'lowestPrice',
            ])
            ->whereHas('options')
            ->published()
            ->orderBy('price');

        if ($user) {
            $query->with('isFavorite');
        }

        return $query->simplePaginate(20);
    }

    public static function getProducts($sort = 'id', $order = 'desc')
    {
        $request = request();
        $user = auth()->user();

        $query = Variant::query()
            ->with([
                'product' => function ($query): void {
                    $query->withAvg('ratings', 'value')->withCount('ratings');
                },
                'product.vote',
                'product.brand',
                'lowestPrice'
            ])
            ->withWhereHas('options')
            ->when($request->filled('category'), function ($query) use ($request) {
                // Use whereHas to filter based on the associated product's category_id
                return $query->whereHas('product', function ($productQuery) use ($request): void {
                    $productQuery->where('category_id', $request->get('category'));
                });
            })
            ->when($request->filled('brand'), function ($query) use ($request) {
                // Use whereHas to filter based on the associated product's brand_id
                return $query->whereHas('product', function ($productQuery) use ($request): void {
                    $productQuery->where('brand_id', $request->get('brand'));
                });
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                // Use whereHas to filter based on the associated product's search
                return $query->whereHas('product', function ($productQuery) use ($request): void {
                    $productQuery->where('name', 'like', '%' . $request->get('search') . '%');
                });
            })
            ->published()
            ->orderBy($sort, $order);

        if ($user) {
            $query->with('isFavorite');
        }

        return $query->simplePaginate(12);
    }

    public static function getProduct($id)
    {
        $user = auth()->user();

        $query = Variant::query()
            ->where('id', $id)
            ->with([
                'product' => function ($query): void {
                    $query->withAvg('ratings', 'value')
                        ->withCount('ratings')
                        ->with(['variants' => function ($query): void {
                            $query->where('published', true)
                                ->with('color');
                        }]);
                },
                'options.size',
                'lowestPrice',
            ])
            ->published();

        if ($user) {
            $query->with('isFavorite');
        }

        return $query->firstOrFail();
    }

    public function options(): HasMany
    {
        return $this->hasMany(Option::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function getPriceAttribute($value): string
    {
        return number_format($value, 2);
    }

    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    public function favorite(): HasOne
    {
        return $this->hasOne(Favorite::class);
    }

    public function isFavorite(): HasOne
    {
        return $this->hasOne(Favorite::class)->where('user_id', auth()->id());
    }

    public function lowestPrice(): HasOne
    {
        return $this->hasOne(Price::class)->orderBy('price');
    }

    public function getMainPhotoAttribute()
    {
        $images = json_decode($this->images, true);

        return $images[0];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(function ($model) {
                $model->load(['product.brand', 'color']);

                return $model->product->brand->name . ' ' . $model->product->name . ' ' . $model->color->name;
            })
            ->saveSlugsTo('url');
    }

    //    public function getRouteKeyName(): string
    //    {
    //        return 'url';
    //    }
}
