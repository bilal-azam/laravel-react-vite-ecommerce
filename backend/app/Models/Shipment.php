<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Orders\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Shipment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
