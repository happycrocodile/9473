<?php

namespace Database\Factories;

use App\Models\Province;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $provinces = Province::all();

        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'gender_id' => fake()->randomElement([1, 2, 3]),
            'province_id' => fake()->randomElement($provinces),
            'city' => fake()->city(),
            'street_address' => fake()->streetAddress(),
            'live_mode' => fake()->randomElement([0, 1]),
            'total_purchases' => fake()->numberBetween(10, 50),
        ];
    }
}
