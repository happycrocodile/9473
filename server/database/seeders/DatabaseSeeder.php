<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ProvinceSeeder::class,
            GenderSeeder::class,
            CustomerSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            PreferenceSeeder::class,
            StatusSeeder::class,
            OrderSeeder::class,
            PreferenceHasOrderSeeder::class,
            FeedbackSeeder::class,
            StatisticSeeder::class,
        ]);
    }
}
