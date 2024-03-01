<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;

final class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }
}
