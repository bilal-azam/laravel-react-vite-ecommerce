@component('mail::message')
    # Order Status Changed

    Your order status has been updated to: {{ $order->status }}

    Thanks,
    {{ config('app.name') }}
@endcomponent
