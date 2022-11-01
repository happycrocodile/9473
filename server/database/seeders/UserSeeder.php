<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = ['admin', 'manager', 'guest'];

        foreach ($users as $key => $user) {

            $roleId = $key + 1;

            User::create([
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'username' => $user,
                'password' => Hash::make('password'),
                'role_id' => $roleId,
            ])->assignRole($roleId);
        }
    }
}
