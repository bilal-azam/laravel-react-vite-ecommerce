<?php

declare(strict_types=1);

namespace App\Enums;

enum ShipmentEnum: string
{
    case CashOnDelivery = 'cash_on_delivery';

    public static function values(): array
    {
        return [
            self::CashOnDelivery->value,
        ];
    }
}
