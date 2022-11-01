<?php

namespace Database\Seeders;

use App\Models\Statistic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 12; $i++) {
            Statistic::create([
                'total_customers' => fake()->numberBetween(15, 20),
                'total_orders' => fake()->numberBetween(15, 40),
                'total_canceled_orders' => fake()->numberBetween(5, 10),
                'total_feedbacks' => fake()->numberBetween(10, 15),
            ]);
        }
    }
}
