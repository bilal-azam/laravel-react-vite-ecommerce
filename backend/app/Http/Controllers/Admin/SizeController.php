<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Size;

final class SizeController extends Controller
{
    public function index()
    {
        return Size::all();
    }
}
