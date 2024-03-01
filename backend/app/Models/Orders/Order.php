<?php

declare(strict_types=1);

namespace App\Models\Orders;

use App\Enums\StatusEnum;
use App\Models\Shipment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Str;

final class Order extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'status' => StatusEnum::class,
    ];
    protected array $dates = ['created_at', 'updated_at'];

    public static function boot(): void
    {
        parent::boot();

        static::creating(function ($model): void {
            $model->uuid = Str::uuid();
        });
    }

    public function getRouteKey(): string
    {
        return 'uuid';
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shipment(): BelongsTo
    {
        return $this->belongsTo(Shipment::class);
    }

    public function getCreatedAtAttribute($value): string
    {
        return Carbon::parse($value)->format('d M Y, H:i');
    }

    public function getUpdatedAtAttribute($value): string
    {
        return Carbon::parse($value)->diffForHumans();
    }
}
