<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Products\Variant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Price extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }
}
