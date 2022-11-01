<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Preference;
use Helper;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $preferences = Preference::all();

        foreach ($preferences as $preference) {
            $preferenceId = $preference->id;

            Order::create([
                'status_id' => fake()->randomElement([1, 2, 3]),
                'order_number' => Helper::createOrderNumber($preferenceId),
                'customer_id' => fake()->randomElement([1, 2, 3]),
                'description' => fake()->text(),
                'preference_id' => $preferenceId,
            ]);
        }
    }
}
