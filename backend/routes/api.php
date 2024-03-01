<?php

declare(strict_types=1);

use App\Http\Controllers\Admin;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RatingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//\Illuminate\Support\Facades\Auth::loginUsingId(2);

Route::middleware(['auth:sanctum'])->get('/user', fn(Request $request) => $request->user());

Route::post('cart/{cart}/update-quantity', [CartController::class, 'updateQuantity']);
Route::get('cart-items', [CartController::class, 'items']);
Route::get('favorites-count', [FavoriteController::class, 'favCount']);
Route::apiResource('cart', CartController::class);
Route::get('/feature-products', [ProductController::class, 'featureProducts']);
Route::apiResource('products', ProductController::class)->names([
    'show' => 'products.show',
]);
Route::apiResource('favorites', FavoriteController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('ratings', RatingController::class);

Route::prefix('admin')->group(function (): void {
    Route::middleware('admin')->group(function (): void {
        Route::get('statuses', [Admin\StatusController::class, 'index']);
        Route::post('variants/{variant}/publish', [Admin\VariantController::class, 'publish']);
        Route::post('variants/{variant}/unpublish', [Admin\VariantController::class, 'unpublish']);
        Route::put('orders/{order}/update-status', [Admin\OrderController::class, 'updateStatus']);
        Route::post('products/import', [Admin\ProductController::class, 'import'])->name('products.import');
        Route::apiResource('colors', Admin\ColorController::class);
        Route::apiResource('sizes', Admin\SizeController::class);
        Route::apiResource('products', Admin\ProductController::class)->names(['show' => 'admin.products.show']);
        Route::apiResource('categories', Admin\CategoryController::class)->except('index');
        Route::apiResource('brands', Admin\BrandController::class)->except('index');
        ;
        Route::apiResource('variants', Admin\VariantController::class);
        Route::apiResource('users', Admin\UserController::class);
        Route::apiResource('orders', Admin\OrderController::class);
    });

    Route::apiResource('categories', Admin\CategoryController::class)->only('index');
    Route::apiResource('brands', Admin\BrandController::class)->only('index');
});
