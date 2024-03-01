<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

final class UserController extends Controller
{
    public function index()
    {
        return User::query()
            ->select(['name', 'email', 'id', 'created_at', 'is_admin', 'avatar'])
            ->orderBy('is_admin', 'desc')
            ->simplePaginate(10);
    }
}
