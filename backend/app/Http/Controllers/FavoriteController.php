<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

final class FavoriteController extends Controller
{
    public function index()
    {
        return Favorite::where('user_id', auth()->id())->with('variant.product')->get();
    }

    public function store(Request $request)
    {
        Favorite::create([
            'user_id' => auth()->id(),
            'variant_id' => $request->get('variant_id')
        ]);

        return response()->noContent();
    }

    public function destroy(Favorite $favorite)
    {
        $favorite->delete();

        return response()->noContent();
    }

    public function favCount()
    {
        return Favorite::where('user_id', auth()->id())->with('variant.product')->count();
    }
}
