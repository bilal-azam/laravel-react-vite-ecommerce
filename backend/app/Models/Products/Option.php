<?php

declare(strict_types=1);

namespace App\Models\Products;

use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Option extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }

    public function size(): BelongsTo
    {
        return $this->belongsTo(Size::class);
    }
}
