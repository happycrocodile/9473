<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genders = ['other' => 'Otro', 'male' => 'Masculino', 'female' => 'Femenino'];

        foreach ($genders as $key => $gender) {
            Gender::create([
                'name' => $gender,
                'guard_name' => $key
            ]);
        }
    }
}
