<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\OrderStatusChangedEvent;
use App\Mail\OrderStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

final class SendOrderStatusChangedEmail implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(OrderStatusChangedEvent $event): void
    {
        Mail::to($event->order->user->email)->send(new OrderStatusChanged($event->order));
    }
}
