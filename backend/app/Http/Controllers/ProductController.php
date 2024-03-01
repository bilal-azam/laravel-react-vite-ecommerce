<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\VariantResource;
use App\Models\Products\Variant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

final class ProductController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $sortBy = $request->get('sortBy');

        $sortMappings = [
            'price_asc' => ['column' => 'price', 'order' => 'asc'],
            'price_desc' => ['column' => 'price', 'order' => 'desc'],
        ];

        $defaultSort = ['column' => 'id', 'order' => 'desc'];

        $sort = $sortMappings[$sortBy]['column'] ?? $defaultSort['column'];
        $order = $sortMappings[$sortBy]['order'] ?? $defaultSort['order'];

        $variants = Variant::getProducts(sort: $sort, order: $order);

        return VariantResource::collection($variants);
    }

    public function featureProducts(): AnonymousResourceCollection
    {
        $variants = Variant::getFeatureProducts();

        return VariantResource::collection($variants);
    }

    public function show($variantId): JsonResponse|VariantResource
    {
        try {
            $variant = Variant::getProduct($variantId);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return new VariantResource($variant);
    }
}
