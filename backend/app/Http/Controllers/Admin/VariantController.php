<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\VariantStoreRequest;
use App\Models\Products\Variant;
use DB;
use Illuminate\Http\Request;

final class VariantController extends Controller
{
    public function store(VariantStoreRequest $request)
    {
        $variant = new Variant();

        DB::transaction(function () use ($request, $variant): void {
            if ($request->hasFile('images')) {
                $images = [];
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('images', 'public');
                    $images[] = url('/storage/' . $imagePath);
                }

                $variant->images = json_encode($images);
            }

            $variant->product_id = $request->product_id;
            $variant->color_id = $request->color_id;
            $variant->price = $request->price;
            $variant->published = $request->published ? 1 : 0;
            $variant->thumbnail = $images[0] ?? '';
            $variant->save();

            $variants = $request->variants;

            foreach ($variants as $id => $quantity) {
                $variant->options()->create([
                    'size_id' => $id,
                    'quantity' => $quantity,
                ]);
            }
        });

        return $variant;
    }

    public function show(Variant $variant)
    {
        return $variant->load(['product', 'color', 'options']);
    }

    public function update(Request $request, Variant $variant)
    {
        $variant->fill([
            'price' => $request->price,
            'published' => $request->published ? 1 : 0,
        ]);

        $variant->save();

        return $variant;
    }

    public function destroy(Variant $variant)
    {
        $variant->delete();

        return response()->noContent();
    }

    public function publish(Variant $variant): void
    {
        $variant->published = true;
        $variant->save();
    }

    public function unpublish(Variant $variant): void
    {
        $variant->published = false;
        $variant->save();
    }
}
