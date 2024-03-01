<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;

final class BrandController extends Controller
{
    public function index()
    {
        return Brand::all();
    }
}
