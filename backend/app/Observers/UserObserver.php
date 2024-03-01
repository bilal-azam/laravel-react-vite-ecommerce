<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\User;

final class UserObserver
{
    public function creating(User $user): void
    {
        $user->avatar = $user->getAvatar();
    }
}
