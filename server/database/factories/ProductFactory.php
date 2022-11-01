<?php

namespace Database\Factories;

use App\Models\Category;
use Helper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categories = Category::all();

        return [
            'name' => fake()->word(),
            'unit_price' => fake()->randomFloat(2, 800, 8000),
            'active' => fake()->randomElement([0, 1]),
            'description' => fake()->text(),
            'image' => Helper::randomImageName(),
            'category_id' => fake()->randomElement($categories),
            'total_sales' => fake()->numberBetween(100, 1000),
        ];
    }
}
