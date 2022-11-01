<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PreferenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $users = User::all();

        $preference = [
            'user_id' => fake()->randomElement($users),
        ];

        $digit = fake()->randomDigitNotZero();

        if ($digit % 2 == 0) {
            $preference = array_merge($preference, ['payment_amount' => fake()->randomFloat(2, 10000, 100000)]);
        } else {
            $preference = array_merge($preference, ['payment_amount' => 0, 'refund_amount' => fake()->randomFloat(2, 10000, 100000)]);
        }

        return $preference;
    }
}
