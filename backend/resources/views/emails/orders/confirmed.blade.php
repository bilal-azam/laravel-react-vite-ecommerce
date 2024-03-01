<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 py-10 px-5">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h2 class="text-2xl font-bold mb-6 text-gray-700">Order Confirmation</h2>

        <p class="mb-4">Dear <span class="font-semibold">{{ $order->user->name }}</span>,</p>

        <p>Your order with the following details has been confirmed:</p>

        <p class="mt-2"><strong>Order ID:</strong> {{ $order->uuid }}</p>
        <p><strong>Order Date:</strong> {{ $order->created_at }}</p>

        @foreach ($order->items as $item)
            <div class="border-t border-gray-200 pt-4">
                <div class="w-32 h-32 mb-4">
                    <a href="{{ env('FRONTEND_URL') }}/products/{{ $item->option->variant->id }}">
                        <img src="{{ $item->option->variant->main_photo }}" alt="{{ $item->option->variant->product->name }}" class="rounded-lg hover:scale-105">
                    </a>
                </div>
                <p><strong>Name:</strong> {{ $item->option->variant->product->brand->name }} {{ $item->option->variant->product->name }}</p>
                <p><strong>Color:</strong> {{ ucfirst($item->option->variant->color->name) }}</p>
                <p><strong>Size:</strong> {{ mb_strtoupper($item->option->size->name) }}</p>
                <p><strong>Price:</strong> {{ $item->option->variant->price }}</p>
                <p><strong>Quantity:</strong> {{ $item->quantity }}</p>
                <p><strong>Unit Price:</strong> ${{ $item->price }}</p>
                <p><strong>Price:</strong> ${{ $item->price * $item->quantity }}</p>
            </div>
        @endforeach

        <p class="mt-4"><strong>Total Price:</strong> ${{ $order->items->sum(function ($item) { return $item->quantity * $item->price; }) }}</p>

        <p class="mt-6">Thank you for shopping with us!</p>
    </div>
</body>
</html>
