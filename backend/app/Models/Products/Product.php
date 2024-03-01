<?php

declare(strict_types=1);

namespace App\Models\Products;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Rating;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

final class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function getPriceAttribute($value): string
    {
        return number_format($value, 2);
    }

    public function vote(): HasOne
    {
        return $this->hasOne(Rating::class)->where('user_id', auth()->id());
    }
}
