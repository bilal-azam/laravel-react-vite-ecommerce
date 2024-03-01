<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Products\Variant;
use Illuminate\Http\Request;

final class ColorController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('product_id')) {
            $colors = Variant::where('product_id', $request->get('product_id'))->pluck('color_id')->toArray();

            return Color::query()->whereNotIn('id', $colors)->get();
        }

        return Color::all();
    }
}
