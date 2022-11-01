<?php

namespace Database\Seeders;

use App\Models\Feedback;
use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orders = Order::all();

        foreach ($orders as $order) {
            if ($order->id % 2 == 0) {
                Feedback::create([
                    'tracking_number' => $order->order_number,
                    'description' => fake()->text(),
                    'sorting' => fake()->randomElement([0, 1]),
                    'active' => fake()->randomElement([0, 1]),
                ]);
            }
        }
    }
}
