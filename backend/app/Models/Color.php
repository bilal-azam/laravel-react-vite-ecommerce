<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Products\Variant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Color extends Model
{
    use HasFactory;

    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }
}
