<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Products\Option;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Size extends Model
{
    use HasFactory;

    public function options(): HasMany
    {
        return $this->hasMany(Option::class);
    }
}
