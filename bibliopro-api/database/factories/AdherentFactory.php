<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdherentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => null,
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'email' => fake()->unique()->safeEmail(),
            'date_inscription' => fake()->dateTimeBetween('-2 years', 'now'),
        ];
    }
}
