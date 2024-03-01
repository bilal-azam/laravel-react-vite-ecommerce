<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Price;
use Illuminate\Console\Command;

final class ClearHistoricalPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-historical-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear historical prices older than 30 days';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Price::where('created_at', '<', now()->subDays(30))->delete();
    }
}
