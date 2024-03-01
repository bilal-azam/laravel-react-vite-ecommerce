<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Events\OrderStatusChangedEvent;
use App\Http\Controllers\Controller;
use App\Models\Orders\Order;
use Exception;
use Illuminate\Http\Request;

final class OrderController extends Controller
{
    public function index()
    {
        return Order::query()
            ->with('user:id,name,email', 'shipment:id,name')
            ->withCount('items')
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10);
    }

    public function show($uuid)
    {
        return Order::query()
            ->where('uuid', $uuid)
            ->with(['items.option.variant.product'])
            ->first();
    }

    public function update(Order $order, Request $request)
    {
        $order->update($request->all());

        return $order;
    }

    public function updateStatus(Order $order, Request $request)
    {
        try {
            $order->update(['status' => $request->status]);
        } catch (Exception $e) {
            return $e;
        }

        event(new OrderStatusChangedEvent($order));

        return $order;
    }
}
