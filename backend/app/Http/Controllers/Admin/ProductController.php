<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProductStoreRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Products\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelReader;

final class ProductController
{
    public function index()
    {
        return Product::query()
            ->with(['variants.color', 'brand'])
            ->latest()
            ->simplePaginate(10);
    }

    public function store(ProductStoreRequest $request)
    {
        return Product::create($request->validated());
    }

    public function import(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $fileName = $file->getClientOriginalName();
            $file->storeAs('public', $fileName);

            $path = Storage::path('public/' . $fileName);

            $products = [];

            $categories = Category::pluck('id', 'name')->toArray();
            $brands = Brand::pluck('id', 'name')->toArray();


            try {
                $rows = SimpleExcelReader::create($path)->getRows();

                foreach ($rows as $rowProperties) {
                    $expectedHeaders = ['category', 'brand', 'name', 'description', 'price'];

                    $keys = array_keys($rowProperties);

                    sort($keys);
                    sort($expectedHeaders);

                    if ($keys !== $expectedHeaders) {
                        throw new Exception('Headers do not match expected headers');
                    }

                    foreach ($rowProperties as $key => $value) {
                        if (empty($value)) {
                            throw new Exception("Empty field: {$key}");
                        }
                    }

                    $category = Arr::get($categories, $rowProperties['category']);
                    $brand    = Arr::get($brands, $rowProperties['brand']);

                    if ( ! $brand || ! $category) {
                        throw new Exception('Brand or category not found');
                    }

                    $product = [
                        'category_id' => $category,
                        'brand_id' => $brand,
                        'name' => Arr::get($rowProperties, 'name'),
                        'description' => Arr::get($rowProperties, 'description'),
                        'price' => Arr::get($rowProperties, 'price'),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];

                    $products[] = $product;
                }
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
            }

            Product::insert($products);

            return response()->json([
                'success' => true,
                'message' => 'Products imported successfully',
            ], 201);
        }

        return response()->json(['success' => false, 'message' => 'File not found'], 404);
    }
}
