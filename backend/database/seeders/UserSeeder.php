<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

final class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'is_admin' => true
        ]);

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@example.com',
        ]);

        User::factory(1000)->create();
    }
}
