<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\OrderStatusChangedEvent;
use App\Listeners\SendOrderStatusChangedEmail;
use App\Models\Products\Product;
use App\Models\Products\Variant;
use App\Models\User;
use App\Observers\ProductObserver;
use App\Observers\UserObserver;
use App\Observers\VariantObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

final class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        OrderStatusChangedEvent::class => [
            SendOrderStatusChangedEmail::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        User::observe(UserObserver::class);
        Product::observe(ProductObserver::class);
        Variant::observe(VariantObserver::class);
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
