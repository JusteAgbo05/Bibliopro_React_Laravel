<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    public function definition(): array
    {
        return ['libelle' => fake()->unique()->randomElement([
            'Développement personnel', 'Psychologie', 'Bien-être', 'Motivation', 'Spiritualité',
        ])];
    }
}
