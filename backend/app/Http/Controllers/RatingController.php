<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

final class RatingController extends Controller
{
    public function store(Request $request)
    {
        Rating::create([
            'user_id'    => auth()->id(),
            'product_id' => $request->product_id,
            'value'      => $request->value
        ]);

        return response()->json('You rated this product!');
    }
}
