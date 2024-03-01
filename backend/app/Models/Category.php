<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Category extends Model
{
    use HasFactory;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
