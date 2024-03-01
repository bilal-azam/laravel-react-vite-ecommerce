<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ShipmentEnum;
use App\Models\Shipment;
use Illuminate\Database\Seeder;

final class ShipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shipments = ShipmentEnum::values();

        foreach ($shipments as $shipment) {
            Shipment::factory()->create([
                'name' => $shipment
            ]);
        }
    }
}
