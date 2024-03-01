<?php

declare(strict_types=1);

namespace App\Enums;

enum StatusEnum: string
{
    case New = 'new';
    case InProgress = 'inProgress';
    case Sent = 'sent';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
    case Completed = 'completed';

    public static function values(): array
    {
        return [
            self::New->value,
            self::InProgress->value,
            self::Sent->value,
            self::Shipped->value,
            self::Delivered->value,
            self::Cancelled->value,
            self::Completed->value,
        ];
    }
}
