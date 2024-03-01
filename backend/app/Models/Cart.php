<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Products\Option;
use App\Models\Products\Variant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'variant_id', 'option_id', 'quantity'];

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }

    public function option(): BelongsTo
    {
        return $this->belongsTo(Option::class);
    }
}
