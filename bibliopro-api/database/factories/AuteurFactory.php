<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuteurFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => fake('fr_FR')->lastName(),
            'prenom' => fake('fr_FR')->firstName(),
            'nationalite' => fake('fr_FR')->country(),
        ];
    }
}
