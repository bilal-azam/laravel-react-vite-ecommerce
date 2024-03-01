<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Products\Variant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Favorite extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'variant_id'];

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
