<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->index('id');
        });

        Schema::table('ratings', function (Blueprint $table): void {
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->dropIndex(['id']);
        });

        Schema::table('ratings', function (Blueprint $table): void {
            $table->dropIndex(['product_id']);
        });
    }
};
