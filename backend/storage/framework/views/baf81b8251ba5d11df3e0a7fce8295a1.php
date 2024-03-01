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

        <p class="mb-4">Dear <span class="font-semibold"><?php echo e($order->user->name); ?></span>,</p>

        <p>Your order with the following details has been confirmed:</p>

        <p class="mt-2"><strong>Order ID:</strong> <?php echo e($order->uuid); ?></p>
        <p><strong>Order Date:</strong> <?php echo e($order->created_at); ?></p>

        <?php $__currentLoopData = $order->items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="border-t border-gray-200 pt-4">
                <div class="w-32 h-32 mb-4">
                    <a href="<?php echo e(env('FRONTEND_URL')); ?>/products/<?php echo e($item->option->variant->id); ?>">
                        <img src="<?php echo e($item->option->variant->main_photo); ?>" alt="<?php echo e($item->option->variant->product->name); ?>" class="rounded-lg hover:scale-105">
                    </a>
                </div>
                <p><strong>Name:</strong> <?php echo e($item->option->variant->product->brand->name); ?> <?php echo e($item->option->variant->product->name); ?></p>
                <p><strong>Color:</strong> <?php echo e(ucfirst($item->option->variant->color->name)); ?></p>
                <p><strong>Size:</strong> <?php echo e(mb_strtoupper($item->option->size->name)); ?></p>
                <p><strong>Price:</strong> <?php echo e($item->option->variant->price); ?></p>
                <p><strong>Quantity:</strong> <?php echo e($item->quantity); ?></p>
                <p><strong>Unit Price:</strong> $<?php echo e($item->price); ?></p>
                <p><strong>Price:</strong> $<?php echo e($item->price * $item->quantity); ?></p>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

        <p class="mt-4"><strong>Total Price:</strong> $<?php echo e($order->items->sum(function ($item) { return $item->quantity * $item->price; })); ?></p>

        <p class="mt-6">Thank you for shopping with us!</p>
    </div>
</body>
</html>
<?php /**PATH /app/backend/resources/views/emails/orders/confirmed.blade.php ENDPATH**/ ?>