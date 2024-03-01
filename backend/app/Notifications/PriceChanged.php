<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Products\Variant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class PriceChanged extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private readonly Variant $variant) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage())
            ->greeting('Hello ' . $notifiable->name . '!')
            ->subject('Product you are interested in has a new price!')
            ->line($this->variant->product->brand->name . ' ' . $this->variant->product->name . ' ' . $this->variant->color->name . ' has a new price!')
            ->action('Show', env('FRONTEND_URL') . '/products/' . $this->variant->id);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [

        ];
    }
}
