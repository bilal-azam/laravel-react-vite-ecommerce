<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Orders\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

final class OrderStatusChanged extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Order $order) {}

    public function build()
    {
        return $this->markdown('emails.orders.statuschanged')
            ->with([
                'order' => $this->order,
            ]);
    }
}
