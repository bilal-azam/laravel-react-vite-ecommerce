<?php

declare(strict_types=1);

namespace App\Models\Orders;

use App\Models\Products\Option;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Item extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function option(): BelongsTo
    {
        return $this->belongsTo(Option::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
