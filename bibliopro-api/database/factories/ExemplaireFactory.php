<?php
namespace Database\Factories;
use App\Models\Livre;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExemplaireFactory extends Factory
{
    public function definition(): array
    {
        return [
            'livre_id' => Livre::inRandomOrder()->first()?->id ?? Livre::factory(),
            'etat' => fake()->randomElement(['neuf', 'bon_etat', 'abime']),
            'disponible' => true,
        ];
    }
}
